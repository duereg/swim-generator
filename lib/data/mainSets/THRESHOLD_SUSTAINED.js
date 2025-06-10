const en2Distances = [100, 200, 300, 400];

export const THRESHOLD_SUSTAINED = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    let sets = [];
    let mainSetTotalDist = 0;
    let targetPacePer100 = cssSecondsPer100 + (Math.random() * 3 - 1.5);

    if (remainingDistanceForMainSet < 25) {
         return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `Threshold Sustained (${energySystem}) set - too short.` };
    }

    let en2RepDist = en2Distances[Math.floor(Math.random() * en2Distances.length)];

    if (remainingDistanceForMainSet < en2RepDist) {
        const possibleDists = en2Distances.filter(d => d <= remainingDistanceForMainSet);
        if (possibleDists.length > 0) {
            en2RepDist = possibleDists[possibleDists.length - 1];
        } else {
            if (remainingDistanceForMainSet >= 50) {
                en2RepDist = Math.floor(remainingDistanceForMainSet / 50) * 50;
                if (en2RepDist === 0) en2RepDist = 50;
            } else if (remainingDistanceForMainSet >= 25) {
                en2RepDist = 25;
            } else {
                return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `Threshold Sustained (${energySystem}) set - too short.` };
            }
        }
    }

    let numEn2Reps = (en2RepDist > 0) ? Math.floor(remainingDistanceForMainSet / en2RepDist) : 0;
    numEn2Reps = Math.min(numEn2Reps, 25); // Changed cap from 20 to 25
    numEn2Reps = Math.max(numEn2Reps, 1);

    if (numEn2Reps * en2RepDist > remainingDistanceForMainSet) {
         numEn2Reps = 0;
    }

    if (numEn2Reps > 0) {
        let en2Rest = `r${(Math.floor(Math.random() * (30 - 20 + 1)) + 20)}"`;
        sets.push(`${numEn2Reps}x${en2RepDist} ${energySystem} focus swim ${en2Rest}`);
        mainSetTotalDist = numEn2Reps * en2RepDist;
    } else {
        mainSetTotalDist = 0;
    }
    return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Threshold Sustained (${energySystem}) set.` };
};
