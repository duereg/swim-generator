const en3Distances = [50, 100, 150, 200];
const en3SecondaryDistances = [200, 300, 400];

export const THRESHOLD_DEVELOPMENT = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    let sets = [];
    let mainSetTotalDist = 0;
    let targetPacePer100 = cssSecondsPer100 - (Math.random() * 3);
    const en3Rest = `r${(Math.floor(Math.random() * (90 - 40 + 1)) + 40)}"`;

    if (remainingDistanceForMainSet < 50) { // Minimum for EN3 is typically 50
         return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `Threshold Development (${energySystem}) set - too short.` };
    }

    let en3RepDist = en3Distances[Math.floor(Math.random() * en3Distances.length)];

    if (remainingDistanceForMainSet < en3RepDist) {
         const possibleDists = en3Distances.filter(d => d <= remainingDistanceForMainSet);
         if (possibleDists.length > 0) {
             en3RepDist = possibleDists[possibleDists.length -1];
         } else { // Should not happen if remainingDistanceForMainSet >= 50 and en3Distances includes 50
             en3RepDist = 0; // will result in numEn3Reps = 0
         }
    }

    let numEn3Reps = (en3RepDist > 0) ? Math.floor(remainingDistanceForMainSet / en3RepDist) : 0;
    numEn3Reps = Math.min(numEn3Reps, 20);
    // No Math.max(numEn3Reps, 0) needed as floor will be >=0. If en3RepDist is 0, numEn3Reps is 0.

    if (numEn3Reps > 0) {
        sets.push(`${numEn3Reps}x${en3RepDist} ${energySystem} focus swim/kb ${en3Rest}`);
        mainSetTotalDist = numEn3Reps * en3RepDist;
    }

    let newRemainingDistance = remainingDistanceForMainSet - mainSetTotalDist;
    if (newRemainingDistance > 400) {
        let secondaryDist = en3SecondaryDistances[Math.floor(Math.random() * en3SecondaryDistances.length)];
        if (newRemainingDistance < secondaryDist) { // try to pick a smaller secondary dist
            const possibleSecDists = en3SecondaryDistances.filter(d => d <= newRemainingDistance);
            if (possibleSecDists.length > 0) {
                secondaryDist = possibleSecDists[possibleSecDists.length - 1];
            } else {
                secondaryDist = 0; // Cannot fit any secondary
            }
        }

        let secondaryReps = 0;
        if (secondaryDist > 0) {
            secondaryReps = Math.floor(newRemainingDistance / secondaryDist);
        }
        secondaryReps = Math.min(secondaryReps, 10);

        if (secondaryReps > 0) {
            sets.push(`${secondaryReps}x${secondaryDist} ${energySystem} focus swim ${en3Rest}`);
            mainSetTotalDist += secondaryReps * secondaryDist;
        }
    }

    if (mainSetTotalDist === 0 && remainingDistanceForMainSet >= 50) {
        let fallbackDist = en3Distances[0]; // Smallest standard EN3 distance (50)
        if (remainingDistanceForMainSet < fallbackDist) fallbackDist = 0; // Should not happen if initial check is >=50

        if (fallbackDist > 0) {
             let fallbackReps = Math.floor(remainingDistanceForMainSet / fallbackDist);
             fallbackReps = Math.min(fallbackReps, 5); // Cap fallback reps
             if (fallbackReps > 0) {
                sets.push(`${fallbackReps}x${fallbackDist} ${energySystem} focus swim ${en3Rest}`);
                mainSetTotalDist = fallbackReps * fallbackDist;
             }
        }
    }
    return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Threshold Development (${energySystem}) set.` };
};
