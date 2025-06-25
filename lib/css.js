import { generateWarmup } from './data/warmups.js';
import workoutComponents from './workoutComponents.js';

const VERY_SHORT_WORKOUT_THRESHOLD = 600; // yards
const MAIN_SET_UNITS = "yards"; // Assuming SCY based on sources unless specified otherwise

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

    // --- 1. Warmup Selection ---
    const warmup = generateWarmup(totalDistanceYards, VERY_SHORT_WORKOUT_THRESHOLD);
    workoutDetails.push(warmup.desc);
    currentDistanceCovered += warmup.dist;

    // --- 3. cooldown selection
    const cooldown = workoutComponents.generateCooldown();
    currentDistanceCovered += cooldown.dist;

    // --- 2. Main Set Generation ---
    let mainSetDescription = "Main Set:";
    let sets = [];
    let mainSetTotalDist = 0;
    let targetPacePer100;
    let remainingDistanceForMainSet = totalDistanceYards - currentDistanceCovered;

    // Map energySystem to workoutType keys
    let internalWorkoutType = generateWorkoutType(energySystem, workoutType);

    const mainSetResult = workoutComponents.generateMainSet(internalWorkoutType, energySystem, cssSecondsPer100, remainingDistanceForMainSet);
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
    
    workoutDetails.push(`CD: ${cooldown.desc}`);

    // --- 4. Final Details ---
    workoutDetails.push(`\nTotal estimated distance: ${currentDistanceCovered} ${MAIN_SET_UNITS}`);
    workoutDetails.push(`CSS: ${cssTimeMmSs}`);
    workoutDetails.push(`Workout Type: ${workoutType}`); // Added Workout Type
    workoutDetails.push(`Energy System Focus: ${energySystem.toUpperCase()}`);
    // A rough estimate of average pace, as true average depends on actual interval times and rest
    workoutDetails.push(`Estimated AVG pace for main set: ${formatSecondsToMmSs(targetPacePer100)} / 100 ${MAIN_SET_UNITS}`);

    return workoutDetails.join('\n');
}

export { generateWorkout }; // Keep generateWorkout exported as it's likely the main API





    function generateWorkoutType(energySystem, workoutType) {
        const energySystemToWorkoutType = {
            'EN1': 'ENDURANCE_BASE',
            'EN2': 'THRESHOLD_SUSTAINED',
            'EN3': 'THRESHOLD_DEVELOPMENT',
            'SP1': 'SPEED_ENDURANCE',
            'SP2': 'MAX_SPRINT',
            // Add other mappings if necessary, or a default
        };

        let internalWorkoutType = energySystemToWorkoutType[energySystem.toUpperCase()];

        if (!internalWorkoutType) {
            // console.warn(`Unknown energySystem: ${energySystem}. Defaulting to GENERAL_ENDURANCE if workoutType param is also not specific.`);
            // If the original workoutType parameter was provided and is valid, it could be used.
            // However, the new guidelines are driven by EN1, EN2 etc.
            // So, if energySystem doesn't map, we might default or rely on the generateMainSet's default.
            // For now, if energySystem doesn't map, internalWorkoutType will be undefined,
            // and generateMainSet will default to GENERAL_ENDURANCE.
            // The original 'workoutType' parameter from generateWorkout's signature is still available if needed as a fallback here.
            // Let's make it explicit: if energySystem mapping fails, use the passed 'workoutType' parameter.
            // If that is also undefined, generateMainSet handles the GENERAL_ENDURANCE default.
            if (workoutType) { // workoutType is the original parameter of generateWorkout
                internalWorkoutType = workoutType;
            }
            // If internalWorkoutType is still undefined, generateMainSet's default to GENERAL_ENDURANCE will occur.
        }
        return internalWorkoutType;
    }
// --- Example Usage ---
// console.log(generateWorkout(3000, 'EN3', '1:20'));
// console.log(generateWorkout(2000, 'SP1', '1:10'));
// console.log(generateWorkout(1500, 'SP2', '1:15'));
// console.log(generateWorkout(2500, 'EN2', '1:12'));
// console.log(generateWorkout(1800, 'EN1', '1:25'));