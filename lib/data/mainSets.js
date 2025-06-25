// lib/data/mainSets.js
import { generateMainSetFromConfig } from '../workoutGenerator.js';
import {
    ALL_WORKOUT_CONFIGS
    // ENDURANCE_BASE_CONFIG,
    // GENERAL_ENDURANCE_CONFIG,
    // MAX_SPRINT_CONFIG,
    // SPEED_ENDURANCE_CONFIG,
    // THRESHOLD_DEVELOPMENT_CONFIG,
    // THRESHOLD_SUSTAINED_CONFIG
} from './mainSetConfigs.js';

// The individual functions are now replaced by calls to the generator

export const ENDURANCE_BASE = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    return generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, ALL_WORKOUT_CONFIGS.ENDURANCE_BASE);
};

export const GENERAL_ENDURANCE = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    return generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, ALL_WORKOUT_CONFIGS.GENERAL_ENDURANCE);
};

export const MAX_SPRINT = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    return generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, ALL_WORKOUT_CONFIGS.MAX_SPRINT);
};

export const SPEED_ENDURANCE = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    return generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, ALL_WORKOUT_CONFIGS.SPEED_ENDURANCE);
};

export const THRESHOLD_DEVELOPMENT = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    return generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, ALL_WORKOUT_CONFIGS.THRESHOLD_DEVELOPMENT);
};

export const THRESHOLD_SUSTAINED = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    return generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, ALL_WORKOUT_CONFIGS.THRESHOLD_SUSTAINED);
};

// This object is used by other parts of the application to select a main set function.
// It now correctly points to the new wrapper functions.
export const mainSetFunctions = {
    ENDURANCE_BASE: ENDURANCE_BASE,
    GENERAL_ENDURANCE: GENERAL_ENDURANCE,
    MAX_SPRINT: MAX_SPRINT,
    SPEED_ENDURANCE: SPEED_ENDURANCE,
    THRESHOLD_DEVELOPMENT: THRESHOLD_DEVELOPMENT,
    THRESHOLD_SUSTAINED: THRESHOLD_SUSTAINED,
};
