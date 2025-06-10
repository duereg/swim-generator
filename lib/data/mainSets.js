// Sample distances based on comments in original css.js
const en1Distances = [200, 300, 400, 500];
const en2Distances = [100, 200, 300, 400];
const en3Distances = [50, 100, 150, 200];
const en3SecondaryDistances = [200, 300, 400];
const sp1Distances = [25, 50, 75, 100];
const sp1Drills = ["swim", "kb", "FU", "HUHO"]; // FU = Fast Underwater, HUHO = Hypoxic Hips Out
const sp2Distances = [25, 50];
// const sp2RepsMapping = { 25: 24, 50: 16 }; // Keep commented out as per previous fixes

// Functions now keyed by workoutType, but still accept energySystem for potential future differentiation
const mainSetDefinitions = {
    'ENDURANCE_BASE': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
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
    },

    'THRESHOLD_SUSTAINED': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
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
    },

    'THRESHOLD_DEVELOPMENT': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
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
    },

    'SPEED_ENDURANCE': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
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
    },

    'MAX_SPRINT': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
        let sets = [];
        let mainSetTotalDist = 0;
        let targetPacePer100 = cssSecondsPer100 - (10 + Math.random() * 15);
        let numReps = 0;
        let repDist = 0;

        const has50 = sp2Distances.includes(50);
        const has25 = sp2Distances.includes(25);

        if (remainingDistanceForMainSet < (has25 ? 25 : (has50 ? 50 : Infinity))) {
             return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `Max Sprint (${energySystem}) set - too short.` };
        }

        let initialRepDist;
        if (has50 && remainingDistanceForMainSet >= 750) {
            initialRepDist = 50;
        } else if (has25) {
            initialRepDist = 25;
        } else if (has50) {
            initialRepDist = 50;
        } else {
             return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `Max Sprint (${energySystem}) set - no valid distances.` };
        }

        const initialAbsoluteMaxReps = (initialRepDist === 50) ? 24 : 32; // Changed from 30:40
        let numRepsForInitialDist = 0;
        if (initialRepDist > 0) {
            numRepsForInitialDist = Math.min(Math.floor(remainingDistanceForMainSet / initialRepDist), initialAbsoluteMaxReps);
        }

        let currentCalcDist = numRepsForInitialDist * initialRepDist;

        repDist = initialRepDist;
        numReps = numRepsForInitialDist;

        if (initialRepDist === 25 && has50) {
            const potentialReps50 = Math.min(Math.floor(remainingDistanceForMainSet / 50), 24); // Changed cap from 30 to 24
            const potentialDist50 = potentialReps50 * 50;
            const isSignificantUndershootWith25s = currentCalcDist < remainingDistanceForMainSet * 0.85;

            if (isSignificantUndershootWith25s && potentialDist50 > currentCalcDist) {
                repDist = 50;
                numReps = potentialReps50;
            }
        }

        if (numReps === 0 && repDist > 0 && remainingDistanceForMainSet >= repDist) {
            numReps = 1;
        }

        if (numReps > 0 && repDist > 0) {
            mainSetTotalDist = numReps * repDist;
            const sp2Rest = "1'r";
            sets.push(`${numReps}x${repDist} UW sprint (${energySystem} focus, breath at wall) @ ${sp2Rest}`);
        } else {
            mainSetTotalDist = 0;
            sets = [];
        }

        return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Max Sprint (${energySystem}) set.` };
    },

    'GENERAL_ENDURANCE': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => {
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
            if (bestRepDist >= 400) restTime = 45;
            else if (bestRepDist >= 200) restTime = 30;
            else if (bestRepDist >= 100) restTime = 20;
            else restTime = 15;
            sets.push(`${bestNumReps}x${bestRepDist} swim (${energySystem} focus) r${restTime}"`);
            mainSetTotalDist = bestNumReps * bestRepDist;
        } else {
             mainSetTotalDist = 0;
        }
        return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `General Endurance (${energySystem}) default set.` };
    }
};

export { mainSetDefinitions };
