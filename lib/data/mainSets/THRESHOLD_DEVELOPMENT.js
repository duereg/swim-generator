// Content of lib/data/mainSets/THRESHOLD_DEVELOPMENT.js to be updated:

export const THRESHOLD_DEVELOPMENT = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    let sets = [];
    let mainSetTotalDist = 0;
    // New pace: CSS - 1 to 2 seconds
    let targetPacePer100 = cssSecondsPer100 - 1 - Math.random(); // Results in css - 1.0 to css - 1.999...

    const en3SetPatterns = [
        // Ordered by required distance (largest first) to pick the biggest one that fits
        { id: '4x600', reps: 4, dist: 600, rest: 'r90"', requiredDist: 4 * 600, paceDesc: 'CSS -1-2s' },
        { id: '4x500', reps: 4, dist: 500, rest: 'r60"', requiredDist: 4 * 500, paceDesc: 'CSS -1-2s' },
        { id: '4x400', reps: 4, dist: 400, rest: 'r45"', requiredDist: 4 * 400, paceDesc: 'CSS -1-2s' }
    ];

    let chosenSet = null;

    for (const pattern of en3SetPatterns) {
        if (remainingDistanceForMainSet >= pattern.requiredDist) {
            chosenSet = pattern;
            break; // Found the largest fitting pattern
        }
    }

    // Fallback: If no pattern fits, maybe try a smaller number of reps of the smallest distance?
    // e.g., if remaining is 1000, 4x400 (1600) doesn't fit. Maybe 2x400?
    // The guideline is "4X500", "4X400", "4x600". It's quite specific about 4 reps.
    // For now, if a full pattern doesn't fit, no set is generated.
    // Minimum requirement for EN3 would be the smallest set: 4x400 = 1600 yards.
    // Or, we could allow fewer reps if at least one rep of the smallest distance (400) fits.
    // Let's try to allow partial sets if at least one rep of 400, 500, or 600 can be done.
    // And prioritize 4 reps if possible.

    if (!chosenSet && remainingDistanceForMainSet >= 400) { // Min distance for a single rep
        const singleRepOptions = [
            { dist: 600, rest: 'r90"', paceDesc: 'CSS -1-2s', baseReps: 4 },
            { dist: 500, rest: 'r60"', paceDesc: 'CSS -1-2s', baseReps: 4 },
            { dist: 400, rest: 'r45"', paceDesc: 'CSS -1-2s', baseReps: 4 }
        ];

        let bestPartialOption = null;
        let maxPartialYardage = 0;

        for (const option of singleRepOptions) {
            if (remainingDistanceForMainSet >= option.dist) {
                let numReps = Math.floor(remainingDistanceForMainSet / option.dist);
                numReps = Math.min(numReps, option.baseReps); // Try to do up to 4 reps

                if (numReps > 0) {
                    const currentYardage = numReps * option.dist;
                    // Prefer options that use more yardage. If tied, prefer more reps. If also tied, prefer longer distance.
                    if (currentYardage > maxPartialYardage) {
                        maxPartialYardage = currentYardage;
                        bestPartialOption = { ...option, reps: numReps, requiredDist: currentYardage, id: `${numReps}x${option.dist}`};
                    } else if (currentYardage === maxPartialYardage) {
                        if (numReps > bestPartialOption.reps) {
                             bestPartialOption = { ...option, reps: numReps, requiredDist: currentYardage, id: `${numReps}x${option.dist}`};
                        } else if (numReps === bestPartialOption.reps && option.dist > bestPartialOption.dist) {
                             bestPartialOption = { ...option, reps: numReps, requiredDist: currentYardage, id: `${numReps}x${option.dist}`};
                        }
                    }
                }
            }
        }
        if (bestPartialOption && bestPartialOption.reps > 0) { // Ensure at least 1 rep
             chosenSet = bestPartialOption;
        }
    }


    let descriptiveMessage;

    if (chosenSet) {
        sets.push(`${chosenSet.reps}x${chosenSet.dist} ${energySystem} focus swim @ ${chosenSet.paceDesc} ${chosenSet.rest}`);
        mainSetTotalDist = chosenSet.requiredDist;
        descriptiveMessage = `EN3: ${chosenSet.id} (${energySystem}) @ ${chosenSet.paceDesc}.`;
    } else {
        mainSetTotalDist = 0;
        const minReq = 400; // Smallest single rep distance
        if (remainingDistanceForMainSet < minReq) {
            descriptiveMessage = `EN3: Too short for EN3 sets (min rep 400). Available: ${remainingDistanceForMainSet}.`;
        } else {
            descriptiveMessage = `EN3: Could not fit standard EN3 set for ${energySystem}. Available: ${remainingDistanceForMainSet}. Required e.g. 4x400=1600.`;
        }
    }

    return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage };
};
