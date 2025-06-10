const sp2Distances = [25, 50];

export const MAX_SPRINT = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    let sets = [];
    let mainSetTotalDist = 0;
    let targetPacePer100 = cssSecondsPer100 - (10 + Math.random() * 15);
    let numReps = 0;
    let repDist = 0;

    const has50 = sp2Distances.includes(50);
    const has25 = sp2Distances.includes(25);

    if (remainingDistanceForMainSet < (has25 ? 25 : (has50 ? 50 : Infinity))) {
         return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `Max Sprint (${energySystem}) set - too short.` };
    }

    let initialRepDist;
    if (has50 && remainingDistanceForMainSet >= 750) {
        initialRepDist = 50;
    } else if (has25) {
        initialRepDist = 25;
    } else if (has50) {
        initialRepDist = 50;
    } else {
         return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `Max Sprint (${energySystem}) set - no valid distances.` };
    }

    const initialAbsoluteMaxReps = (initialRepDist === 50) ? 24 : 32; // Changed from 30:40
    let numRepsForInitialDist = 0;
    if (initialRepDist > 0) {
        numRepsForInitialDist = Math.min(Math.floor(remainingDistanceForMainSet / initialRepDist), initialAbsoluteMaxReps);
    }

    let currentCalcDist = numRepsForInitialDist * initialRepDist;

    repDist = initialRepDist;
    numReps = numRepsForInitialDist;

    if (initialRepDist === 25 && has50) {
        const potentialReps50 = Math.min(Math.floor(remainingDistanceForMainSet / 50), 24); // Changed cap from 30 to 24
        const potentialDist50 = potentialReps50 * 50;
        const isSignificantUndershootWith25s = currentCalcDist < remainingDistanceForMainSet * 0.85;

        if (isSignificantUndershootWith25s && potentialDist50 > currentCalcDist) {
            repDist = 50;
            numReps = potentialReps50;
        }
    }

    if (numReps === 0 && repDist > 0 && remainingDistanceForMainSet >= repDist) {
        numReps = 1;
    }

    if (numReps > 0 && repDist > 0) {
        mainSetTotalDist = numReps * repDist;
        const sp2Rest = "1'r";
        sets.push(`${numReps}x${repDist} UW sprint (${energySystem} focus, breath at wall) @ ${sp2Rest}`);
    } else {
        mainSetTotalDist = 0;
        sets = [];
    }

    return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Max Sprint (${energySystem}) set.` };
};
