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
    const VERY_SHORT_WORKOUT_THRESHOLD = 600; // yards
    // noWarmupOption is imported and can be used directly or cloned if description needs change for this specific case
    // const noWarmupForShortOption = { ...noWarmupOption, desc: "No warmup (short workout)" };

    const cssSecondsPer100 = parseCssTimeToSeconds(cssTimeMmSs);
    if (cssSecondsPer100 === null) {
        return "Error: Invalid CSS time format. Please use MM:SS (e.g., '1:10').";
    }

    let workoutDetails = [];
    let currentDistanceCovered = 0;
    const mainSetUnits = "yards"; // Assuming SCY based on sources unless specified otherwise [7, 9, 16]

    // --- 1. Warmup Selection ---
    let selectedWarmup;
    if (totalDistanceYards < VERY_SHORT_WORKOUT_THRESHOLD) {
        selectedWarmup = { ...noWarmupOption, desc: "No warmup (short workout)" };
    } else {
        // Re-introducing adaptive warmup logic for non-very-short workouts, with the specified modification
        selectedWarmup = workoutComponents.selectWarmup(warmups, noWarmupOption); // Initial selection
        if (selectedWarmup && selectedWarmup.dist > 0) {
            const minMainSetThreshold = 200;
            let maxAllowedWarmupDist = totalDistanceYards - minMainSetThreshold;

            // Apply the more stringent percentage cap: 0.4 (40%) instead of 0.6
            maxAllowedWarmupDist = Math.min(maxAllowedWarmupDist, totalDistanceYards * 0.4);

            if (maxAllowedWarmupDist < 0 && totalDistanceYards > 0) {
                 maxAllowedWarmupDist = totalDistanceYards * 0.4; // Fallback for small total distances if threshold makes it negative
                                                                  // This 0.4 is different from the one above.
                                                                  // Let's keep it as it was for this specific fallback:
                 // maxAllowedWarmupDist = totalDistanceYards * 0.4; // This logic was for very small total distances
                 // The logic from file before reset was:
                 // if (maxAllowedWarmupDist < 0 && totalDistanceYards > 0) { maxAllowedWarmupDist = totalDistanceYards * 0.4; }
                 // This specific 0.4 should remain if it's for the negative guard, distinct from the primary cap.
                 // Re-evaluating based on typical structure: the primary cap (now 0.4) applies first.
                 // Then, specific conditions for very small distances adjust if it results in negative or too small.
                 // The previous adaptive logic was:
                 // maxAllowedWarmupDist = Math.min(maxAllowedWarmupDist, totalDistanceYards * 0.6); // This is now 0.4
                 // if (maxAllowedWarmupDist < 0 && totalDistanceYards > 0) { maxAllowedWarmupDist = totalDistanceYards * 0.4; }
                 // The above line (totalDistanceYards * 0.4) was a fallback if the (totalDistanceYards - minMainSetThreshold) was negative.
                 // It seems the logic should be:
                 // 1. max = total - threshold
                 // 2. max = min(max, total * NEW_PRIMARY_CAP (0.4))
                 // 3. if max < 0 (because total was small), max = total * FALLBACK_CAP_FOR_SMALL_TOTAL (e.g. 0.4 or 0.5)
                 // 4. if max < 50 (and total >=50), max = 50.
                 // Let's stick to the prompt's direct change on the percentage line first.
                 // The other parts of the adaptive logic are:
            } // End of the "maxAllowedWarmupDist < 0" check

            if (maxAllowedWarmupDist < 50 && totalDistanceYards >= 50) {
                 maxAllowedWarmupDist = 50;
            }
            // Add a final guard if maxAllowedWarmupDist somehow ended up negative (e.g. if totalDistanceYards was < 50 but > 0)
            if (maxAllowedWarmupDist < 0) maxAllowedWarmupDist = 0;


            if (selectedWarmup.dist > maxAllowedWarmupDist) {
                const suitableWarmups = warmups.filter(wu => wu.dist <= maxAllowedWarmupDist && wu.dist > 0);
                if (suitableWarmups.length > 0) {
                    selectedWarmup = suitableWarmups[Math.floor(Math.random() * suitableWarmups.length)];
                } else {
                    selectedWarmup = noWarmupOption;
                }
            }
        } else if (!selectedWarmup || selectedWarmup.dist === 0) {
            selectedWarmup = noWarmupOption;
        }
    }

    if (selectedWarmup) {
        workoutDetails.push(`WU: ${selectedWarmup.desc}`);
        currentDistanceCovered += selectedWarmup.dist;
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

    // --- 3. Cool-down Selection ---
    let selectedCooldown;
    const noCooldownForShortOption = { desc: "No cooldown (short workout)", dist: 0, type: "none" };

    if (totalDistanceYards < VERY_SHORT_WORKOUT_THRESHOLD) {
        selectedCooldown = noCooldownForShortOption;
    } else {
        // Re-introducing adaptive cooldown logic with the specified modification
        const generalNoCooldownOption = { desc: "No cooldown", dist: 0, type: "none" }; // General purpose
        const distanceAfterMainSet = currentDistanceCovered;
        const distanceToTarget = totalDistanceYards - distanceAfterMainSet;

        if (distanceAfterMainSet >= totalDistanceYards - 50) {
            selectedCooldown = generalNoCooldownOption;
        } else {
            // Apply the more stringent buffer: 25 instead of 75
            const suitableCooldowns = cooldowns.filter(cd => cd.dist <= distanceToTarget + 25);

            if (suitableCooldowns.length > 0) {
                selectedCooldown = suitableCooldowns[Math.floor(Math.random() * suitableCooldowns.length)];
            } else {
                selectedCooldown = generalNoCooldownOption;
            }
        }
    }

    if (selectedCooldown) {
        workoutDetails.push(`CD: ${selectedCooldown.desc}`);
        currentDistanceCovered += selectedCooldown.dist;
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