// Content of lib/data/mainSets/ENDURANCE_BASE.js to be updated:

export const ENDURANCE_BASE = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    let sets = [];
    let mainSetTotalDist = 0;
    // New pace: CSS + 5-15 seconds
    let targetPacePer100 = cssSecondsPer100 + 5 + (Math.random() * 10);

    if (remainingDistanceForMainSet < 500) {
        return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `EN1: Too short. Min rep distance 500, available: ${remainingDistanceForMainSet}.` };
    }

    const allPossibleRepDistances = [500, 600, 700, 800, 900, 1000];
    let bestOption = { dist: 0, reps: 0, totalYardage: 0, is500: false };

    for (const currentDist of allPossibleRepDistances) {
        if (remainingDistanceForMainSet >= currentDist) {
            let currentReps = Math.floor(remainingDistanceForMainSet / currentDist);
            if (currentReps === 0) continue;

            let maxRepsForCurrentDist;
            if (currentDist === 500) maxRepsForCurrentDist = 12; // e.g. 12x500 is 6000
            else if (currentDist === 600) maxRepsForCurrentDist = 10; // e.g. 10x600 is 6000
            else if (currentDist === 700) maxRepsForCurrentDist = 8; // e.g. 8x700 is 5600
            else if (currentDist === 800) maxRepsForCurrentDist = 7; // e.g. 7x800 is 5600
            else if (currentDist === 900) maxRepsForCurrentDist = 6; // e.g. 6x900 is 5400
            else if (currentDist === 1000) maxRepsForCurrentDist = 6; // e.g. 6x1000 is 6000

            else maxRepsForCurrentDist = 1; // Should not happen with the defined list

            currentReps = Math.min(currentReps, maxRepsForCurrentDist);

            if (currentReps > 0) {
                const currentTotalYardage = currentReps * currentDist;
                const isCurrentDist500 = currentDist === 500;

                if (currentTotalYardage > bestOption.totalYardage) {
                    bestOption = { dist: currentDist, reps: currentReps, totalYardage: currentTotalYardage, is500: isCurrentDist500 };
                } else if (currentTotalYardage === bestOption.totalYardage) {
                    if (!bestOption.is500 && isCurrentDist500) { // Prefer 500s if yardage is same
                        bestOption = { dist: currentDist, reps: currentReps, totalYardage: currentTotalYardage, is500: isCurrentDist500 };
                    } else if (bestOption.is500 == isCurrentDist500 && currentReps > bestOption.reps) { // If 500-status is same, prefer more reps
                        bestOption = { dist: currentDist, reps: currentReps, totalYardage: currentTotalYardage, is500: isCurrentDist500 };
                    }
                }
            }
        }
    }

    let en1RepDist = bestOption.dist;
    let numEn1Reps = bestOption.reps;

    if (numEn1Reps > 0 && en1RepDist > 0) {
        // Fixed rest
        let en1Rest = 'r60"';
        sets.push(`${numEn1Reps}x${en1RepDist} ${energySystem} focus swim/kick ${en1Rest}`);
        mainSetTotalDist = numEn1Reps * en1RepDist;
    } else {
        // This case should ideally be minimal if remainingDistanceForMainSet >= 500
        mainSetTotalDist = 0;
    }

    let descriptiveMessage;
    if (mainSetTotalDist > 0) {
         descriptiveMessage = `EN1: ${numEn1Reps}x${en1RepDist} (${energySystem}), CSS +5-15s/100m pace guide, 60" rest.`;
    } else if (remainingDistanceForMainSet < 500) { // Should be caught at the top
        descriptiveMessage = `EN1: Too short. Min rep distance 500, available: ${remainingDistanceForMainSet}.`;
    } else { // remainingDistanceForMainSet >= 500 but no suitable sets found (highly unlikely with the logic)
        descriptiveMessage = `EN1: Could not fit EN1 reps for ${energySystem}. Available: ${remainingDistanceForMainSet}.`;
    }
    return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage };
};
