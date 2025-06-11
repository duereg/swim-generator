export const THRESHOLD_SUSTAINED = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    let sets = [];
    let mainSetTotalDist = 0;
    // New pace: At CSS
    let targetPacePer100 = cssSecondsPer100;

    console.log('--- THRESHOLD_SUSTAINED ---');
    console.log('remainingDistanceForMainSet:', remainingDistanceForMainSet);

    const en2SetPatterns = [
        // Ordered by a rough preference or commonality, can be adjusted
        { id: '18x100', reps: 18, dist: 100, rest: 'r10"', requiredDist: 18 * 100, paceDesc: 'CSS' },
        { id: '10x200', reps: 10, dist: 200, rest: 'r20"', requiredDist: 10 * 200, paceDesc: 'CSS' },

        // For longer intervals, allow variable reps
        { id: 'Nx400', baseDist: 400, rest: 'r40"', maxReps: 18, paceDesc: 'CSS' }, 
        { id: 'Nx500', baseDist: 500, rest: 'r50"', maxReps: 14, paceDesc: 'CSS' }, 
        { id: 'Nx600', baseDist: 600, rest: 'r60"', maxReps: 12, paceDesc: 'CSS' }, 
        { id: 'Nx800', baseDist: 800, rest: 'r90"', maxReps: 8, paceDesc: 'CSS' }, 
        { id: 'Nx1000', baseDist: 1000, rest: 'r90"', maxReps: 6, paceDesc: 'CSS' } 
    ];
    console.log('en2SetPatterns:', JSON.stringify(en2SetPatterns.map(p => p.id)));

    let viablePatterns = [];

    for (const pattern of en2SetPatterns) {
        if (pattern.baseDist) { // For NxDist patterns
            if (remainingDistanceForMainSet >= pattern.baseDist) {
                let numReps = Math.floor(remainingDistanceForMainSet / pattern.baseDist);
                numReps = Math.min(numReps, pattern.maxReps);
                if (numReps > 0) {
                    const currentSetTotalDist = numReps * pattern.baseDist;
                    viablePatterns.push({
                        reps: numReps,
                        dist: pattern.baseDist,
                        rest: pattern.rest,
                        totalDist: currentSetTotalDist,
                        paceDesc: pattern.paceDesc,
                        id: `${numReps}x${pattern.baseDist}`
                    });
                }
            }
        } else { // For fixed rep x dist patterns
            if (remainingDistanceForMainSet >= pattern.requiredDist) {
                viablePatterns.push({
                    reps: pattern.reps,
                    dist: pattern.dist,
                    rest: pattern.rest,
                    totalDist: pattern.requiredDist,
                    paceDesc: pattern.paceDesc,
                    id: pattern.id
                });
            }
        }
    }
    console.log('Viable patterns after filtering:', JSON.stringify(viablePatterns.map(p => p.id)));

    let bestFitSet = null;
    let selectionMethod = '';

    if (viablePatterns.length > 0) {
        if (viablePatterns.length === 1) {
            bestFitSet = viablePatterns[0];
            selectionMethod = 'Single viable pattern';
        } else {
            // Prioritize patterns that use more of the available distance
            let maxDistance = 0;
            viablePatterns.forEach(pattern => {
                if (pattern.totalDist > maxDistance) {
                    maxDistance = pattern.totalDist;
                }
            });
            const bestDistancePatterns = viablePatterns.filter(p => p.totalDist === maxDistance);

            if (bestDistancePatterns.length === 1) {
                bestFitSet = bestDistancePatterns[0];
                selectionMethod = 'Single best distance pattern';
            } else {
                // If multiple patterns achieve the same max distance, pick one randomly
                const randomIndex = Math.floor(Math.random() * bestDistancePatterns.length);
                bestFitSet = bestDistancePatterns[randomIndex];
                selectionMethod = `Randomly selected from ${bestDistancePatterns.length} best distance patterns`;
            }
        }
    } else {
        selectionMethod = 'Fallback logic initiated';
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
            selectionMethod += ' -> Attempting fallback with 200s';
        } else { // Must be 100s
            fallbackDist = 100;
            fallbackReps = Math.min(Math.floor(remainingDistanceForMainSet / 100), 60); 
            fallbackRest = 'r10"';
            selectionMethod += ' -> Attempting fallback with 100s';
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
                selectionMethod += ` -> Selected fallback: ${bestFitSet.id}`;
            } else {
                selectionMethod += ' -> Fallback resulted in no meaningful set (totalDist <=0)';
            }
        } else {
            selectionMethod += ' -> Fallback resulted in no meaningful set (fallbackReps <=0)';
        }
    } else {
        if (bestFitSet) { // This case should ideally not be reached if !bestFitSet is the entry condition
             selectionMethod += ' -> Fallback logic skipped (bestFitSet already found, unexpected)';
        } else if (remainingDistanceForMainSet < 100) {
            selectionMethod += ' -> Fallback logic skipped (remainingDistance < 100)';
        } else {
            selectionMethod += ' -> Fallback logic skipped (conditions not met, this is unexpected if viablePatterns was empty)';
        }
    }
}

    console.log('Pattern selection method:', selectionMethod);
    console.log('Final bestFitSet:', bestFitSet ? JSON.stringify(bestFitSet) : 'null');

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
    console.log('Descriptive message:', descriptiveMessage);
    console.log('--- END THRESHOLD_SUSTAINED ---');

    return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage };
};
