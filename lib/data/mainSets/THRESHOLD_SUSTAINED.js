export const THRESHOLD_SUSTAINED = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    let sets = [];
    let mainSetTotalDist = 0;
    // New pace: At CSS
    let targetPacePer100 = cssSecondsPer100;

    const en2SetPatterns = [
        // Ordered by a rough preference or commonality, can be adjusted
        { id: '18x100', reps: 18, dist: 100, rest: 'r10"', requiredDist: 18 * 100, paceDesc: 'CSS' },
        { id: '10x200', reps: 10, dist: 200, rest: 'r20"', requiredDist: 10 * 200, paceDesc: 'CSS' },

        // For longer intervals, allow variable reps
        { id: 'Nx400', baseDist: 400, rest: 'r40"', maxReps: 18, paceDesc: 'CSS' }, 
        { id: 'Nx500', baseDist: 500, rest: 'r50"', maxReps: 14, paceDesc: 'CSS', randomChoiceGroup: '500_1000' },
        { id: 'Nx600', baseDist: 600, rest: 'r60"', maxReps: 12, paceDesc: 'CSS' }, 
        { id: 'Nx800', baseDist: 800, rest: 'r90"', maxReps: 8, paceDesc: 'CSS' }, 
        { id: 'Nx1000', baseDist: 1000, rest: 'r90"', maxReps: 6, paceDesc: 'CSS', randomChoiceGroup: '500_1000' }
    ];

    let bestFitSet = null;
    let maxAchievedDistance = 0;
    let randomChoiceCandidates = [];

    for (const pattern of en2SetPatterns) {
        if (pattern.baseDist) { // For NxDist patterns (800, 1000)
            if (remainingDistanceForMainSet >= pattern.baseDist) {
                let numReps = Math.floor(remainingDistanceForMainSet / pattern.baseDist);
                numReps = Math.min(numReps, pattern.maxReps);
                if (numReps > 0) {
                    const currentSetTotalDist = numReps * pattern.baseDist;
                    const candidateSet = {
                        reps: numReps,
                        dist: pattern.baseDist,
                        rest: pattern.rest,
                        totalDist: currentSetTotalDist,
                        paceDesc: pattern.paceDesc,
                        id: `${numReps}x${pattern.baseDist}`
                    };

                    if (currentSetTotalDist > maxAchievedDistance) {
                        maxAchievedDistance = currentSetTotalDist;
                        bestFitSet = candidateSet;
                        if (pattern.randomChoiceGroup === '500_1000') {
                            randomChoiceCandidates = [bestFitSet];
                        } else {
                            randomChoiceCandidates = [];
                        }
                    } else if (currentSetTotalDist === maxAchievedDistance && pattern.randomChoiceGroup === '500_1000') {
                        // current `pattern` is a 500_1000 group member, and its distance equals maxAchievedDistance.
                        // `bestFitSet` holds the item that currently provides maxAchievedDistance.

                        // If randomChoiceCandidates is empty, it implies bestFitSet was NOT a '500_1000' item
                        // (or no set better than a potential '500_1000' of this distance has been found yet).
                        // So, this current 'candidateSet' is the first '500_1000' item for this distance group.
                        if (randomChoiceCandidates.length === 0) {
                            randomChoiceCandidates = [candidateSet];
                        } else {
                            // randomChoiceCandidates is not empty. This means bestFitSet WAS a '500_1000' item and is in randomChoiceCandidates.
                            // Add the current candidateSet if it's not already there.
                            if (!randomChoiceCandidates.find(s => s.id === candidateSet.id)) {
                                randomChoiceCandidates.push(candidateSet);
                            }
                        }
                    }
                }
            }
        } else { // For fixed rep x dist patterns
            if (remainingDistanceForMainSet >= pattern.requiredDist) {
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
                    randomChoiceCandidates = []; // A non-randomizable set is now the best
                }
            }
        }
    }

    // Final selection from random candidates if available
    if (randomChoiceCandidates.length > 1) {
        // Ensure all candidates actually have the same totalDistance as maxAchievedDistance
        // This filters out candidates that might have been added if a non-500_1000 group set initially set a maxAchievedDistance
        // that was later matched by a 500_1000 group set.
        const finalCandidates = randomChoiceCandidates.filter(c => c.totalDist === maxAchievedDistance);
        if (finalCandidates.length > 1) {
            bestFitSet = finalCandidates[Math.floor(Math.random() * finalCandidates.length)];
        } else if (finalCandidates.length === 1) {
            // this can happen if bestFitSet was initially a non-500_1000, then a 500_1000 matched its distance
            bestFitSet = finalCandidates[0];
        }
        // If finalCandidates is empty or has one, but randomChoiceCandidates had more,
        // it implies they were for a previous, smaller maxAchievedDistance.
        // bestFitSet should already be the correct one from the loop logic.
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
            fallbackReps = Math.min(Math.floor(remainingDistanceForMainSet / 200), 40); 
            fallbackRest = 'r20"';
        } else { // Must be 100s
            fallbackDist = 100;
            fallbackReps = Math.min(Math.floor(remainingDistanceForMainSet / 100), 60); 
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
