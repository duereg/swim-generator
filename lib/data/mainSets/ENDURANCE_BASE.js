const en1Distances = [200, 300, 400, 500];

export const ENDURANCE_BASE = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    let sets = [];
    let mainSetTotalDist = 0;
    let targetPacePer100 = cssSecondsPer100 + (Math.random() * 5);

    if (remainingDistanceForMainSet < 25) {
        return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `Endurance Base (${energySystem}) set - too short.` };
    }

    let en1RepDist = 0;
    let numEn1Reps = 0;

    if (remainingDistanceForMainSet < 200) { // Path for 25-199 yards
        const shortEn1Dists = [150, 125, 100, 75, 50, 25]; // Largest to smallest
        for (const dist of shortEn1Dists) {
            if (remainingDistanceForMainSet >= dist) {
                en1RepDist = dist;
                numEn1Reps = Math.floor(remainingDistanceForMainSet / en1RepDist);
                break; // Found the largest fitting repDist from short list
            }
        }
    } else if (remainingDistanceForMainSet <= 600) { // Path for 200-600 yards
        const midEn1Dists = [300, 250, 200, 150, 100, 75, 50]; // Ordered to try larger ones first
        let bestCurrentRepDist = 0;
        let bestCurrentNumReps = 0;
        let smallestRemainderSoFar = Infinity;

        for (const dist of midEn1Dists) {
            if (remainingDistanceForMainSet >= dist) {
                let currentNumReps = Math.floor(remainingDistanceForMainSet / dist);
                // Apply a cap on reps for this mid-range to avoid too many short reps
                let maxRepsForDist = 5; // Default cap
                if (dist >= 200) maxRepsForDist = 3;
                else if (dist >= 150) maxRepsForDist = 4;
                currentNumReps = Math.min(currentNumReps, maxRepsForDist);

                if (currentNumReps === 0) continue;

                let currentRemainder = remainingDistanceForMainSet - (currentNumReps * dist);
                if (currentRemainder < smallestRemainderSoFar) {
                    smallestRemainderSoFar = currentRemainder;
                    bestCurrentRepDist = dist;
                    bestCurrentNumReps = currentNumReps;
                } else if (currentRemainder === smallestRemainderSoFar) {
                    if (dist > bestCurrentRepDist) { // Prefer larger repDist if remainder is same
                        bestCurrentRepDist = dist;
                        bestCurrentNumReps = currentNumReps;
                    }
                }
            }
        }
        en1RepDist = bestCurrentRepDist;
        numEn1Reps = bestCurrentNumReps;
    } else { // Path for > 600 yards
        let selectedDist = en1Distances[Math.floor(Math.random() * en1Distances.length)]; // [200,300,400,500]
        if (selectedDist > remainingDistanceForMainSet) { // Should be rare if remaining > 600
            for (let j = en1Distances.length - 1; j >= 0; j--) {
                if (en1Distances[j] <= remainingDistanceForMainSet) {
                    selectedDist = en1Distances[j];
                    break;
                }
            }
        }
        en1RepDist = selectedDist;
        if (en1RepDist > 0) {
            numEn1Reps = Math.floor(remainingDistanceForMainSet / en1RepDist);
            numEn1Reps = Math.min(numEn1Reps, 15); // Cap for standard long distances
        }
    }

    if (numEn1Reps > 0 && en1RepDist > 0) {
        // Final check to prevent exceeding (should be redundant due to Math.floor)
        if (numEn1Reps * en1RepDist > remainingDistanceForMainSet) {
            numEn1Reps = Math.floor(remainingDistanceForMainSet / en1RepDist);
        }
        if (numEn1Reps > 0) { // Check again after potential adjustment
            let en1Rest = `r${(Math.floor(Math.random() * (60 - 30 + 1)) + 30)}"`;
            sets.push(`${numEn1Reps}x${en1RepDist} ${energySystem} focus swim/kick ${en1Rest}`);
            mainSetTotalDist = numEn1Reps * en1RepDist;
        } else { mainSetTotalDist = 0; }
    } else { mainSetTotalDist = 0; }

    return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Endurance Base (${energySystem}) set.` };
};
