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

        // Cap reps if they get too high for this type of set, e.g. max 10-12 reps for this part.
        // The original was 2-5. Let's try a slighter higher cap to allow more distance usage.
        if (numEn3Reps > 12) {
            numEn3Reps = 12;
        }


        if (numEn3Reps > 0 && en3RepDist > 0) {
            sets.push(`${numEn3Reps}x${en3RepDist} ${energySystem} focus swim/kb ${en3Rest}`);
            mainSetTotalDist += numEn3Reps * en3RepDist;
        }

        // Optional secondary set
        let newRemainingDistance = remainingDistanceForMainSet - mainSetTotalDist;
        // Use > 300 as threshold for substantial remaining distance for secondary set
        if (newRemainingDistance > 300 && Math.random() < 0.75) { // Increased probability for secondary set if distance allows
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

            // Cap secondary reps as well, e.g. max 5-6 reps
            if (secondaryReps > 6) {
                secondaryReps = 6;
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
        let mainSetTotalDist = 0;
        let targetPacePer100 = cssSecondsPer100 - (5 + Math.random() * 5);

        if (remainingDistanceForMainSet < 25) { // Smallest possible rep is 25
            return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `Speed Endurance (${energySystem}) set.` };
        }

        let numBlocks = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
        let blockDistRemainingForReps = remainingDistanceForMainSet; // Tracks distance available for swim reps

        // Estimate breaks: max 2 breaks of 50yd if 3 blocks and "ez" is chosen.
        // This is tricky. Let's assume an average of 0.5 * 50yd per potential break.
        // Number of potential breaks = numBlocks -1
        // let estimatedBreakDistance = (numBlocks > 1) ? (numBlocks - 1) * 25 : 0;
        // blockDistRemainingForReps -= estimatedBreakDistance;
        // The above estimation is complex. Simpler: subtract break dist if taken.

        for (let i = 0; i < numBlocks; i++) {
            if (blockDistRemainingForReps < sp1Distances[0]) break; // Not enough distance for even the smallest rep

            let targetDistForBlock = blockDistRemainingForReps / (numBlocks - i);
            let repDist = sp1Distances[Math.floor(Math.random() * sp1Distances.length)];
            let numReps = 0;

            if (targetDistForBlock >= repDist) {
                 numReps = Math.floor(targetDistForBlock / repDist);
            } else { // targetDistForBlock is less than the chosen repDist
                const possibleDists = sp1Distances.filter(d => d <= targetDistForBlock);
                if (possibleDists.length > 0) {
                    repDist = possibleDists[possibleDists.length - 1]; // Choose largest possible dist
                    numReps = Math.floor(targetDistForBlock / repDist);
                } else {
                    numReps = 0; // Cannot fit any rep
                }
            }

            if (numReps === 0 && targetDistForBlock >= sp1Distances[0]) { // If somehow numReps is 0 but there's space for smallest rep
                repDist = sp1Distances[0];
                numReps = Math.floor(targetDistForBlock / repDist);
            }

            // Apply original 4-8 rep range, but prioritize filling distance if numReps is lower.
            // If numReps is higher, cap it.
            if (numReps > 8) numReps = 8;
            // If numReps is < 4 but > 0, it's fine. The prompt says "Adjust numReps to be within a practical range (e.g., original 4-8)"
            // This implies we can go lower if needed to fit the distance.
            // If numReps is 0, this block will be skipped unless it's the only block and gets handled by fallback.

            if (numReps > 0) {
                let currentBlockDist = numReps * repDist;
                // Ensure this block doesn't make total exceed overall remaining (especially relevant for last block)
                if (mainSetTotalDist + currentBlockDist > remainingDistanceForMainSet) {
                    currentBlockDist = remainingDistanceForMainSet - mainSetTotalDist;
                    numReps = Math.floor(currentBlockDist / repDist);
                    if (numReps * repDist > currentBlockDist) numReps = Math.max(0, numReps -1); // Adjust if rounding up caused issues
                    currentBlockDist = numReps * repDist;
                }

                if (numReps > 0) { // Re-check after adjustment
                    let rest = `r${(Math.floor(Math.random() * (40 - 30 + 1)) + 30)}"`;
                    let drillType = sp1Drills[Math.floor(Math.random() * sp1Drills.length)];
                    sets.push(`${numReps}x${repDist} ${drillType} (${energySystem} focus) ${rest}`);
                    mainSetTotalDist += currentBlockDist;
                    blockDistRemainingForReps -= currentBlockDist;
                }


                if (i < numBlocks - 1 && blockDistRemainingForReps >= 50) { // Check blockDistRemainingForReps for break decision
                    let easyBreak = Math.random() > 0.5 ? "2min rest" : "50 ez + wait for top";
                    // Only add break if there's actual remaining distance to swim after it, or if it's a timed rest.
                    let potentialNextBlockMinDist = sp1Distances[0];
                    if (easyBreak.includes("ez")) {
                        if (blockDistRemainingForReps - 50 >= potentialNextBlockMinDist || (numBlocks -1 - i) === 1 ) { // Enough for 50ez and more reps, or it's the last break
                           if (mainSetTotalDist + 50 <= remainingDistanceForMainSet) {
                                sets.push(easyBreak);
                                mainSetTotalDist += 50;
                                blockDistRemainingForReps -= 50;
                           } else if (mainSetTotalDist < remainingDistanceForMainSet) { // Can only fit part of the ez dist
                               // Don't add partial ez, just make it timed rest
                               sets.push("2min rest");
                           }
                        } else if (!sets[sets.length-1].includes("rest")) { // Not enough for 50ez, just add time rest if prev wasn't rest
                             sets.push("2min rest");
                        }
                    } else { // Timed rest
                        sets.push(easyBreak);
                    }
                }
            }
        }

        if (sets.length === 0 && remainingDistanceForMainSet >= sp1Distances[0]) {
            // Fallback: if no sets were generated (e.g. all blocks too small)
            // Prioritize 50yd if possible, else 25yd.
            let fallbackRepDist = (remainingDistanceForMainSet >= sp1Distances[1]) ? sp1Distances[1] : sp1Distances[0];
            let fallbackNumReps = Math.floor(remainingDistanceForMainSet / fallbackRepDist);

            // Cap fallback reps to a reasonable number, e.g. 10-12 for 50s, 16-20 for 25s to avoid huge number of reps
            if (fallbackRepDist === 50 && fallbackNumReps > 12) fallbackNumReps = 12;
            if (fallbackRepDist === 25 && fallbackNumReps > 20) fallbackNumReps = 20;

            if (fallbackNumReps > 0) {
                mainSetTotalDist = fallbackNumReps * fallbackRepDist; // Reset total distance
                sets.push(`${fallbackNumReps}x${fallbackRepDist} swim (${energySystem} focus) r30"`);
            } else {
                mainSetTotalDist = 0; // ensure it's zero
            }
        }
        return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: `Speed Endurance (${energySystem}) set.` };
    },
    'MAX_SPRINT': (energySystem, cssSecondsPer100, remainingDistanceForMainSet) => { // Was SP2
        let sets = [];
        let mainSetTotalDist = 0;
        let targetPacePer100 = cssSecondsPer100 - (10 + Math.random() * 15);
        let numReps = 0;
        let repDist = sp2Distances[Math.floor(Math.random() * sp2Distances.length)];

        if (remainingDistanceForMainSet < sp2Distances[0]) { // Smallest sp2Distance is 25
            return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage: `Max Sprint (${energySystem}) set.` };
        }

        numReps = Math.floor(remainingDistanceForMainSet / repDist);

        if (numReps === 0 && repDist === 50 && remainingDistanceForMainSet >= sp2Distances[0]) {
            // Chosen 50yd but didn't fit, try 25yd if enough distance
            repDist = sp2Distances[0]; // 25yd
            numReps = Math.floor(remainingDistanceForMainSet / repDist);
        }

        // Apply max caps from sp2RepsMapping, but prioritize fitting distance if it means fewer reps than "minimums"
        const maxRepsForDist = sp2RepsMapping[repDist];
        if (numReps > maxRepsForDist) {
            numReps = maxRepsForDist;
        }

        // Old minimums logic (e.g. if numReps < 8 && repDist === 50 ) numReps = 8;
        // This is superseded by: "If remainingDistanceForMainSet is too small for these minimums, reduce numReps accordingly."
        // So, if numReps (calculated from remainingDistance) is already below these old minimums, we keep it.

        if (numReps > 0) {
            mainSetTotalDist = numReps * repDist;
            // It's possible mainSetTotalDist is slightly > remainingDistanceForMainSet if, for example,
            // remaining was 40, repDist became 25, numReps = 1. mainSetTotalDist = 25. This is fine.
            // The prompt says "If numReps * repDist is slightly over remainingDistanceForMainSet ... this might be acceptable"
            // However, Math.floor should ensure numReps * repDist <= remainingDistanceForMainSet.
            // The only way it would be over is if we forced a minimum number of reps that exceeded the distance.
            // With current logic, this should not happen.

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
