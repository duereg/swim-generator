import { warmups, noWarmupOption } from './data/warmups.js';
import { cooldowns } from './data/cooldowns.js';
import { mainSetDefinitions } from './data/mainSets.js';
import workoutComponents from './workoutComponents.js';

// Helper function to convert MM:SS time string to total seconds per 100 units
export function parseCssTimeToSeconds(cssTimeStr) {
    if (typeof cssTimeStr !== 'string') {
        return null;
    }
    const parts = cssTimeStr.split(':');
    if (parts.length === 2) {
        const minutes = parseInt(parts[0], 10);
        const seconds = parseFloat(parts[1]);
        if (isNaN(minutes) || isNaN(seconds)) {
            return null;
        }
        return minutes * 60 + seconds;
    }
    return null; // Invalid format
}

// Helper function to format total seconds per 100 units back to MM:SS
export function formatSecondsToMmSs(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toFixed(1); // One decimal for seconds
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

/**
 * Generates a random workout based on distance, energy system, and CSS time.
 * @param {number} totalDistanceYards - The approximate total desired workout distance in yards.
 * @param {string} energySystem - The energy system focus (e.g., 'EN1', 'EN2', 'EN3', 'SP1', 'SP2').
 * @param {string} cssTimeMmSs - The Critical Swim Speed in MM:SS format (e.g., '1:10').
 * @param {string} workoutType - The type of workout (e.g., 'threshold', 'anaerobic').
 * @returns {string} A formatted string describing the generated workout.
 */
function generateWorkout(totalDistanceYards, energySystem, cssTimeMmSs, workoutType) {
    const cssSecondsPer100 = parseCssTimeToSeconds(cssTimeMmSs);
    if (cssSecondsPer100 === null) {
        return "Error: Invalid CSS time format. Please use MM:SS (e.g., '1:10').";
    }

    let workoutDetails = [];
    let currentDistanceCovered = 0;
    const mainSetUnits = "yards"; // Assuming SCY based on sources unless specified otherwise [7, 9, 16]

    // --- 1. Warmup Selection ---
    let selectedWarmup = workoutComponents.selectWarmup(warmups, noWarmupOption); // Initial selection

    // Adjust warmup if it's too large for the totalDistanceYards
    if (selectedWarmup && selectedWarmup.dist > 0) { // Check if a warmup was selected and it has distance
        const minMainSetThreshold = 200; // Minimum distance we'd ideally want for a main set
        let maxAllowedWarmupDist = totalDistanceYards - minMainSetThreshold;

        // Further cap maxAllowedWarmupDist to be no more than, say, 60% of total,
        // and ensure it's not negative if totalDistanceYards is very small.
        maxAllowedWarmupDist = Math.min(maxAllowedWarmupDist, totalDistanceYards * 0.6);
        if (maxAllowedWarmupDist < 0 && totalDistanceYards > 0) { // totalDistance is too small for minMainSetThreshold
             maxAllowedWarmupDist = totalDistanceYards * 0.4; // Allow smaller portion for warmup
        }
        // Ensure maxAllowedWarmupDist is at least a very small value if totalDistanceYards allows, e.g. 50
        // This handles cases where totalDistanceYards * 0.4 might be very low (e.g. 16 for totalDistanceYards=40)
        if (maxAllowedWarmupDist < 50 && totalDistanceYards >= 50) {
             maxAllowedWarmupDist = 50;
        }


        if (selectedWarmup.dist > maxAllowedWarmupDist) {
            const suitableWarmups = warmups.filter(wu => wu.dist <= maxAllowedWarmupDist && wu.dist > 0);
            if (suitableWarmups.length > 0) {
                selectedWarmup = suitableWarmups[Math.floor(Math.random() * suitableWarmups.length)];
            } else {
                // If totalDistanceYards is very small (e.g. < 100), even the shortest real warmup might be > maxAllowedWarmupDist.
                // Or if all warmups are simply too long.
                // Fallback to noWarmupOption if filtering found no suitable warmups under the calculated maxAllowedWarmupDist.
                // The conditions for setting maxAllowedWarmupDist (e.g. to 50 if total allows) should mean that
                // if totalDistanceYards is e.g. 150, maxAllowedWarmupDist could be 50. If no warmups are <=50, then noWarmupOption.
                selectedWarmup = noWarmupOption;
            }
        }
    } else if (!selectedWarmup || selectedWarmup.dist === 0) {
        // Ensure selectedWarmup is noWarmupOption if initial selection was noWarmupOption or somehow null.
        // The check selectedWarmup.dist > 0 handles the case where selectedWarmup is noWarmupOption initially.
        // This else-if ensures if it's already noWarmupOption (dist=0) or null, it becomes our standard noWarmupOption object.
        selectedWarmup = noWarmupOption;
    }

    // This line should come AFTER any adjustments to selectedWarmup
    if (selectedWarmup) { // Check selectedWarmup again as it might have been changed to noWarmupOption
        workoutDetails.push(`WU: ${selectedWarmup.desc}`);
        currentDistanceCovered += selectedWarmup.dist; // dist will be 0 if noWarmupOption
    }

    // --- 2. Main Set Generation ---
    let mainSetDescription = "Main Set:";
    let sets = [];
    let mainSetTotalDist = 0;
    let targetPacePer100;
    let remainingDistanceForMainSet = totalDistanceYards - currentDistanceCovered;

    const mainSetResult = workoutComponents.generateMainSet(workoutType, energySystem, cssSecondsPer100, remainingDistanceForMainSet, mainSetDefinitions);
    sets = mainSetResult.sets;
    mainSetTotalDist = mainSetResult.mainSetTotalDist;
    targetPacePer100 = mainSetResult.targetPacePer100;

    if (mainSetResult.descriptiveMessage) {
        mainSetDescription += ` ${mainSetResult.descriptiveMessage}`;
    }

    workoutDetails.push(mainSetDescription);
    sets.forEach(set => {
        workoutDetails.push(`  - ${set}`);
    });
    currentDistanceCovered += mainSetTotalDist;

    // --- 3. Cool-down Selection (Modified Logic) ---
    let selectedCooldown;
    const noCooldownOption = { desc: "No cooldown", dist: 0, type: "none" };

    const distanceAfterMainSet = currentDistanceCovered;
    const distanceToTarget = totalDistanceYards - distanceAfterMainSet;

    if (distanceAfterMainSet >= totalDistanceYards - 50) { // Already at, very close to, or over target
        selectedCooldown = noCooldownOption;
    } else {
        // Target is still further away, try to find a suitable cooldown
        // Allow cooldown to make total go up to 75yd over target
        const suitableCooldowns = cooldowns.filter(cd => cd.dist <= distanceToTarget + 75);

        if (suitableCooldowns.length > 0) {
            // Select from cooldowns that don't grossly overshoot
            selectedCooldown = suitableCooldowns[Math.floor(Math.random() * suitableCooldowns.length)];
        } else {
            // All available cooldowns are too long, or distanceToTarget is very small.
            // This implies distanceToTarget < 25 for the smallest 100yd cooldown to not be suitable.
            selectedCooldown = noCooldownOption;
        }
    }

    if (selectedCooldown) { // selectedCooldown could be noCooldownOption here
        workoutDetails.push(`CD: ${selectedCooldown.desc}`);
        currentDistanceCovered += selectedCooldown.dist; // dist will be 0 for noCooldownOption
    }

    // --- 4. Final Details ---
    workoutDetails.push(`\nTotal estimated distance: ${currentDistanceCovered} ${mainSetUnits}`);
    workoutDetails.push(`CSS: ${cssTimeMmSs}`);
    workoutDetails.push(`Workout Type: ${workoutType}`); // Added Workout Type
    workoutDetails.push(`Energy System Focus: ${energySystem.toUpperCase()}`);
    // A rough estimate of average pace, as true average depends on actual interval times and rest
    workoutDetails.push(`Estimated AVG pace for main set: ${formatSecondsToMmSs(targetPacePer100)} / 100 ${mainSetUnits}`);

    return workoutDetails.join('\n');
}

export { generateWorkout }; // Keep generateWorkout exported as it's likely the main API

// --- Example Usage ---
// console.log(generateWorkout(3000, 'EN3', '1:20'));
// console.log(generateWorkout(2000, 'SP1', '1:10'));
// console.log(generateWorkout(1500, 'SP2', '1:15'));
// console.log(generateWorkout(2500, 'EN2', '1:12'));
// console.log(generateWorkout(1800, 'EN1', '1:25'));