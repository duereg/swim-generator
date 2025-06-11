// Content of lib/data/mainSets/SPEED_ENDURANCE.js to be updated:

const sp1RepDistances = [25, 50, 75, 100]; // Valid rep distances for SP1
const sp1Drills = ["swim", "kb", "FU", "HUHO"]; // FU = Fast Underwater, HUHO = Hypoxic Hips Out

// Helper function to get SP1 rest based on rep distance
const getSp1Rest = (repDist) => {
    let baseRestSeconds;
    if (repDist === 100) baseRestSeconds = 10; // EN2 rest for 100s
    else if (repDist === 75) baseRestSeconds = 7.5; // Proportional
    else if (repDist === 50) baseRestSeconds = 5;   // Proportional
    else if (repDist === 25) baseRestSeconds = 2.5; // Proportional
    else baseRestSeconds = 5; // Default small rest

    // Double or triple EN2 equivalent rest
    const multiplier = 2 + Math.random(); // Randomly between 2x and 3x
    let restSeconds = Math.round((baseRestSeconds * multiplier) / 5) * 5; // Round to nearest 5s
    restSeconds = Math.max(restSeconds, 5); // Minimum 5s
    if (repDist === 100) restSeconds = Math.max(restSeconds, 20); // Ensure 100s get at least 20s

    return `r${restSeconds}"`;
};

export const SPEED_ENDURANCE = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    let sets = [];
    let mainSetTotalDist = 0;
    // New pace: CSS - 3 to 5 seconds
    let targetPacePer100 = cssSecondsPer100 - 3 - (Math.random() * 2);

    // SP1 overall set length: 400 to 800yd.
    // We'll use remainingDistanceForMainSet, but cap it effectively for SP1's typical range.
    const targetSp1TotalYardage = Math.max(400, Math.min(remainingDistanceForMainSet, 800));

    if (remainingDistanceForMainSet < sp1RepDistances[0]) { // Smallest rep is 25
        return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `SP1: Too short. Min rep 25. Available: ${remainingDistanceForMainSet}.` };
    }

    if (targetSp1TotalYardage < sp1RepDistances[0]) {
         return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `SP1: Target yardage too low. Available: ${remainingDistanceForMainSet}.` };
    }

    let numBlocks;
    if (targetSp1TotalYardage < 300) numBlocks = 1; // Should be rare given targetSp1TotalYardage starts at 400
    else if (targetSp1TotalYardage < 600) numBlocks = 1; // Prefer 1 block for < 600
    else numBlocks = 2; // 2 blocks for 600-800

    let accumulatedDistInSp1Set = 0;
    let actualRemainingForSp1Blocks = targetSp1TotalYardage;

    for (let i = 0; i < numBlocks; i++) {
        if (actualRemainingForSp1Blocks < sp1RepDistances[0]) break;

        let distForCurrentBlock = Math.floor(actualRemainingForSp1Blocks / (numBlocks - i));
        if (distForCurrentBlock < sp1RepDistances[0]) continue;

        // Select rep distance for the block - try to use a mix, or pick one that fits well
        let repDist = sp1RepDistances[Math.floor(Math.random() * sp1RepDistances.length)];

        // Ensure repDist is not too large for distForCurrentBlock
        if (repDist > distForCurrentBlock) {
            const possibleDists = sp1RepDistances.filter(d => d <= distForCurrentBlock);
            if (possibleDists.length > 0) {
                repDist = possibleDists[possibleDists.length - 1]; // Largest possible that fits
            } else {
                continue; // No suitable repDist for this block's target distance
            }
        }
        if (repDist === 0) continue;

        let numReps = Math.floor(distForCurrentBlock / repDist);
        numReps = Math.min(numReps, 16); // Cap reps per block (e.g. 16x25=400, 8x50=400, 4x100=400)
        numReps = Math.max(numReps, 1); // Ensure at least one rep

        if (numReps * repDist > distForCurrentBlock) { // Adjust if overshoot (should be rare)
            numReps = Math.floor(distForCurrentBlock / repDist);
        }

        if (numReps > 0) {
            const currentBlockActualYardage = numReps * repDist;
            const sp1Rest = getSp1Rest(repDist);
            const drillType = sp1Drills[Math.floor(Math.random() * sp1Drills.length)];

            sets.push(`${numReps}x${repDist} ${drillType} (${energySystem} focus) ${sp1Rest}`);

            accumulatedDistInSp1Set += currentBlockActualYardage;
            actualRemainingForSp1Blocks -= currentBlockActualYardage;

            if (i < numBlocks - 1 && actualRemainingForSp1Blocks >= sp1RepDistances[0]) {
                // Rest between blocks: 1-2 minutes
                const blockRestSeconds = 60 + Math.floor(Math.random() * 61); // 60 to 120 seconds
                if (blockRestSeconds >= 60) {
                     const minutes = Math.floor(blockRestSeconds / 60);
                     const seconds = blockRestSeconds % 60;
                     if (seconds === 0) sets.push(`${minutes}min rest between SP1 blocks`);
                     else sets.push(`${minutes}min ${seconds}s rest between SP1 blocks`);
                } else { // Should not happen with current logic
                     sets.push(`${blockRestSeconds}s rest between SP1 blocks`);
                }
            }
        }
    }
    mainSetTotalDist = accumulatedDistInSp1Set;

    let descriptiveMessage;
    if (mainSetTotalDist > 0) {
        descriptiveMessage = `SP1: Lactate Tolerance (${energySystem}), CSS -3-5s. Total ~${mainSetTotalDist}yds.`;
    } else {
        descriptiveMessage = `SP1: Could not fit SP1 set. Available: ${remainingDistanceForMainSet}, Target SP1 range: 400-800.`;
    }

    // If mainSetTotalDist is very low compared to what was available (e.g. targetSp1TotalYardage was 400, but we only made 100)
    // This might indicate the block division or rep selection was suboptimal.
    // The current logic tries to fill targetSp1TotalYardage.

    return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage };
};
