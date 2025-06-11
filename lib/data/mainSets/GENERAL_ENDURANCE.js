export const GENERAL_ENDURANCE = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    let sets = [];
    let mainSetTotalDist = 0;
    let targetPacePer100 = cssSecondsPer100;
    const generalDistances = [400, 300, 200, 100, 50];
    let bestRepDist = 0;
    let bestNumReps = 0;
    let smallestRemainder = Infinity;

    if (remainingDistanceForMainSet < 25) { // Smallest possible rep distance
        return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `General Endurance (${energySystem}) set - too short.` };
    }

    for (const dist of generalDistances) {
        if (remainingDistanceForMainSet >= dist) {
            let currentNumReps = Math.floor(remainingDistanceForMainSet / dist);
            let currentRemainder = remainingDistanceForMainSet - (currentNumReps * dist);
            if (currentNumReps > 0) { // Only consider if at least one rep is possible
                if (currentRemainder < smallestRemainder) {
                    smallestRemainder = currentRemainder;
                    bestRepDist = dist;
                    bestNumReps = currentNumReps;
                } else if (currentRemainder === smallestRemainder) {
                    if (dist > bestRepDist) { // Prefer larger rep distance for same remainder
                        bestRepDist = dist;
                        bestNumReps = currentNumReps;
                    }
                }
            }
        }
    }

    if (bestNumReps === 0 && remainingDistanceForMainSet >= 25) {
        // If no standard dist fits (e.g. remaining 75), make one up
        // Try to make it a multiple of 25 or 50.
        if (remainingDistanceForMainSet >= 50) {
             bestRepDist = Math.floor(remainingDistanceForMainSet / 50) * 50;
             if(bestRepDist === 0) bestRepDist = 50; // if remaining is e.g. 70, floor(70/50)*50 = 50
        } else { // remaining is 25 to 49
             bestRepDist = 25;
        }
        if (bestRepDist > 0) bestNumReps = Math.floor(remainingDistanceForMainSet / bestRepDist);
        if (bestNumReps * bestRepDist > remainingDistanceForMainSet) bestNumReps = 0; // safety
    }

    // --- Start of new conservative adjustment logic ---
    if (bestNumReps > 0 && bestRepDist > 0) {
        let calculatedDist = bestNumReps * bestRepDist;

        if (calculatedDist > remainingDistanceForMainSet * 0.80 && bestRepDist >= 200 && bestNumReps > 2) {
            console.log(`DEBUG GENERAL_ENDURANCE: Conservative adjustment. Original reps: ${bestNumReps}x${bestRepDist}. Reducing reps by 1.`);
            bestNumReps--;
        }
    }
    // --- End of new conservative adjustment logic ---

    if (bestNumReps > 0 && bestRepDist > 0) { // Ensure still valid after potential decrement
        let restTime = 30;
        if (bestRepDist >= 300) restTime = 45;
        else if (bestRepDist >= 200) restTime = 30;
        else if (bestRepDist >= 100) restTime = 20;
        else restTime = 15;
        sets.push(`${bestNumReps}x${bestRepDist} swim (${energySystem} focus) r${restTime}"`);
        mainSetTotalDist = bestNumReps * bestRepDist;
    } else {
         mainSetTotalDist = 0;
    }
    return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `General Endurance (${energySystem}) default set.` };
};
