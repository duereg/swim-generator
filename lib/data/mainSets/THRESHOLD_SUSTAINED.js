// Content of lib/data/mainSets/THRESHOLD_SUSTAINED.js to be updated:

export const THRESHOLD_SUSTAINED = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    let sets = [];
    let mainSetTotalDist = 0;
    // New pace: At CSS
    let targetPacePer100 = cssSecondsPer100;

    const en2SetPatterns = [
        // Ordered by a rough preference or commonality, can be adjusted
        { id: '18x100', reps: 18, dist: 100, rest: 'r10"', requiredDist: 18 * 100, paceDesc: 'CSS' },
        { id: '10x200', reps: 10, dist: 200, rest: 'r20"', requiredDist: 10 * 200, paceDesc: 'CSS' },
        { id: '5x400', reps: 5, dist: 400, rest: 'r40"', requiredDist: 5 * 400, paceDesc: 'CSS' },
        { id: '3x600', reps: 3, dist: 600, rest: 'r60"', requiredDist: 3 * 600, paceDesc: 'CSS' },
        // For 800s and 1000s, allow variable reps, e.g., 2-3 reps
        // Max total yardage around 2000-3000 for these longer reps
        { id: 'Nx800', baseDist: 800, rest: 'r90"', maxReps: 3, paceDesc: 'CSS' }, // 3x800=2400
        { id: 'Nx1000', baseDist: 1000, rest: 'r90"', maxReps: 2, paceDesc: 'CSS' } // 2x1000=2000
    ];

    let bestFitSet = null;
    let maxAchievedDistance = 0;

    for (const pattern of en2SetPatterns) {
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
                            id: `${numReps}x${pattern.baseDist}`
                        };
                    }
                }
            }
        } else { // For fixed rep x dist patterns
            if (remainingDistanceForMainSet >= pattern.requiredDist) {
                // If it fits, it's a candidate. Prefer sets that use more of the available distance.
                if (pattern.requiredDist > maxAchievedDistance) {
                    maxAchievedDistance = pattern.requiredDist;
                    bestFitSet = {
                        reps: pattern.reps,
                        dist: pattern.dist,
                        rest: pattern.rest,
                        totalDist: pattern.requiredDist,
                        paceDesc: pattern.paceDesc,
                        id: pattern.id
                    };
                }
            }
        }
    }

    // Fallback: if no specific pattern fits, try to construct a simpler set.
    // E.g., if remaining is 1200, 18x100 (1800) is too much.
    // Perhaps multiple shorter sets or a smaller version of one.
    // The guidelines are specific about the set structures.
    // If remainingDistanceForMainSet is too small for any of these, it produces no set.
    // Let's try a simpler fallback: if less than the smallest full set (1800), try to do multiples of 100s or 200s at CSS.
    if (!bestFitSet && remainingDistanceForMainSet >= 100) {
        let fallbackDist = 0, fallbackReps = 0, fallbackRest = '', fallbackTotal = 0;

        if (remainingDistanceForMainSet >= 200) { // Try 200s first
            fallbackDist = 200;
            fallbackReps = Math.min(Math.floor(remainingDistanceForMainSet / 200), 9); // Cap at 9x200 (less than 10x200 pattern)
            fallbackRest = 'r20"';
        } else { // Must be 100s
            fallbackDist = 100;
            fallbackReps = Math.min(Math.floor(remainingDistanceForMainSet / 100), 17); // Cap at 17x100
            fallbackRest = 'r10"';
        }
        if (fallbackReps > 0) {
            fallbackTotal = fallbackReps * fallbackDist;
            if (fallbackTotal > 0) { // Ensure it's a meaningful set
                 bestFitSet = {
                    reps: fallbackReps,
                    dist: fallbackDist,
                    rest: fallbackRest,
                    totalDist: fallbackTotal,
                    paceDesc: 'CSS',
                    id: `${fallbackReps}x${fallbackDist} (fallback)`
                };
            }
        }
    }


    let descriptiveMessage;

    if (bestFitSet) {
        sets.push(`${bestFitSet.reps}x${bestFitSet.dist} ${energySystem} focus swim @ ${bestFitSet.paceDesc} ${bestFitSet.rest}`);
        mainSetTotalDist = bestFitSet.totalDist;
        descriptiveMessage = `EN2: ${bestFitSet.id} (${energySystem}) @ CSS.`;
    } else {
        mainSetTotalDist = 0;
        if (remainingDistanceForMainSet < 100) {
            descriptiveMessage = `EN2: Too short for EN2 sets. Available: ${remainingDistanceForMainSet}.`;
        } else {
            descriptiveMessage = `EN2: Could not fit standard EN2 set for ${energySystem}. Available: ${remainingDistanceForMainSet}.`;
        }
    }

    return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage };
};
