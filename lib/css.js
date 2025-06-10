// Helper function to convert MM:SS time string to total seconds per 100 units
function parseCssTimeToSeconds(cssTimeStr) {
    const parts = cssTimeStr.split(':');
    if (parts.length === 2) {
        return parseInt(parts) * 60 + parseFloat(parts[1]);
    }
    return null; // Invalid format
}

// Helper function to format total seconds per 100 units back to MM:SS
function formatSecondsToMmSs(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = (totalSeconds % 60).toFixed(1); // One decimal for seconds
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

/**
 * Generates a random workout based on distance, energy system, and CSS time.
 * @param {number} totalDistanceYards - The approximate total desired workout distance in yards.
 * @param {string} energySystem - The energy system focus (e.g., 'EN1', 'EN2', 'EN3', 'SP1', 'SP2').
 * @param {string} cssTimeMmSs - The Critical Swim Speed in MM:SS format (e.g., '1:10').
 * @returns {string} A formatted string describing the generated workout.
 */
function generateWorkout(totalDistanceYards, energySystem, cssTimeMmSs) {
    const cssSecondsPer100 = parseCssTimeToSeconds(cssTimeMmSs);
    if (cssSecondsPer100 === null) {
        return "Error: Invalid CSS time format. Please use MM:SS (e.g., '1:10').";
    }

    let workoutDetails = [];
    let currentDistanceCovered = 0;
    const mainSetUnits = "yards"; // Assuming SCY based on sources unless specified otherwise [7, 9, 16]

    // --- 1. Warmup Selection ---
    // Warmup options based on various sources [2, 5, 7, 8, 11, 13, 15, 17, 19, 20]
    const warmups = [
        { desc: "200 no fins, 200 w fins swim", dist: 400, type: "swim" }, //[2]
        { desc: "400 warmup (75 kick, 25 under)", dist: 400, type: "kick" }, //[5]
        { desc: "250 pull warmup, 250 swim warmup", dist: 500, type: "pull/swim" }, //[20]
        { desc: "250 warmup", dist: 250, type: "general" }, //[8, 13]
        { desc: "200 warm up", dist: 200, type: "general" }, //[7]
        { desc: "500 warmup", dist: 500, type: "general" }, //[11, 17]
        { desc: "300 warm up", dist: 300, type: "general" }, //[15]
        { desc: "150 warm up", dist: 150, type: "general" }, //[19]
    ];
    // Option for no warmup, as seen in some sources [1, 9]
    const noWarmupOption = { desc: "No warmup bitches", dist: 0, type: "none" }; [1]
    const useWarmup = Math.random() > 0.1; // 90% chance of including a warmup

    let selectedWarmup;
    if (useWarmup) {
        selectedWarmup = warmups[Math.floor(Math.random() * warmups.length)];
        workoutDetails.push(`WU: ${selectedWarmup.desc}`);
        currentDistanceCovered += selectedWarmup.dist;
    } else {
        selectedWarmup = noWarmupOption;
        workoutDetails.push(`WU: ${noWarmupOption.desc}`);
    }

    // --- 2. Main Set Generation ---
    let mainSetDescription = "Main Set:";
    let targetPacePer100 = cssSecondsPer100; // Base pace for calculations
    let sets = [];
    let mainSetTotalDist = 0;
    let remainingDistanceForMainSet = totalDistanceYards - currentDistanceCovered;

    // Adjust target pace and set structure based on energy system focus
    switch (energySystem.toUpperCase()) {
        case 'EN1':
            // Endurance 1: Focus on consistent pace, often at or slightly slower than CSS. [6, 8, 9, 15]
            targetPacePer100 = cssSecondsPer100 + (Math.random() * 5); // CSS to CSS + 5s/100
            const en1Distances = ; // Common distances for EN1 [6, 8, 9]
            let numEn1Reps = Math.floor(Math.random() * (6 - 3 + 1)) + 3; // 3-6 reps
            let en1RepDist = en1Distances[Math.floor(Math.random() * en1Distances.length)];
            let en1Rest = `r${(Math.floor(Math.random() * (60 - 30 + 1)) + 30)}"`; // 30-60 sec rest [1, 6]
            sets.push(`${numEn1Reps}x${en1RepDist} swim/kick ${en1Rest}`);
            mainSetTotalDist += numEn1Reps * en1RepDist;
            break;

        case 'EN2':
            // Endurance 2: Around CSS pace, often moderate to long repeats. [2, 3, 12, 15, 18]
            targetPacePer100 = cssSecondsPer100 + (Math.random() * 3 - 1.5); // CSS +/- 1.5s/100
            const en2Distances = ; // Common distances for EN2 [2, 3, 12, 18]
            let numEn2Reps = Math.floor(Math.random() * (10 - 4 + 1)) + 4; // 4-10 reps
            let en2RepDist = en2Distances[Math.floor(Math.random() * en2Distances.length)];
            let en2Rest = `r${(Math.floor(Math.random() * (30 - 20 + 1)) + 20)}"`; // 20-30 sec rest [2, 3, 12, 18]
            sets.push(`${numEn2Reps}x${en2RepDist} swim ${en2Rest}`);
            mainSetTotalDist += numEn2Reps * en2RepDist;
            break;

        case 'EN3':
            // Endurance 3: At or slightly faster than CSS, potentially longer distances or sets. [1, 5, 10, 13, 16, 21]
            targetPacePer100 = cssSecondsPer100 - (Math.random() * 3); // CSS to CSS - 3s/100
            const en3Distances = ; // Common distances for EN3 [1, 5, 10, 13, 16, 21]
            let numEn3Reps = Math.floor(Math.random() * (5 - 2 + 1)) + 2; // 2-5 reps
            let en3RepDist = en3Distances[Math.floor(Math.random() * en3Distances.length)];
            let en3Rest = `r${(Math.floor(Math.random() * (90 - 40 + 1)) + 40)}"`; // 40-90 sec rest [1, 5, 10, 16, 21]
            sets.push(`${numEn3Reps}x${en3RepDist} swim/kb ${en3Rest}`);
            mainSetTotalDist += numEn3Reps * en3RepDist;

            if (remainingDistanceForMainSet > 2000 && Math.random() < 0.5) { // Add a secondary set for longer workouts
                let secondaryReps = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
                let secondaryDist = [Math.floor(Math.random() * 2)];
                sets.push(`${secondaryReps}x${secondaryDist} swim ${en3Rest}`);
                mainSetTotalDist += secondaryReps * secondaryDist;
            }
            break;

        case 'SP1':
            // Speed/Power 1: Faster than CSS, shorter repeats, more rest, often includes drills/kick. [2, 11, 14, 19, 20]
            targetPacePer100 = cssSecondsPer100 - (5 + Math.random() * 5); // CSS -5s to -10s/100
            const sp1Distances = ; // Common distances for SP1 [2, 11, 14]
            const sp1Drills = ["swim", "kb", "FU", "HUHO"]; // Common drills [2, 10, 15, 19]

            let numBlocks = Math.floor(Math.random() * (3 - 1 + 1)) + 1; // 1-3 blocks of sets
            for (let i = 0; i < numBlocks; i++) {
                let numReps = Math.floor(Math.random() * (8 - 4 + 1)) + 4; // 4-8 reps per block
                let repDist = sp1Distances[Math.floor(Math.random() * sp1Distances.length)];
                let rest = `r${(Math.floor(Math.random() * (40 - 30 + 1)) + 30)}"`; // 30-40 sec rest [2, 14, 19]
                let drillType = sp1Drills[Math.floor(Math.random() * sp1Drills.length)];
                sets.push(`${numReps}x${repDist} ${drillType} ${rest}`);
                mainSetTotalDist += numReps * repDist;

                if (i < numBlocks - 1) { // Add a longer rest or easy swim between blocks [2, 11, 14, 19]
                    let easyBreak = Math.random() > 0.5 ? "2min rest" : "50 ez + wait for top";
                    sets.push(easyBreak);
                    if (easyBreak.includes("ez")) mainSetTotalDist += 50; // Account for easy swim distance
                }
            }
            break;

        case 'SP2':
            // Speed/Power 2: Very short, maximal sprints, long rest. [3, 4]
            targetPacePer100 = cssSecondsPer100 - (10 + Math.random() * 15); // CSS -10s to -25s/100
            const sp2Distances = ; // Very short sprints [3, 4]
            const sp2Reps = [16]; // Examples from source for 50s and 25s respectively [3, 4]
            const sp2Rest = "1'r"; // Common rest for SP2 [3, 4]

            let repDist = sp2Distances[Math.floor(Math.random() * sp2Distances.length)];
            let numReps = sp2Reps[Math.floor(Math.random() * sp2Reps.length)];
            // Adjust reps if too far for total distance, but keep high for sprint nature
            if ((numReps * repDist) > (remainingDistanceForMainSet * 0.9) && repDist === 50) numReps = 16;
            if ((numReps * repDist) > (remainingDistanceForMainSet * 0.9) && repDist === 25) numReps = 24;
            if (numReps < 8) numReps = 8; // Ensure minimum sprint volume

            sets.push(`${numReps}x${repDist} UW sprint (breath at wall) @ ${sp2Rest}`); [3, 4]
            mainSetTotalDist += numReps * repDist;
            break;

        default:
            mainSetDescription += " Unknown energy system. Defaulting to a general endurance set.";
            targetPacePer100 = cssSecondsPer100;
            sets.push("4x400 swim r45"); // A generic endurance set
            mainSetTotalDist += 1600;
            break;
    }

    workoutDetails.push(mainSetDescription);
    sets.forEach(set => {
        workoutDetails.push(`  - ${set}`);
    });
    currentDistanceCovered += mainSetTotalDist;

    // --- 3. Cool-down Selection ---
    // Cool-down options based on various sources [2, 5, 7, 9, 10, 12, 13, 16, 17, 19-21]
    const cooldowns = [
        { desc: "200 w fins (or combo)", dist: 200, type: "fins" }, //[2]
        { desc: "200 swim cooldown", dist: 200, type: "swim" }, //[5]
        { desc: "100 cool down", dist: 100, type: "general" }, //[7]
        { desc: "300 CD", dist: 300, type: "general" }, //[9]
        { desc: "200 CD", dist: 200, type: "general" }, //[10, 16, 21]
        { desc: "450 cooldown (300 swim, 150 under)", dist: 450, type: "swim/under" }, //[20]
        { desc: "100 cool", dist: 100, type: "general" }, //[17]
        { desc: "150 cooldown and 20 minutes of stick skills", dist: 150, type: "general" }, //[19]
        { desc: "100 fin swim cooldown", dist: 100, type: "fin swim" }, //[12]
        { desc: "250 cool down", dist: 250, type: "general" }, //[13]
    ];
    let selectedCooldown = cooldowns[Math.floor(Math.random() * cooldowns.length)];
    workoutDetails.push(`CD: ${selectedCooldown.desc}`);
    currentDistanceCovered += selectedCooldown.dist;

    // --- 4. Final Details ---
    workoutDetails.push(`\nTotal estimated distance: ${currentDistanceCovered} ${mainSetUnits}`);
    workoutDetails.push(`CSS: ${cssTimeMmSs}`);
    workoutDetails.push(`Energy System Focus: ${energySystem.toUpperCase()}`);
    // A rough estimate of average pace, as true average depends on actual interval times and rest
    workoutDetails.push(`Estimated AVG pace for main set: ${formatSecondsToMmSs(targetPacePer100)} / 100 ${mainSetUnits}`);

    return workoutDetails.join('\n');
}

// --- Example Usage ---
// console.log(generateWorkout(3000, 'EN3', '1:20'));
// console.log(generateWorkout(2000, 'SP1', '1:10'));
// console.log(generateWorkout(1500, 'SP2', '1:15'));
// console.log(generateWorkout(2500, 'EN2', '1:12'));
// console.log(generateWorkout(1800, 'EN1', '1:25'));