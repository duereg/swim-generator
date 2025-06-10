const sp1Distances = [25, 50, 75, 100];
const sp1Drills = ["swim", "kb", "FU", "HUHO"]; // FU = Fast Underwater, HUHO = Hypoxic Hips Out

export const SPEED_ENDURANCE = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    let sets = [];
    let mainSetTotalDist = 0;
    let targetPacePer100 = cssSecondsPer100 - (5 + Math.random() * 5);

    if (remainingDistanceForMainSet < sp1Distances[0]) { // sp1Distances[0] is typically 25
        return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `Speed Endurance (${energySystem}) set - too short.` };
    }

    let numBlocks;
    if (remainingDistanceForMainSet < 600) numBlocks = 1;
    else if (remainingDistanceForMainSet < 1200) numBlocks = 2;
    else numBlocks = 3;

    let blockDistRemainingForReps = remainingDistanceForMainSet;
    let accumulatedDist = 0;

    for (let i = 0; i < numBlocks; i++) {
        if (blockDistRemainingForReps < sp1Distances[0]) break;

        let targetDistForCurrentBlock = Math.floor(blockDistRemainingForReps / (numBlocks - i));
        let easyBreakDist = 0;
        let addEasyBreakString = false;

        if (i < numBlocks - 1 && (blockDistRemainingForReps - targetDistForCurrentBlock) > 100) { // Check if there's room for break AND next block
            if (Math.random() > 0.5) {
                if (targetDistForCurrentBlock > 150 && blockDistRemainingForReps - (targetDistForCurrentBlock - 50) >= 50 ) { // Ensure rep part & overall remaining is substantial
                    easyBreakDist = 50;
                    targetDistForCurrentBlock -= easyBreakDist;
                    addEasyBreakString = true;
                }
            }
        }

        if (targetDistForCurrentBlock < sp1Distances[0] && addEasyBreakString) {
            targetDistForCurrentBlock += easyBreakDist; // Reclaim break dist
            easyBreakDist = 0;
            addEasyBreakString = false;
        }

        if (targetDistForCurrentBlock < sp1Distances[0]) continue;

        let repDist = sp1Distances[Math.floor(Math.random() * sp1Distances.length)];
        if (repDist > targetDistForCurrentBlock && targetDistForCurrentBlock >= sp1Distances[0]) {
            for (let j = sp1Distances.length - 1; j >= 0; j--) {
                if (sp1Distances[j] <= targetDistForCurrentBlock) {
                    repDist = sp1Distances[j];
                    break;
                }
            }
            if (repDist > targetDistForCurrentBlock && sp1Distances.length > 0 && sp1Distances[0] <= targetDistForCurrentBlock) {
                 repDist = sp1Distances[0];
            } else if (repDist > targetDistForCurrentBlock) { // Target too small even for smallest sp1Distance
                continue;
            }
        } else if (repDist > targetDistForCurrentBlock) { // Initial random was too large, and target is smaller than smallest
             continue;
        }
        if (repDist === 0 && sp1Distances.length > 0) repDist = sp1Distances[0];
        if (repDist === 0) continue; // Should not happen if sp1Distances is not empty

        let numReps = (repDist > 0) ? Math.floor(targetDistForCurrentBlock / repDist) : 0;
        numReps = Math.min(numReps, 10); // Changed cap from 12 to 10

        if (numReps > 0) {
            const currentBlockActualRepDist = numReps * repDist;
            let rest = `r${(Math.floor(Math.random() * (40 - 30 + 1)) + 30)}"`;
            let drillType = sp1Drills[Math.floor(Math.random() * sp1Drills.length)];
            sets.push(`${numReps}x${repDist} ${drillType} (${energySystem} focus) ${rest}`);

            accumulatedDist += currentBlockActualRepDist;
            blockDistRemainingForReps -= currentBlockActualRepDist;

            if (addEasyBreakString && easyBreakDist > 0) {
                if (blockDistRemainingForReps >= easyBreakDist) {
                    sets.push("50 ez + wait for top");
                    accumulatedDist += easyBreakDist;
                    blockDistRemainingForReps -= easyBreakDist;
                }
            } else if (i < numBlocks - 1 && blockDistRemainingForReps > sp1Distances[0]) {
                if (Math.random() > 0.3) sets.push("2min rest");
            }
        } else if (easyBreakDist > 0) {
             if (blockDistRemainingForReps >= easyBreakDist) {
                sets.push(`${easyBreakDist} ez swim`);
                accumulatedDist += easyBreakDist;
                blockDistRemainingForReps -= easyBreakDist;
             }
        }
    }
    mainSetTotalDist = accumulatedDist;

    if (mainSetTotalDist < remainingDistanceForMainSet * 0.75 && remainingDistanceForMainSet > 200) {
        sets.length = 0;
        mainSetTotalDist = 0; // Reset for fallback calculation
        let fallbackRepDist = (remainingDistanceForMainSet > 400 && sp1Distances.includes(100)) ? 100 : (sp1Distances[1] || 50);
        if (remainingDistanceForMainSet < fallbackRepDist && sp1Distances.length > 0) fallbackRepDist = (sp1Distances[0] || 25);

        if (fallbackRepDist > 0) {
            let fallbackNumReps = Math.floor(remainingDistanceForMainSet / fallbackRepDist);
            fallbackNumReps = Math.min(fallbackNumReps, 16);
            if (fallbackNumReps > 0) {
                sets.push(`${fallbackNumReps}x${fallbackRepDist} swim (${energySystem} focus) r30"`);
                mainSetTotalDist = fallbackNumReps * fallbackRepDist;
            }
        }
    }
    if (mainSetTotalDist === 0 && remainingDistanceForMainSet >= sp1Distances[0]) {
        let fDist = (remainingDistanceForMainSet >= 50 && sp1Distances.includes(50)) ? 50 : sp1Distances[0];
        if (remainingDistanceForMainSet < fDist) {
             return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `Speed Endurance (${energySystem}) set - too short for fallback.` };
        }
        let fReps = Math.floor(remainingDistanceForMainSet/fDist);
        fReps = Math.min(fReps, (fDist === 50 ? 8:12) );
        if (fReps > 0) {
             sets.push(`${fReps}x${fDist} swim (${energySystem} focus) r30"`);
             mainSetTotalDist = fReps * fDist;
        }
    }
    return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Speed Endurance (${energySystem}) set.` };
};
