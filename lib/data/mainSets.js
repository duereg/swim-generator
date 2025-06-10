// Sample distances based on comments in original css.js
const en1Distances = [200, 300, 400, 500];
const en2Distances = [100, 200, 300, 400];
const en3Distances = [50, 100, 150, 200];
const en3SecondaryDistances = [200, 300, 400];
const sp1Distances = [25, 50, 75, 100];
const sp1Drills = ["swim", "kb", "FU", "HUHO"];
const sp2Distances = [25, 50];
// const sp2RepsMapping = { 25: 24, 50: 16 }; // Commented out as it's no longer used for capping in MAX_SPRINT

// Functions now keyed by workoutType, but still accept energySystem for potential future differentiation
const mainSetDefinitions = {
    'ENDURANCE_BASE': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => { // Was EN1
        let sets = [];
        let mainSetTotalDist = 0;
        let targetPacePer100 = cssSecondsPer100 + (Math.random() * 5);
        let en1RepDist = en1Distances[Math.floor(Math.random() * en1Distances.length)];
        let numEn1Reps = 0;

        if (remainingDistanceForMainSet < 50) {
            // Negligible distance, return empty set
            mainSetTotalDist = 0;
        } else {
            numEn1Reps = Math.floor(remainingDistanceForMainSet / en1RepDist);

            if (numEn1Reps === 0) {
                // Could not fit any reps of the randomly selected en1RepDist
                // Try to find a smaller distance from en1Distances that fits at least once
                const smallerDistances = en1Distances.filter(d => d <= remainingDistanceForMainSet);
                if (smallerDistances.length > 0) {
                    en1RepDist = smallerDistances[smallerDistances.length - 1]; // Take the largest of the smaller distances
                    numEn1Reps = 1; // Should be Math.floor(remainingDistanceForMainSet / en1RepDist), but usually 1
                    if (remainingDistanceForMainSet / en1RepDist < 1) { // Should not happen if filter worked
                        numEn1Reps = 0; // Safety, set to 0 if it still doesn't fit
                    } else {
                        numEn1Reps = Math.floor(remainingDistanceForMainSet / en1RepDist);
                    }
                    if (numEn1Reps === 0 && remainingDistanceForMainSet >= en1Distances[0]) { // if still 0, but remaining is > smallest option
                        en1RepDist = en1Distances[0]; // use smallest option
                        numEn1Reps = Math.floor(remainingDistanceForMainSet / en1RepDist);
                    } else if (numEn1Reps === 0) { // if still 0, means remainingDistance is less than smallest en1Distance
                         // As per prompt: "adjust en1RepDist to remainingDistanceForMainSet and set numEn1Reps to 1"
                        en1RepDist = remainingDistanceForMainSet; // Use the exact remaining distance
                        numEn1Reps = 1;
                        // Optional: round en1RepDist to nearest 25 or 50 if desired
                        // en1RepDist = Math.round(remainingDistanceForMainSet / 25) * 25;
                        // if (en1RepDist === 0 && remainingDistanceForMainSet > 0) en1RepDist = 25;
                    }
                } else {
                    // remainingDistanceForMainSet is less than the smallest en1Distance (200)
                    // As per prompt: "adjust en1RepDist to remainingDistanceForMainSet and set numEn1Reps to 1"
                     if (remainingDistanceForMainSet >= 50) { // Check again if it's not negligible
                        en1RepDist = remainingDistanceForMainSet;
                        numEn1Reps = 1;
                        // Optional: round en1RepDist to nearest 25 or 50
                        // en1RepDist = Math.round(remainingDistanceForMainSet / 25) * 25;
                        // if (en1RepDist < 50 && remainingDistanceForMainSet >= 50) en1RepDist = 50;
                        // else if (en1RepDist < 50) numEn1Reps = 0; // if rounding makes it too small
                    } else {
                        numEn1Reps = 0; // Already handled by the initial check, but as a safeguard
                    }
                }
            }
        }

        if (numEn1Reps > 0 && en1RepDist > 0) {
            mainSetTotalDist = numEn1Reps * en1RepDist;
            // Ensure mainSetTotalDist does not exceed remainingDistanceForMainSet by too much.
            // This should be inherently handled by Math.floor and the logic for numEn1Reps === 0.
            // However, if en1RepDist was set to remainingDistanceForMainSet, it will be exact.
            if (mainSetTotalDist > remainingDistanceForMainSet) {
                // This case should ideally not be hit if logic is correct.
                // If it is, it implies en1RepDist might have been set too large relative to remainingDistanceForMainSet for numEn1Reps=1
                // For now, let's re-evaluate if this happens.
                // One scenario: remainingDistanceForMainSet = 180. Smallest en1Distance is 200.
                // Code sets en1RepDist = 180, numEn1Reps = 1. mainSetTotalDist = 180. This is fine.
            }
            let en1Rest = `r${(Math.floor(Math.random() * (60 - 30 + 1)) + 30)}"`;
            sets.push(`${numEn1Reps}x${en1RepDist} ${energySystem} focus swim/kick ${en1Rest}`);
        } else {
            mainSetTotalDist = 0; // Ensure it's zero if no reps
            sets = [];
        }

        return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Endurance Base (${energySystem}) set.` };
    },
    'THRESHOLD_SUSTAINED': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => { // Was EN2
        let sets = [];
        let mainSetTotalDist = 0;
        let targetPacePer100 = cssSecondsPer100 + (Math.random() * 3 - 1.5);
        let en2RepDist = en2Distances[Math.floor(Math.random() * en2Distances.length)];
        let numEn2Reps = 0;

        if (remainingDistanceForMainSet < 50) {
            mainSetTotalDist = 0;
        } else {
            numEn2Reps = Math.floor(remainingDistanceForMainSet / en2RepDist);

            if (numEn2Reps === 0) {
                const smallerDistances = en2Distances.filter(d => d <= remainingDistanceForMainSet);
                if (smallerDistances.length > 0) {
                    en2RepDist = smallerDistances[smallerDistances.length - 1];
                    numEn2Reps = Math.floor(remainingDistanceForMainSet / en2RepDist);
                     if (numEn2Reps === 0 && remainingDistanceForMainSet >= en2Distances[0]) {
                        en2RepDist = en2Distances[0];
                        numEn2Reps = Math.floor(remainingDistanceForMainSet / en2RepDist);
                    } else if (numEn2Reps === 0) {
                        en2RepDist = remainingDistanceForMainSet;
                        numEn2Reps = 1;
                    }
                } else {
                    if (remainingDistanceForMainSet >= 50) {
                        en2RepDist = remainingDistanceForMainSet;
                        numEn2Reps = 1;
                        // Optional: rounding, e.g., en2RepDist = Math.round(remainingDistanceForMainSet / 25) * 25;
                        // if (en2RepDist < 50 && remainingDistanceForMainSet >=50) en2RepDist = 50;
                        // else if (en2RepDist < 50) numEn2Reps = 0;
                    } else {
                        numEn2Reps = 0;
                    }
                }
            }
        }

        if (numEn2Reps > 0 && en2RepDist > 0) {
            mainSetTotalDist = numEn2Reps * en2RepDist;
            // As with EN1, total distance should be inherently <= remainingDistanceForMainSet
            let en2Rest = `r${(Math.floor(Math.random() * (30 - 20 + 1)) + 20)}"`;
            sets.push(`${numEn2Reps}x${en2RepDist} ${energySystem} focus swim ${en2Rest}`);
        } else {
            mainSetTotalDist = 0;
            sets = [];
        }
        return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Threshold Sustained (${energySystem}) set.` };
    },
    'THRESHOLD_DEVELOPMENT': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => { // Was EN3
        let sets = [];
        let mainSetTotalDist = 0;
        let targetPacePer100 = cssSecondsPer100 - (Math.random() * 3);
        const en3Rest = `r${(Math.floor(Math.random() * (90 - 40 + 1)) + 40)}"`;

        if (remainingDistanceForMainSet < 50) {
            return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `Threshold Development (${energySystem}) set.` };
        }

        // Part 1
        let en3RepDist = en3Distances[Math.floor(Math.random() * en3Distances.length)];
        let numEn3Reps = 0;

        if (remainingDistanceForMainSet >= en3Distances[0]) { // Check if smallest EN3 distance fits
            numEn3Reps = Math.floor(remainingDistanceForMainSet / en3RepDist);

            if (numEn3Reps === 0) {
                const smallerDists = en3Distances.filter(d => d <= remainingDistanceForMainSet);
                if (smallerDists.length > 0) {
                    en3RepDist = smallerDists[smallerDists.length - 1];
                    numEn3Reps = Math.floor(remainingDistanceForMainSet / en3RepDist);
                    if (numEn3Reps === 0 && remainingDistanceForMainSet >= en3Distances[0]) { // Should take at least 1 of the smallest
                        en3RepDist = en3Distances[0];
                        numEn3Reps = Math.floor(remainingDistanceForMainSet / en3RepDist);
                    }
                }
                // If numEn3Reps is still 0 here, it means remainingDistanceForMainSet is less than en3Distances[0] (50yd)
                // This case is handled by the initial check: remainingDistanceForMainSet < 50
            }
        }

        // Cap reps if they get too high for this type of set.
        // Increased from 12 to 20 to allow for larger total distances.
        if (numEn3Reps > 20) {
            numEn3Reps = 20;
        }


        if (numEn3Reps > 0 && en3RepDist > 0) {
            sets.push(`${numEn3Reps}x${en3RepDist} ${energySystem} focus swim/kb ${en3Rest}`);
            mainSetTotalDist += numEn3Reps * en3RepDist;
        }

        // Optional secondary set
        let newRemainingDistance = remainingDistanceForMainSet - mainSetTotalDist;
        // Use > 400 as threshold for substantial remaining distance for secondary set.
        // Removed Math.random() to make secondary set deterministic based on distance.
        if (newRemainingDistance > 400) {
            let secondaryDist = en3SecondaryDistances[Math.floor(Math.random() * en3SecondaryDistances.length)];
            let secondaryReps = 0;

            if (newRemainingDistance >= en3SecondaryDistances[0]) { // Check if smallest secondary distance fits
                 secondaryReps = Math.floor(newRemainingDistance / secondaryDist);
                if (secondaryReps === 0) {
                    const smallerSecondaryDists = en3SecondaryDistances.filter(d => d <= newRemainingDistance);
                    if (smallerSecondaryDists.length > 0) {
                        secondaryDist = smallerSecondaryDists[smallerSecondaryDists.length -1];
                        secondaryReps = Math.floor(newRemainingDistance / secondaryDist);
                         if (secondaryReps === 0 && newRemainingDistance >= en3SecondaryDistances[0]) {
                             secondaryDist = en3SecondaryDistances[0];
                             secondaryReps = Math.floor(newRemainingDistance / secondaryDist);
                         }
                    }
                }
            }

            // Cap secondary reps as well, increased from 6 to 10.
            if (secondaryReps > 10) {
                secondaryReps = 10;
            }

            if (secondaryReps > 0 && secondaryDist > 0) {
                // Check if adding this part would make the set too long compared to original remaining total
                // This check might be redundant if secondaryReps is from Math.floor(newRemainingDistance / secondaryDist)
                // but if reps are capped, it's a good safeguard.
                if ((mainSetTotalDist + (secondaryReps * secondaryDist)) <= remainingDistanceForMainSet * 1.05) { // Allow slight overage for completing a rep
                    sets.push(`${secondaryReps}x${secondaryDist} ${energySystem} focus swim ${en3Rest}`);
                    mainSetTotalDist += secondaryReps * secondaryDist;
                }
            }
        }

        if (sets.length === 0 && remainingDistanceForMainSet >= 50) {
            // Fallback if nothing was added but there was some distance.
            // Try to add a single small set.
            en3RepDist = en3Distances[0]; // 50yd
            numEn3Reps = Math.floor(remainingDistanceForMainSet / en3RepDist);
            if (numEn3Reps > 5) numEn3Reps = 5; // Cap it
            if (numEn3Reps > 0) {
                 sets.push(`${numEn3Reps}x${en3RepDist} ${energySystem} focus swim/kb ${en3Rest}`);
                 mainSetTotalDist += numEn3Reps * en3RepDist;
            }
        }


        return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Threshold Development (${energySystem}) set.` };
    },
    'SPEED_ENDURANCE': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => { // Was SP1
        let sets = [];
        let accumulatedDist = 0; // Use accumulatedDist internally, then assign to mainSetTotalDist
        let targetPacePer100 = cssSecondsPer100 - (5 + Math.random() * 5);

        if (remainingDistanceForMainSet < sp1Distances[0]) { // Smallest sp1 rep distance
            return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `Speed Endurance (${energySystem}) set.` };
        }

        // Smarter numBlocks determination
        let numBlocks;
        if (remainingDistanceForMainSet < 600) numBlocks = 1;
        else if (remainingDistanceForMainSet < 1200) numBlocks = 2;
        else numBlocks = 3;

        let blockDistRemainingForReps = remainingDistanceForMainSet;

        for (let i = 0; i < numBlocks; i++) {
            if (blockDistRemainingForReps < sp1Distances[0]) break;

            let targetDistForCurrentBlock = Math.floor(blockDistRemainingForReps / (numBlocks - i));
            let easyBreakDist = 0;
            let addEasyBreakString = false;

            // Refined Easy Break Logic
            if (i < numBlocks - 1 && (blockDistRemainingForReps - targetDistForCurrentBlock) > 100) {
                if (Math.random() > 0.5) { // Random chance for easy break
                    if (targetDistForCurrentBlock > 150) { // Ensure rep part is still substantial
                        easyBreakDist = 50;
                        targetDistForCurrentBlock -= easyBreakDist; // Subtract break from current block's target
                        addEasyBreakString = true;
                    }
                }
            }

            if (targetDistForCurrentBlock < sp1Distances[0] && addEasyBreakString) {
                // Not enough for reps after break, so cancel break
                targetDistForCurrentBlock += easyBreakDist;
                easyBreakDist = 0;
                addEasyBreakString = false;
            }

            if (targetDistForCurrentBlock < sp1Distances[0]) continue; // Skip block if not enough for smallest rep

            // Repetition Distance (repDist) Selection
            let repDist = sp1Distances[Math.floor(Math.random() * sp1Distances.length)];
            if (repDist > targetDistForCurrentBlock && targetDistForCurrentBlock >= sp1Distances[0]) {
                for (let j = sp1Distances.length - 1; j >= 0; j--) {
                    if (sp1Distances[j] <= targetDistForCurrentBlock) {
                        repDist = sp1Distances[j];
                        break;
                    }
                }
            } else if (repDist > targetDistForCurrentBlock) { // if still too large (e.g. targetDist < sp1Distances[0])
                 repDist = sp1Distances[0]; // Should not be hit if previous continue works
            }


            // Number of Repetitions (numReps)
            let numReps = (repDist > 0) ? Math.floor(targetDistForCurrentBlock / repDist) : 0;
            numReps = Math.min(numReps, 12); // Increased cap from 8 to 12

            if (numReps > 0) {
                const currentBlockActualRepDist = numReps * repDist;
                let rest = `r${(Math.floor(Math.random() * (40 - 30 + 1)) + 30)}"`;
                let drillType = sp1Drills[Math.floor(Math.random() * sp1Drills.length)];
                sets.push(`${numReps}x${repDist} ${drillType} (${energySystem} focus) ${rest}`);

                accumulatedDist += currentBlockActualRepDist;
                blockDistRemainingForReps -= currentBlockActualRepDist;

                if (addEasyBreakString && easyBreakDist > 0) {
                    if (blockDistRemainingForReps >= easyBreakDist) { // Ensure there's room for the easy break itself
                        sets.push("50 ez + wait for top");
                        accumulatedDist += easyBreakDist;
                        blockDistRemainingForReps -= easyBreakDist;
                    }
                } else if (i < numBlocks - 1 && blockDistRemainingForReps > sp1Distances[0]) {
                    // Add timed rest if no easy break was added and it's not the last block
                    // and there's potential for more reps in subsequent blocks
                    sets.push("2min rest");
                }
            } else if (easyBreakDist > 0) { // No reps, but an easy break was planned and fits
                 if (blockDistRemainingForReps >= easyBreakDist) {
                    sets.push(`${easyBreakDist} ez swim`);
                    accumulatedDist += easyBreakDist;
                    blockDistRemainingForReps -= easyBreakDist;
                 }
            }
        }

        let mainSetTotalDist = accumulatedDist;

        // Improved Fallback Logic
        if (mainSetTotalDist < (remainingDistanceForMainSet * 0.5) && remainingDistanceForMainSet > 200) {
            sets = []; // Clear any previously generated sets for a fresh fallback
            let fallbackRepDist;
            if (remainingDistanceForMainSet > 400) fallbackRepDist = 100;
            else if (remainingDistanceForMainSet > 100) fallbackRepDist = 50;
            else fallbackRepDist = 25;

            let fallbackNumReps = Math.floor(remainingDistanceForMainSet / fallbackRepDist);
            fallbackNumReps = Math.min(fallbackNumReps, 16); // Cap fallback reps

            if (fallbackNumReps > 0) {
                mainSetTotalDist = fallbackNumReps * fallbackRepDist;
                sets.push(`${fallbackNumReps}x${fallbackRepDist} swim (${energySystem} focus) r30"`);
            } else {
                mainSetTotalDist = 0; // Should not happen if remainingDistanceForMainSet > 25
            }
        }

        if (sets.length === 0 && mainSetTotalDist === 0 && remainingDistanceForMainSet >= sp1Distances[0]){
            // Final catch-all if all else failed to produce anything but distance is available
            let finalFallbackRepDist = (remainingDistanceForMainSet >= 50) ? 50 : 25;
            let finalFallbackNumReps = Math.floor(remainingDistanceForMainSet / finalFallbackRepDist);
            finalFallbackNumReps = Math.min(finalFallbackNumReps, (finalFallbackRepDist === 50) ? 10 : 16);
             if (finalFallbackNumReps > 0) {
                mainSetTotalDist = finalFallbackNumReps * finalFallbackRepDist;
                sets.push(`${finalFallbackNumReps}x${finalFallbackRepDist} swim (${energySystem} focus) r30"`);
            }
        }


        return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Speed Endurance (${energySystem}) set.` };
    },
    'MAX_SPRINT': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => { // Was SP2
        let sets = [];
        let mainSetTotalDist = 0;
        let targetPacePer100 = cssSecondsPer100 - (10 + Math.random() * 15);
        let numReps = 0;
        let repDist = 0;

        const has50 = sp2Distances.includes(50);
        const has25 = sp2Distances.includes(25);

        if (remainingDistanceForMainSet < (has25 ? 25 : (has50 ? 50 : Infinity))) {
            return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `Max Sprint (${energySystem}) set.` };
        }

        // Step 1: Initial Rep Distance Choice and Calculation
        let initialRepDist;
        if (has50 && remainingDistanceForMainSet >= 750) {
            initialRepDist = 50;
        } else if (has25) {
            initialRepDist = 25;
        } else if (has50) { // Fallback if only 50s are available and distance is < 750
            initialRepDist = 50;
        } else { // No 25s or 50s in sp2Distances, or remainingDistance is too small
             return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `Max Sprint (${energySystem}) set.` };
        }

        const initialAbsoluteMaxReps = (initialRepDist === 50) ? 30 : 40;
        let numRepsForInitialDist = 0;
        if (initialRepDist > 0) { // Ensure repDist is positive
            numRepsForInitialDist = Math.min(Math.floor(remainingDistanceForMainSet / initialRepDist), initialAbsoluteMaxReps);
        }

        let currentCalcDist = numRepsForInitialDist * initialRepDist;

        repDist = initialRepDist;
        numReps = numRepsForInitialDist;

        // Step 2: Consider Switching from 25s to 50s
        if (initialRepDist === 25 && has50) {
            const potentialReps50 = Math.min(Math.floor(remainingDistanceForMainSet / 50), 30); // 30 is absoluteMaxReps for 50s
            const potentialDist50 = potentialReps50 * 50;
            const isSignificantUndershootWith25s = currentCalcDist < remainingDistanceForMainSet * 0.85;

            if (isSignificantUndershootWith25s && potentialDist50 > currentCalcDist) {
                repDist = 50;
                numReps = potentialReps50;
            }
            // If not switching, repDist and numReps remain as initially set for 25s
        }
        // If initialRepDist was 50, repDist and numReps are already set correctly.

        // Step 3: Final Safety Check for numReps
        if (numReps === 0 && repDist > 0 && remainingDistanceForMainSet >= repDist) {
            numReps = 1;
        }

        // Step 4: Calculate mainSetTotalDist
        if (numReps > 0 && repDist > 0) {
            mainSetTotalDist = numReps * repDist;
            const sp2Rest = "1'r";
            sets.push(`${numReps}x${repDist} UW sprint (${energySystem} focus, breath at wall) @ ${sp2Rest}`);
        } else {
            mainSetTotalDist = 0; // Ensure it's zero if no reps
            sets = [];
        }

        return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Max Sprint (${energySystem}) set.` };
    },
    'GENERAL_ENDURANCE': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => { // Was DEFAULT
        let sets = [];
        let mainSetTotalDist = 0;
        let targetPacePer100 = cssSecondsPer100;
        let numReps = 0;
        let repDist = 0;
        const generalDistances = [400, 300, 200]; // Preferred distances

        if (remainingDistanceForMainSet < 50) {
            // Negligible distance
            return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `General Endurance (${energySystem}) default set.` };
        }

        // Try to fit preferred distances first
        for (const dist of generalDistances) {
            if (remainingDistanceForMainSet >= dist) {
                const currentReps = Math.floor(remainingDistanceForMainSet / dist);
                if (currentReps > 0) {
                    // Check if this choice is better than a previous one (e.g. less remainder)
                    // For simplicity now, first fit is chosen. Can be optimized later.
                    if (numReps === 0) { // Take the first viable option (largest repDist)
                        repDist = dist;
                        numReps = currentReps;
                        // break; // Taking first fit
                    }
                    // Alternative: choose based on smallest remainder
                    let potentialTotal = currentReps * dist;
                    let currentBestTotal = numReps * repDist;
                    if ( (remainingDistanceForMainSet - potentialTotal) < (remainingDistanceForMainSet - currentBestTotal) ) {
                         repDist = dist;
                         numReps = currentReps;
                    } else if ((remainingDistanceForMainSet - potentialTotal) === (remainingDistanceForMainSet - currentBestTotal) && dist > repDist) {
                        // If remainders are equal, prefer larger rep distance
                        repDist = dist;
                        numReps = currentReps;
                    }

                }
            }
        }
        // If after checking standard distances, no reps were found (e.g. remaining < 200 but >= 50)
        // Or if the chosen rep left a very small remainder that couldn't be filled by another preferred distance.
        if (numReps === 0 && remainingDistanceForMainSet >= 50) {
            // Handle distances smaller than the smallest preferred generalDistance (200) or if no preferred dist fit
            repDist = Math.max(50, Math.floor(remainingDistanceForMainSet / 25) * 25); // Round down to nearest 25, min 50
            if (repDist > 0) { // Ensure repDist is not zero
                 numReps = 1; // Typically 1 rep for these custom distances
                 if (repDist * numReps > remainingDistanceForMainSet) { // Should not happen with Math.floor
                    numReps = 0; // Safety check
                 }
                 if (repDist < 50) numReps = 0; // repDist became too small

            } else { // repDist calculated to 0
                numReps = 0;
            }
        }

        if (numReps > 0 && repDist > 0) {
            mainSetTotalDist = numReps * repDist;
            let restTime = "r45\""; // Default rest
            if (repDist <= 100) restTime = "r20\"";
            else if (repDist <= 200) restTime = "r30\"";
            sets.push(`${numReps}x${repDist} swim (${energySystem} focus) ${restTime}`);
        } else {
            // If still no reps, ensure total distance is 0
            mainSetTotalDist = 0;
            sets = [];
        }

        return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `General Endurance (${energySystem}) default set.` };
    }
};

export { mainSetDefinitions };
