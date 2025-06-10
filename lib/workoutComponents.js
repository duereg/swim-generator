/**
 * Selects a warmup routine.
 * There's a 90% chance of selecting a warmup from the availableWarmups array,
 * and a 10% chance of selecting the noWarmupOption.
 *
 * @param {Array<Object>} availableWarmups - An array of warmup objects. Each object should have at least 'desc' and 'dist' properties.
 * @param {Object} noWarmupOption - An object representing the option of no warmup. Should have 'desc' and 'dist'.
 * @returns {Object} The selected warmup object.
 */
function selectWarmup(availableWarmups, noWarmupOption) {
    const useWarmup = Math.random() > 0.1; // 90% chance of including a warmup

    if (useWarmup && availableWarmups && availableWarmups.length > 0) {
        return availableWarmups[Math.floor(Math.random() * availableWarmups.length)];
    } else {
        return noWarmupOption;
    }
}

/**
 * Selects a cooldown routine randomly from the available options.
 *
 * @param {Array<Object>} availableCooldowns - An array of cooldown objects. Each object should have at least 'desc' and 'dist' properties.
 * @returns {Object|null} The selected cooldown object, or null if no cooldowns are available or an error occurs.
 */
function selectCooldown(availableCooldowns) {
    if (availableCooldowns && availableCooldowns.length > 0) {
        return availableCooldowns[Math.floor(Math.random() * availableCooldowns.length)];
    }
    return null; // Or return a default cooldown if preferred
}

/**
 * Generates the main set for a workout based on the energy system.
 *
 * @param {string} energySystem - The energy system focus (e.g., 'EN1', 'EN2').
 * @param {number} cssSecondsPer100 - Critical Swim Speed in seconds per 100 units.
 * @param {number} remainingDistanceForMainSet - The distance available for the main set.
 * @param {string} workoutType - The type of workout (e.g., 'THRESHOLD_SUSTAINED').
 * @param {string} energySystem - The energy system focus (e.g., 'EN1', 'EN2').
 * @param {number} cssSecondsPer100 - Critical Swim Speed in seconds per 100 units.
 * @param {number} remainingDistanceForMainSet - The distance available for the main set.
 * @param {Object} mainSetDefinitions - Object mapping workout types to generator functions.
 * @returns {{ sets: string[], mainSetTotalDist: number, targetPacePer100: number, descriptiveMessage?: string }}
 *           An object containing the sets, total distance of the main set, target pace,
 *           and an optional descriptive message for unknown or default systems.
 */
function generateMainSet(workoutType, energySystem, cssSecondsPer100, remainingDistanceForMainSet, mainSetDefinitions) {
    let generator = mainSetDefinitions[workoutType];
    let messageFromOuterScope;

    if (!generator) {
        messageFromOuterScope = `Unknown workout type: ${workoutType}. Defaulting to general endurance.`;
        generator = mainSetDefinitions['GENERAL_ENDURANCE'];
    }

    // The generator function now expects energySystem as its first param.
    let mainSetOutput = generator(energySystem, cssSecondsPer100, remainingDistanceForMainSet);

    // Fallback condition: if the selected generator (not GENERAL_ENDURANCE) produced a very small set
    if (mainSetOutput.mainSetTotalDist < 100 && remainingDistanceForMainSet > 100 && workoutType !== 'GENERAL_ENDURANCE') {
        let fallbackMessage = "(Fallback to general endurance due to low generated distance for selected workout type).";

        const originalMessage = mainSetOutput.descriptiveMessage; // Message from the original, tiny set
        mainSetOutput = mainSetDefinitions['GENERAL_ENDURANCE'](energySystem, cssSecondsPer100, remainingDistanceForMainSet); // Rerun with GENERAL_ENDURANCE

        // Construct descriptive message for fallback
        let finalFallbackMessage = fallbackMessage;
        if (originalMessage) { // If the original (tiny) set had a message
            finalFallbackMessage = originalMessage + " " + fallbackMessage;
        } else if (mainSetOutput.descriptiveMessage) { // If GENERAL_ENDURANCE set has a message
            finalFallbackMessage = fallbackMessage + " " + mainSetOutput.descriptiveMessage;
        }
        mainSetOutput.descriptiveMessage = finalFallbackMessage;
    } else {
        // No fallback, or it was a direct 'GENERAL_ENDURANCE' call.
        // If messageFromOuterScope was set (i.e., unknown workout type), it takes precedence
        // unless the generator provided its own more specific message.
        if (messageFromOuterScope) {
            if (!mainSetOutput.descriptiveMessage) {
                mainSetOutput.descriptiveMessage = messageFromOuterScope;
            } else {
                // If generator (GENERAL_ENDURANCE in this case) set a message, and it was an unknown type,
                // combine or prioritize. For now, "Unknown type" message is more specific to the situation.
                mainSetOutput.descriptiveMessage = messageFromOuterScope + " Original generator message: " + mainSetOutput.descriptiveMessage;
            }
        } else if (workoutType === 'GENERAL_ENDURANCE' && !mainSetOutput.descriptiveMessage) {
            // If it was a direct 'GENERAL_ENDURANCE' call and the generator provided no message (unlikely with current data)
            mainSetOutput.descriptiveMessage = `General Endurance (${energySystem}) set.`;
        }
    }
    return mainSetOutput;
}

const workoutFunctions = {
    selectWarmup,
    selectCooldown,
    generateMainSet
};

export default workoutFunctions;
