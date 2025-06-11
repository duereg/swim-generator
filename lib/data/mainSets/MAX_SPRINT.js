// Content of lib/data/mainSets/MAX_SPRINT.js to be updated:

const sp2RepDistances = [25, 50];

// Helper function to get SP2 rest string (e.g., "1'30"r" or "3'r")
const getSp2RestString = (repDist) => {
    let minSec, maxSec;
    if (repDist === 25) {
        minSec = 60; // 1 min
        maxSec = 180; // 3 min
    } else if (repDist === 50) {
        minSec = 180; // 3 min
        maxSec = 300; // 5 min
    } else { // Should not happen
        minSec = 60;
        maxSec = 120;
    }

    const totalSeconds = minSec + Math.floor(Math.random() * (maxSec - minSec + 1));

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    let restString = "";
    if (minutes > 0) {
        restString += `${minutes}'`;
    }
    if (seconds > 0) {
        // If there are minutes, and seconds, add a space or separator if needed,
        // but standard notation often just concatenates e.g. 1'30"
        restString += `${seconds}"`;
    } else if (minutes === 0 && seconds === 0) { // Unlikely to be 0 total rest
        restString = '10"'; // Default small rest if somehow 0
    }
     if (minutes > 0 && seconds === 0) { // e.g. 3'
        // No need to add 00"
    }
    return `r${restString}`;
};


export const MAX_SPRINT = (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
    let sets = [];
    let mainSetTotalDist = 0;
    // New pace: CSS -10 to -15s (near max)
    let targetPacePer100 = cssSecondsPer100 - 10 - (Math.random() * 5);

    // SP2 overall set length: 300 to 600yds.
    const targetSp2TotalYardage = Math.max(300, Math.min(remainingDistanceForMainSet, 600));

    if (remainingDistanceForMainSet < sp2RepDistances[0]) { // Smallest rep is 25
        return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `SP2: Too short. Min rep 25. Available: ${remainingDistanceForMainSet}.` };
    }
    if (targetSp2TotalYardage < sp2RepDistances[0]) {
         return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `SP2: Target yardage ${targetSp2TotalYardage} too low. Min rep 25.` };
    }

    let repDist = 0;
    let numReps = 0;

    // Decide on rep distance: 25s or 50s.
    // If targetSp2TotalYardage is small (e.g., < 150 for 50s), prefer 25s.
    // Or, if it allows significantly more reps for 25s.
    // Let's try to pick one and stick to it for the set.
    // Prioritize 50s if enough yardage (e.g. >= 150-200), otherwise 25s.

    const canDo50s = targetSp2TotalYardage >= 50; // Min 1 rep of 50
    const canDo25s = targetSp2TotalYardage >= 25; // Min 1 rep of 25

    if (canDo50s && targetSp2TotalYardage >= 150) { // Prefer 50s if total yardage is decent
        repDist = 50;
    } else if (canDo25s) {
        repDist = 25;
    } else { // Not enough for even a single 25
         return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `SP2: Not enough yardage for a single rep. Target: ${targetSp2TotalYardage}.` };
    }

    numReps = Math.floor(targetSp2TotalYardage / repDist);
    // Max reps to keep total in range. Example: 12x25=300, 6x50=300. 24x25=600, 12x50=600.
    let maxRepsCalculated;
    if (repDist === 25) maxRepsCalculated = 24;
    else if (repDist === 50) maxRepsCalculated = 12;
    else maxRepsCalculated = 1; // Should not happen

    numReps = Math.min(numReps, maxRepsCalculated);
    numReps = Math.max(numReps, 1); // Ensure at least 1 rep if we decided on a repDist

    const actualSetTotalYardage = numReps * repDist;

    if (actualSetTotalYardage > 0) {
        const sp2Rest = getSp2RestString(repDist);
        // Original set string: `${numReps}x${repDist} UW sprint (${energySystem} focus, breath at wall) @ ${sp2Rest}`
        // Keeping similar style. "UW sprint" and "breath at wall" are good specifiers for max effort.
        sets.push(`${numReps}x${repDist} UW sprint (${energySystem} focus, breath at wall) ${sp2Rest}`);
        mainSetTotalDist = actualSetTotalYardage;
    } else {
        // This path should be less likely given the checks.
        mainSetTotalDist = 0;
    }

    let descriptiveMessage;
    if (mainSetTotalDist > 0) {
        descriptiveMessage = `SP2: Lactate Production (${energySystem}), Near Max Effort. Set: ${numReps}x${repDist}. Total ~${mainSetTotalDist}yds.`;
    } else {
        descriptiveMessage = `SP2: Could not fit SP2 set. Available: ${remainingDistanceForMainSet}, Target SP2 range: 300-600.`;
    }

    return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage };
};
