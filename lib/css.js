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
        selectedWarmup = { ...noWarmupOption, desc: "No warmup (short workout)" }; // Use a specific description
    } else {
        // Original adaptive logic would go here if it existed.
        // For now, using the original simple selection:
        selectedWarmup = workoutComponents.selectWarmup(warmups, noWarmupOption);
        // NOTE: If more complex adaptive WU logic was re-added, this 'else' block would contain it.
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
        // Original adaptive logic would go here if it existed.
        // For now, using the original simple selection:
        selectedCooldown = workoutComponents.selectCooldown(cooldowns);
         // NOTE: If more complex adaptive CD logic was re-added, this 'else' block would contain it.
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