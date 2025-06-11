export const THRESHOLD_DEVELOPMENT = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    let sets = [];
    let mainSetTotalDist = 0;
    // New pace: CSS - 1 to 2 seconds
    let targetPacePer100 = cssSecondsPer100 - 1 - Math.random(); // Results in css - 1.0 to css - 1.999...

    const en3SetPatterns = [
        // New Nx patterns for longer distances
        { idFormat: 'Nx1000', baseDist: 1000, maxReps: 6, rest: 'r120"', paceDesc: 'CSS -1-2s' }, 
        { idFormat: 'Nx800', baseDist: 800, maxReps: 8, rest: 'r90"', paceDesc: 'CSS -1-2s' }, 
        { idFormat: 'Nx400', baseDist: 400, rest: 'r50"', maxReps: 18, paceDesc: 'CSS' }, 
        { idFormat: 'Nx500', baseDist: 500, rest: 'r60"', maxReps: 14, paceDesc: 'CSS' }, 
        { idFormat: 'Nx600', baseDist: 600, rest: 'r90"', maxReps: 12, paceDesc: 'CSS' }, 
    ];

    let bestFitSet = null;
    let maxAchievedDistance = 0;

    for (const pattern of en3SetPatterns) {
        if (pattern.baseDist) { // For NxDist patterns (800, 1000)
            if (remainingDistanceForMainSet >= pattern.baseDist) {
                let numReps = Math.floor(remainingDistanceForMainSet / pattern.baseDist);
                numReps = Math.min(numReps, pattern.maxReps);
                if (numReps > 0) {
                    const currentSetTotalDist = numReps * pattern.baseDist;
                    if (currentSetTotalDist > maxAchievedDistance) {
                        maxAchievedDistance = currentSetTotalDist;
                        bestFitSet = {
                            reps: numReps,
                            dist: pattern.baseDist,
                            rest: pattern.rest,
                            totalDist: currentSetTotalDist,
                            paceDesc: pattern.paceDesc,
                            id: `${numReps}x${pattern.baseDist}` // Dynamic ID
                        };
                    }
                }
            }
        } else { // For fixed rep x dist patterns (4x600, 4x500, 4x400)
            if (remainingDistanceForMainSet >= pattern.requiredDist) {
                // If it fits and is larger than any previously found NxDist set
                if (pattern.requiredDist > maxAchievedDistance) {
                    maxAchievedDistance = pattern.requiredDist;
                    bestFitSet = {
                        reps: pattern.reps,
                        dist: pattern.dist,
                        rest: pattern.rest,
                        totalDist: pattern.requiredDist,
                        paceDesc: pattern.paceDesc,
                        id: pattern.id // Fixed ID
                    };
                }
            }
        }
    }

    // Fallback logic: if remaining distance is less than the smallest fixed set (4x400=1600)
    // but larger than the smallest single rep (400), try to make a smaller set.
    // This prioritizes fitting any of the defined patterns first, even if they are large.
    // If no pattern fits (e.g. remainingDistanceForMainSet is 1200), this fallback kicks in.
    if (!bestFitSet && remainingDistanceForMainSet >= 400) {
        const singleRepOptions = [ // Keep baseReps for fallback scaling, but try to fill remaining
            { dist: 600, rest: 'r90"', paceDesc: 'CSS -1-2s', baseReps: 4 },
            { dist: 500, rest: 'r60"', paceDesc: 'CSS -1-2s', baseReps: 4 },
            { dist: 400, rest: 'r45"', paceDesc: 'CSS -1-2s', baseReps: 4 }
        ];

        let bestFallbackOption = null;
        let maxFallbackYardage = 0;

        for (const option of singleRepOptions) {
            if (remainingDistanceForMainSet >= option.dist) { // Must be able to do at least one rep
                let numReps = Math.floor(remainingDistanceForMainSet / option.dist);
                // For fallback, don't necessarily cap at baseReps, try to use up the distance
                // but still keep it reasonable, e.g. not more than maxReps of new patterns if applicable
                // For simplicity here, let's cap at a slightly higher number like 6-8 for fallback
                numReps = Math.min(numReps, 6); // Example cap for fallback reps

                if (numReps > 0) {
                    const currentYardage = numReps * option.dist;
                    if (currentYardage > maxFallbackYardage) {
                        maxFallbackYardage = currentYardage;
                        bestFallbackOption = {
                            reps: numReps,
                            dist: option.dist,
                            rest: option.rest,
                            totalDist: currentYardage,
                            paceDesc: option.paceDesc,
                            id: `${numReps}x${option.dist} (fallback)`
                        };
                    }
                }
            }
        }
        if (bestFallbackOption) {
            bestFitSet = bestFallbackOption; // Use this fallback set
        }
    }

    let descriptiveMessage;

    if (bestFitSet) {
        sets.push(`${bestFitSet.reps}x${bestFitSet.dist} ${energySystem} focus swim @ ${bestFitSet.paceDesc} ${bestFitSet.rest}`);
        mainSetTotalDist = bestFitSet.totalDist; // Use totalDist from the chosen set object
        descriptiveMessage = `EN3: ${bestFitSet.id} (${energySystem}) @ ${bestFitSet.paceDesc}.`;
    } else {
        mainSetTotalDist = 0;
        const minReq = 400; // Smallest single rep distance for any consideration
        if (remainingDistanceForMainSet < minReq) {
            descriptiveMessage = `EN3: Too short for EN3 sets (min rep 400). Available: ${remainingDistanceForMainSet}.`;
        } else {
            descriptiveMessage = `EN3: Could not fit standard or fallback EN3 set for ${energySystem}. Available: ${remainingDistanceForMainSet}.`;
        }
    }

    return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage };
};
