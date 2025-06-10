// Sample distances based on comments in original css.js
const en1Distances = [200, 300, 400, 500];
const en2Distances = [100, 200, 300, 400];
const en3Distances = [50, 100, 150, 200];
const en3SecondaryDistances = [200, 300, 400];
const sp1Distances = [25, 50, 75, 100];
const sp1Drills = ["swim", "kb", "FU", "HUHO"];
const sp2Distances = [25, 50];
const sp2RepsMapping = { 25: 24, 50: 16 };

// Functions now keyed by workoutType, but still accept energySystem for potential future differentiation
const mainSetDefinitions = {
    'ENDURANCE_BASE': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => { // Was EN1
        let sets = [];
        let mainSetTotalDist = 0;
        let targetPacePer100 = cssSecondsPer100 + (Math.random() * 5);
        let numEn1Reps = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
        let en1RepDist = en1Distances[Math.floor(Math.random() * en1Distances.length)];
        if (numEn1Reps * en1RepDist > remainingDistanceForMainSet * 1.2) {
            numEn1Reps = Math.floor((remainingDistanceForMainSet * 1.2) / en1RepDist) || 1;
        }
        let en1Rest = `r${(Math.floor(Math.random() * (60 - 30 + 1)) + 30)}"`;
        sets.push(`${numEn1Reps}x${en1RepDist} ${energySystem} focus swim/kick ${en1Rest}`); // Added energySystem to set desc for now
        mainSetTotalDist += numEn1Reps * en1RepDist;
        return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Endurance Base (${energySystem}) set.` };
    },
    'THRESHOLD_SUSTAINED': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => { // Was EN2
        let sets = [];
        let mainSetTotalDist = 0;
        let targetPacePer100 = cssSecondsPer100 + (Math.random() * 3 - 1.5);
        let numEn2Reps = Math.floor(Math.random() * (10 - 4 + 1)) + 4;
        let en2RepDist = en2Distances[Math.floor(Math.random() * en2Distances.length)];
        if (numEn2Reps * en2RepDist > remainingDistanceForMainSet * 1.2) {
            numEn2Reps = Math.floor((remainingDistanceForMainSet * 1.2) / en2RepDist) || 1;
        }
        let en2Rest = `r${(Math.floor(Math.random() * (30 - 20 + 1)) + 20)}"`;
        sets.push(`${numEn2Reps}x${en2RepDist} ${energySystem} focus swim ${en2Rest}`);
        mainSetTotalDist += numEn2Reps * en2RepDist;
        return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Threshold Sustained (${energySystem}) set.` };
    },
    'THRESHOLD_DEVELOPMENT': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => { // Was EN3
        let sets = [];
        let mainSetTotalDist = 0;
        let targetPacePer100 = cssSecondsPer100 - (Math.random() * 3);
        let numEn3Reps = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
        let en3RepDist = en3Distances[Math.floor(Math.random() * en3Distances.length)];
        if (numEn3Reps * en3RepDist > remainingDistanceForMainSet * 0.8 && remainingDistanceForMainSet > 800) {
             numEn3Reps = Math.floor((remainingDistanceForMainSet * 0.7) / en3RepDist) || 1;
        } else if (numEn3Reps * en3RepDist > remainingDistanceForMainSet * 1.1) {
            numEn3Reps = Math.floor((remainingDistanceForMainSet * 1.1) / en3RepDist) || 1;
        }

        let en3Rest = `r${(Math.floor(Math.random() * (90 - 40 + 1)) + 40)}"`;
        sets.push(`${numEn3Reps}x${en3RepDist} ${energySystem} focus swim/kb ${en3Rest}`);
        mainSetTotalDist += numEn3Reps * en3RepDist;

        if (remainingDistanceForMainSet - mainSetTotalDist > 500 && Math.random() < 0.5) {
            let secondaryReps = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
            let secondaryDist = en3SecondaryDistances[Math.floor(Math.random() * en3SecondaryDistances.length)];
            if (secondaryReps * secondaryDist > (remainingDistanceForMainSet - mainSetTotalDist) * 1.1) {
                 secondaryReps = Math.floor(((remainingDistanceForMainSet - mainSetTotalDist) *1.1) / secondaryDist) || 1;
            }
            if (secondaryReps > 0) {
                sets.push(`${secondaryReps}x${secondaryDist} ${energySystem} focus swim ${en3Rest}`);
                mainSetTotalDist += secondaryReps * secondaryDist;
            }
        }
        return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Threshold Development (${energySystem}) set.` };
    },
    'SPEED_ENDURANCE': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => { // Was SP1
        let sets = [];
        let mainSetTotalDist = 0;
        let targetPacePer100 = cssSecondsPer100 - (5 + Math.random() * 5);

        let numBlocks = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        let blockDistRemaining = remainingDistanceForMainSet;

        for (let i = 0; i < numBlocks; i++) {
            let numReps = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
            let repDist = sp1Distances[Math.floor(Math.random() * sp1Distances.length)];

            let maxDistForBlock = blockDistRemaining / (numBlocks - i);
            if (numReps * repDist > maxDistForBlock * 1.2 ) {
                numReps = Math.floor((maxDistForBlock * 1.2) / repDist) || 1;
            }
            if (numReps === 0 && mainSetTotalDist === 0) numReps = 1;

            if (numReps > 0) {
                let rest = `r${(Math.floor(Math.random() * (40 - 30 + 1)) + 30)}"`;
                let drillType = sp1Drills[Math.floor(Math.random() * sp1Drills.length)];
                sets.push(`${numReps}x${repDist} ${drillType} (${energySystem} focus) ${rest}`);
                let currentBlockDist = numReps * repDist;
                mainSetTotalDist += currentBlockDist;
                blockDistRemaining -= currentBlockDist;

                if (i < numBlocks - 1 && blockDistRemaining > 50) {
                    let easyBreak = Math.random() > 0.5 ? "2min rest" : "50 ez + wait for top";
                    sets.push(easyBreak);
                    if (easyBreak.includes("ez")) {
                        mainSetTotalDist += 50;
                        blockDistRemaining -= 50;
                    }
                }
            }
        }
        if (sets.length === 0) {
            let repDist = sp1Distances[1];
            let numReps = Math.floor(remainingDistanceForMainSet / repDist / 2) || 2;
            if (numReps * repDist > remainingDistanceForMainSet) numReps = Math.floor(remainingDistanceForMainSet / repDist) || 1;
            sets.push(`${numReps}x${repDist} swim (${energySystem} focus) r30"`);
            mainSetTotalDist = numReps * repDist;
        }
        return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Speed Endurance (${energySystem}) set.` };
    },
    'MAX_SPRINT': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => { // Was SP2
        let sets = [];
        let mainSetTotalDist = 0;
        let targetPacePer100 = cssSecondsPer100 - (10 + Math.random() * 15);

        let repDist = sp2Distances[Math.floor(Math.random() * sp2Distances.length)];
        let numReps = sp2RepsMapping[repDist] || 10;

        if ((numReps * repDist) > (remainingDistanceForMainSet * 0.9)) {
            numReps = Math.floor((remainingDistanceForMainSet * 0.9) / repDist) ;
        }
        if (numReps < 8 && repDist === 50 ) numReps = 8;
        if (numReps < 12 && repDist === 25 ) numReps = 12;
        if (numReps === 0) numReps = 1;

        const sp2Rest = "1'r";
        sets.push(`${numReps}x${repDist} UW sprint (${energySystem} focus, breath at wall) @ ${sp2Rest}`);
        mainSetTotalDist += numReps * repDist;
        return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Max Sprint (${energySystem}) set.` };
    },
    'GENERAL_ENDURANCE': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => { // Was DEFAULT
        let sets = [];
        let mainSetTotalDist = 0;
        let targetPacePer100 = cssSecondsPer100;
        let numReps = Math.floor(remainingDistanceForMainSet / 400);
        if (numReps === 0 && remainingDistanceForMainSet > 200) numReps = 1;
        else if (numReps === 0) {
            numReps = Math.floor(remainingDistanceForMainSet / 200) || 1;
            sets.push(`${numReps}x200 swim (${energySystem} focus) r30"`);
            mainSetTotalDist += numReps * 200;
            return {sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `General Endurance (${energySystem}) default set.`};
        }
        sets.push(`${numReps}x400 swim (${energySystem} focus) r45"`);
        mainSetTotalDist += numReps * 400;
        return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `General Endurance (${energySystem}) default set.` };
    }
};

export { mainSetDefinitions };
