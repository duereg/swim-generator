export const ENDURANCE_BASE_CONFIG = {
    workoutTypeName: "EN1",
    minTotalDistanceForSet: 500,
    paceConfig: { baseMetric: "css", offset: 5, randomRange: 10, operator: "+" },
    setDefinitions: [
        { distance: 500, repScheme: { type: "dynamic", maxReps: 8 }, activity: "swim/kick", rest: 60 },
        { distance: 600, repScheme: { type: "dynamic", maxReps: 6 }, activity: "swim/kick", rest: 60 },
        { distance: 700, repScheme: { type: "dynamic", maxReps: 5 }, activity: "swim/kick", rest: 60 },
        { distance: 800, repScheme: { type: "dynamic", maxReps: 4 }, activity: "swim/kick", rest: 60 },
        { distance: 900, repScheme: { type: "dynamic", maxReps: 3 }, activity: "swim/kick", rest: 60 },
        { distance: 1000, repScheme: { type: "dynamic", maxReps: 2 }, activity: "swim/kick", rest: 60 },
    ],
    setRest: 0,
    setFormatting: { baseStructure: "{reps}x{dist} {activity} ({energySystem} focus) {rest}", defaultActivity: "swim/kick" },
    descriptiveMessages: {
        success: "EN1: {setSummary} ({energySystem}), CSS +5-15s/100m pace guide, 60\" rest.",
        tooShort: "EN1: Too short. Min rep distance {minRepDistForType}, available: {remainingDistance}.",
        fail: "EN1: Could not fit EN1 reps for {energySystem}. Available: {remainingDistance}."
    }
};

export const GENERAL_ENDURANCE_CONFIG = {
    workoutTypeName: "General Endurance",
    paceConfig: { baseMetric: "css", offset: 0, operator: "+" },
    setDefinitions: [
        { distance: 500, repScheme: { type: "dynamic", maxReps: Infinity }, rest: 60 },
        { distance: 400, repScheme: { type: "dynamic", maxReps: Infinity }, rest: 60 },
        { distance: 300, repScheme: { type: "dynamic", maxReps: Infinity }, rest: 45 },
        { distance: 200, repScheme: { type: "dynamic", maxReps: Infinity }, rest: 30 },
        { distance: 100, repScheme: { type: "dynamic", maxReps: Infinity }, rest: 20 },
        { distance: 50, repScheme: { type: "dynamic", maxReps: Infinity }, rest: 15 },
    ],
    setRest: 0,
    setFormatting: { baseStructure: "{reps}x{dist} swim ({energySystem} focus) {rest}", defaultActivity: "swim" },
    descriptiveMessages: {
        success: "General Endurance ({energySystem}) default set. {setSummary}",
        tooShort: "General Endurance ({energySystem}) set - too short. Available: {remainingDistance}.",
        fail: "General Endurance ({energySystem}): Could not fit set. Available: {remainingDistance}."
    }
};

export const MAX_SPRINT_CONFIG = {
    workoutTypeName: "SP2",
    paceConfig: { baseMetric: "css", offset: 10, randomRange: 5, operator: "-" },

    setDefinitions: [
        { distance: 25, repScheme: { type: "dynamic", maxReps: 20 }, activity: "UW sprint", notes: "breath at wall", rest: 60 },
        { distance: 50, repScheme: { type: "dynamic", maxReps: 10 }, activity: "UW sprint", notes: "breath at wall", rest: 120 },
    ],

    setRest: 60 * 5,
    setFormatting: { baseStructure: "{reps}x{dist} {activity} ({energySystem} focus, {notes}) {rest}", defaultActivity: "UW sprint" },
    descriptiveMessages: {
        success: "SP2: Lactate Production ({energySystem}), Near Max Effort. Set: {setSummary}. Total ~{totalDistance}yds.",
        tooShort: "SP2: Too short. Min rep 25. Available: {remainingDistance}.",
        fail: "SP2: Could not fit SP2 set. Available: {remainingDistance} (target yardage for SP2 is typically 300-600)."
    }
};

export const SPEED_ENDURANCE_CONFIG = {
    workoutTypeName: "SP1",
    paceConfig: { baseMetric: "css", offset: 3, randomRange: 2, operator: "-" },

    setDefinitions: [
        { distance: 25, repScheme: { type: "dynamic", maxReps: 32 }, rest: 20 },
        { distance: 50, repScheme: { type: "dynamic", maxReps: 16 }, rest: 30 },
        { distance: 75, repScheme: { type: "dynamic", maxReps: 12 }, rest: 40 },
        { distance: 100, repScheme: { type: "dynamic", maxReps: 8 }, rest: 45 },
        { distance: 200, repScheme: { type: "dynamic", maxReps: 4 }, rest: 60 },
    ],

    setRest: 90,
    setFormatting: { baseStructure: "{reps}x{dist} {activity} ({energySystem} focus) {rest}" },
    descriptiveMessages: {
        success: "SP1: Lactate Tolerance ({energySystem}), CSS -3-5s. Total ~{totalDistance}yds.",
        tooShort: "SP1: Too short. Min rep 25. Available: {remainingDistance}.",
        fail: "SP1: Could not fit SP1 set. Available: {remainingDistance} (target yardage for SP1 is typically 400-800)."
    }
};

export const THRESHOLD_DEVELOPMENT_CONFIG = {
    workoutTypeName: "EN3",
    paceConfig: { baseMetric: "css", offset: 1, randomRange: 1, operator: "-" },

    setDefinitions: [
        { id: 'Nx400_css_r50', distance: 400, repScheme: { type: "dynamic", maxReps: 18 }, rest: 50 },
        { id: 'Nx500_css_r60', distance: 500, repScheme: { type: "dynamic", maxReps: 14 }, rest: 60 },
        { id: 'Nx600_css_r90', distance: 600, repScheme: { type: "dynamic", maxReps: 12 }, rest: 90 },
    ],

    setRest: 0,
    setFormatting: { baseStructure: "{reps}x{dist} {energySystem} focus swim @ {paceDesc} {rest}", defaultActivity: "swim" },
    descriptiveMessages: {
        success: "EN3: {setSummary} ({energySystem}) @ {paceDescription}.",
        tooShort: "EN3: Too short for EN3 sets (min rep {minRepDistForType}). Available: {remainingDistance}.",
        fail: "EN3: Could not fit standard or fallback EN3 set for {energySystem}. Available: {remainingDistance}."
    }
};

export const THRESHOLD_SUSTAINED_CONFIG = {
    workoutTypeName: "EN2",
    paceConfig: { baseMetric: "css", offset: 0, operator: "+" },
    setDefinitions: [
        { id: '18x100_css_r10', distance: 100, repScheme: { type: 'dynamic', maxReps: 18 }, rest: 10 },
        { id: '10x200_css_r20', distance: 200, repScheme: { type: 'dynamic', maxReps: 10 }, rest: 20 },
        { id: 'Nx400_css_r40', distance: 400, repScheme: { type: 'dynamic', maxReps: 18 }, rest: 40 },
        { id: 'Nx500_css_r50', distance: 500, repScheme: { type: 'dynamic', maxReps: 14 }, rest: 50 },
        { id: 'Nx600_css_r60', distance: 600, repScheme: { type: 'dynamic', maxReps: 12 }, rest: 60 },
        { id: 'Nx800_css_r90', distance: 800, repScheme: { type: 'dynamic', maxReps: 8 }, rest: 90 },
        { id: 'Nx1000_css_r90', distance: 1000, repScheme: { type: 'dynamic', maxReps: 6 }, rest: 90 }
    ],
    setRest: 150,
    setFormatting: { baseStructure: "{reps}x{dist} {energySystem} focus swim @ {paceDesc} {rest}", defaultActivity: "swim" },
    descriptiveMessages: {
        success: "EN2: {setSummary} ({energySystem}) @ CSS.",
        tooShort: "EN2: Too short for EN2 sets. Available: {remainingDistance}.",
        fail: "EN2: Could not fit standard EN2 set for {energySystem}. Available: {remainingDistance}."
    }
};

export const ALL_WORKOUT_CONFIGS = {
    ENDURANCE_BASE: ENDURANCE_BASE_CONFIG,
    GENERAL_ENDURANCE: GENERAL_ENDURANCE_CONFIG,
    MAX_SPRINT: MAX_SPRINT_CONFIG,
    SPEED_ENDURANCE: SPEED_ENDURANCE_CONFIG,
    THRESHOLD_DEVELOPMENT: THRESHOLD_DEVELOPMENT_CONFIG,
    THRESHOLD_SUSTAINED: THRESHOLD_SUSTAINED_CONFIG
};

// Further comments removed.
