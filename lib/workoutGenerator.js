// lib/workoutGenerator.js - V3_SCHEMA_UPDATE_MARKER_GENERATOR
import _ from 'lodash';

// --- Helper Functions ---

function calculateTargetPace(cssSecondsPer100, paceConfig) {
    if (!paceConfig || typeof cssSecondsPer100 !== 'number') {
        return cssSecondsPer100;
    }
    let pace = cssSecondsPer100;
    const offset = paceConfig.offset || 0;
    const randomRange = paceConfig.randomRange || 0;
    let randomComponent = 0;
    if (randomRange > 0) {
        randomComponent = Math.random() * randomRange;
    }
    const totalAdjustment = offset + randomComponent;
    if (paceConfig.operator === "+") {
        pace += totalAdjustment;
    } else if (paceConfig.operator === "-") {
        pace -= totalAdjustment;
    }
    return pace;
}

function formatDescriptiveMessage(template, params) {
    if (!template) return "No descriptive message template provided.";
    let message = template;
    for (const key in params) {
        if (params[key] !== undefined) {
            message = message.replace(new RegExp(`{${key}}`, 'g'), params[key]);
        }
    }
    message = message.replace(/{[^}]+}/g, '');
    return message.trim();
}

function formatSetString(setInfo, energySystem, formatConfig) {
    let structure = formatConfig.baseStructure || "{reps}x{dist} {activity} ({energySystem} focus) {rest}";
    structure = structure.replace("{reps}", setInfo.reps);
    structure = structure.replace("{dist}", setInfo.dist);
    structure = structure.replace("{activity}", setInfo.activity || formatConfig.defaultActivity || "swim");
    structure = structure.replace("{energySystem}", energySystem);
    structure = structure.replace("{rest}", setInfo.restString || "");
    structure = structure.replace("{paceDesc}", setInfo.paceDesc || "");
    structure = structure.replace("{notes}", setInfo.notes || ""); // Added notes
    return structure.trim().replace(/\s\s+/g, ' ').replace(/\s\(@/g, ' @').replace(/\s\(\s*,/g, ' (').replace(/,\s*\)/g, ')').replace(/\(\s*\)/g, ''); // Clean up
}

function getRestString(repDist, restConfig, patternRestValue) {
    if (!restConfig) return 'r10"';
    switch (restConfig.type) {
        case "fixed": return restConfig.value;
        case "customFunction":
            if (typeof restConfig.customFunction === 'function') return restConfig.customFunction(repDist);
            return 'r10"';
        case "distanceBased": {
            const sortedKeys = Object.keys(restConfig.values).filter(k => k !== 'default').map(Number).sort((a, b) => b - a);
            for (const keyDist of sortedKeys) {
                if (repDist >= keyDist) return restConfig.values[keyDist];
            }
            return restConfig.values.default || 'r10"';
        }
        case "patternDefined": return patternRestValue || "";
        default: return 'r10"';
    }
}

// --- Strategy Implementations ---

function generateSet_BestFitSingleRepetition(remainingDistance, strategyConfig, restConfig, energySystem, setFormattingConfig) {
    const { setDefinitions, selectionPreference } = strategyConfig; // Use setDefinitions
    const shuffledSetDefinitions = _.shuffle(setDefinitions);
    let bestOption = { setDef: null, reps: 0, totalYardage: 0, isPreferredShorter: false };

    for (const setDef of shuffledSetDefinitions) { // Iterate over shuffledSetDefinitions
        const currentDist = setDef.distance;
        if (setDef.repScheme.type === "dynamic" && remainingDistance >= currentDist) {
            let currentReps = Math.floor(remainingDistance / currentDist);
            if (currentReps === 0) continue;

            const maxReps = setDef.repScheme.maxReps || Infinity;
            currentReps = Math.min(currentReps, maxReps);
            if (setDef.repScheme.minReps) {
                currentReps = Math.max(currentReps, setDef.repScheme.minReps);
                if (currentReps * currentDist > remainingDistance) continue; // Not enough for minReps
            }


            if (currentReps > 0) {
                const currentTotalYardage = currentReps * currentDist;
                const isCurrentDistPreferredShorter = selectionPreference.shorterRepValue && currentDist === selectionPreference.shorterRepValue;

                if (currentTotalYardage > bestOption.totalYardage) {
                    bestOption = { setDef, reps: currentReps, totalYardage: currentTotalYardage, isPreferredShorter: isCurrentDistPreferredShorter };
                } else if (currentTotalYardage === bestOption.totalYardage) {
                    if (selectionPreference.tiebreakYardage === "preferShorterRepIfSameYardageThenMoreReps") {
                        if (!bestOption.isPreferredShorter && isCurrentDistPreferredShorter) {
                            bestOption = { setDef, reps: currentReps, totalYardage: currentTotalYardage, isPreferredShorter: isCurrentDistPreferredShorter };
                        } else if (bestOption.isPreferredShorter === isCurrentDistPreferredShorter && currentReps > bestOption.reps) {
                            bestOption = { setDef, reps: currentReps, totalYardage: currentTotalYardage, isPreferredShorter: isCurrentDistPreferredShorter };
                        }
                    }
                }
            }
        }
    }

    if (bestOption.reps > 0 && bestOption.setDef) {
        const chosenSetDef = bestOption.setDef;
        const rest = chosenSetDef.rest || getRestString(chosenSetDef.distance, restConfig); // Prioritize setDef.rest
        const setInfo = {
            reps: bestOption.reps,
            dist: chosenSetDef.distance,
            restString: rest,
            activity: chosenSetDef.activity || setFormattingConfig.defaultActivity || "swim",
            paceDesc: chosenSetDef.paceDescription, // Pass through if available
            notes: chosenSetDef.notes,
        };
        return {
            generatedSets: [setInfo],
            totalDistance: bestOption.totalYardage,
            strategySpecificSummary: `${bestOption.reps}x${chosenSetDef.distance}`,
            restSummary: rest
        };
    }
    return { generatedSets: [], totalDistance: 0, strategySpecificSummary: "No suitable reps found." };
}

function generateSet_ClosestFitGeneral(remainingDistance, strategyConfig, restConfig, energySystem, setFormattingConfig) {
    const { setDefinitions, minRepDistanceForFallback, conservativeAdjustment } = strategyConfig; // Use setDefinitions
    const shuffledSetDefinitions = _.shuffle(setDefinitions);
    let bestRepDist = 0;
    let bestNumReps = 0;
    let smallestRemainder = Infinity;
    let chosenSetDef = null;

    for (const setDef of shuffledSetDefinitions) { // Iterate over shuffledSetDefinitions
        const dist = setDef.distance;
        if (remainingDistance >= dist) {
            let currentNumReps = Math.floor(remainingDistance / dist);
            let currentRemainder = remainingDistance - (currentNumReps * dist);
            if (currentNumReps > 0) {
                if (currentRemainder < smallestRemainder) {
                    smallestRemainder = currentRemainder;
                    bestRepDist = dist;
                    bestNumReps = currentNumReps;
                    chosenSetDef = setDef;
                } else if (currentRemainder === smallestRemainder) {
                    if (dist > bestRepDist) {
                        bestRepDist = dist;
                        bestNumReps = currentNumReps;
                        chosenSetDef = setDef;
                    }
                }
            }
        }
    }

    if (bestNumReps === 0 && remainingDistance >= minRepDistanceForFallback) {
        if (remainingDistance >= 50) {
             bestRepDist = Math.floor(remainingDistance / 50) * 50;
             if(bestRepDist === 0) bestRepDist = 50;
        } else {
             bestRepDist = minRepDistanceForFallback;
        }
        if (bestRepDist > 0) bestNumReps = Math.floor(remainingDistance / bestRepDist);
        if (bestNumReps * bestRepDist > remainingDistance || (bestNumReps === 0 && bestRepDist > 0 && remainingDistance >= bestRepDist) ) {
            if (remainingDistance >= bestRepDist && bestRepDist > 0) bestNumReps = Math.floor(remainingDistance/bestRepDist);
            else bestNumReps = 0;
        }
        if (bestNumReps > 0) { // Find a matching setDef for fallback or use defaults
            chosenSetDef = setDefinitions.find(sd => sd.distance === bestRepDist) || { distance: bestRepDist };
        }
    }

    if (bestNumReps > 0 && bestRepDist > 0 && conservativeAdjustment && conservativeAdjustment.enabled) {
        let calculatedDist = bestNumReps * bestRepDist;
        if (calculatedDist > remainingDistance * conservativeAdjustment.usageThresholdFactor &&
            bestRepDist >= conservativeAdjustment.minRepDistance &&
            bestNumReps >= conservativeAdjustment.minReps) {
            bestNumReps--;
        }
    }

    if (bestNumReps > 0 && bestRepDist > 0 && chosenSetDef) {
        const rest = chosenSetDef.rest || getRestString(bestRepDist, restConfig);
        const setInfo = {
            reps: bestNumReps,
            dist: bestRepDist,
            restString: rest,
            activity: chosenSetDef.activity || setFormattingConfig.defaultActivity || "swim",
            paceDesc: chosenSetDef.paceDescription,
            notes: chosenSetDef.notes,
        };
        return {
            generatedSets: [setInfo],
            totalDistance: bestNumReps * bestRepDist,
            strategySpecificSummary: `${bestNumReps}x${bestRepDist}`,
            restSummary: rest
        };
    }
    return { generatedSets: [], totalDistance: 0, strategySpecificSummary: "No suitable reps found." };
}

function generateSet_TargetYardageRepChoice(remainingDistance, strategyConfig, restConfig, energySystem, setFormattingConfig) {
    const {
        setTargetDistanceMin,
        setTargetDistanceMaxDefault,
        setTargetDistanceMaxCap,
        setDefinitions, // Use setDefinitions
        repChoiceLogic
    } = strategyConfig;
    const shuffledSetDefinitions = _.shuffle(setDefinitions);

    let actualTargetYardage = Math.min(remainingDistance, setTargetDistanceMaxCap);
    actualTargetYardage = Math.max(actualTargetYardage, setTargetDistanceMin);
    if(setTargetDistanceMaxDefault) {
        actualTargetYardage = Math.min(actualTargetYardage, setTargetDistanceMaxDefault);
    }

    const availableRepDistances = shuffledSetDefinitions.map(sd => sd.distance).sort((a,b)=>a-b);
    if (availableRepDistances.length === 0 || actualTargetYardage < availableRepDistances[0]) {
        return { generatedSets: [], totalDistance: 0, strategySpecificSummary: "Target yardage too low for any rep or no definitions." };
    }

    let chosenSetDef = null;
    const preferredSetDef = shuffledSetDefinitions.find(sd => sd.distance === repChoiceLogic.preferDistance);

    if (preferredSetDef && actualTargetYardage >= preferredSetDef.distance && actualTargetYardage >= repChoiceLogic.thresholdYardage) {
        chosenSetDef = preferredSetDef;
    } else {
        const sortedAvailableSetDefs = shuffledSetDefinitions.filter(sd => actualTargetYardage >= sd.distance).sort((a,b) => a.distance - b.distance);
        if(sortedAvailableSetDefs.length > 0) {
            chosenSetDef = sortedAvailableSetDefs[0];
        }
    }

    if (!chosenSetDef) {
         return { generatedSets: [], totalDistance: 0, strategySpecificSummary: "Could not select rep distance for target." };
    }

    const repDist = chosenSetDef.distance;
    let numReps = Math.floor(actualTargetYardage / repDist);
    numReps = Math.max(numReps, 1);

    const currentSetTotalYardage = numReps * repDist;

    if (currentSetTotalYardage > 0) {
        const rest = chosenSetDef.rest || getRestString(repDist, restConfig);
        const setInfo = {
            reps: numReps,
            dist: repDist,
            restString: rest,
            activity: chosenSetDef.activity || setFormattingConfig.defaultActivity || "sprint",
            paceDesc: chosenSetDef.paceDescription,
            notes: chosenSetDef.notes,
        };
        return {
            generatedSets: [setInfo],
            totalDistance: currentSetTotalYardage,
            strategySpecificSummary: `${numReps}x${repDist}`,
            restSummary: rest
        };
    }
    return { generatedSets: [], totalDistance: 0, strategySpecificSummary: "Calculated zero yardage." };
}

function generateSet_MultiBlock(remainingDistance, strategyConfig, restConfig) {
    const {
        setTargetDistanceMin,
        setTargetDistanceMaxCap,
        targetYardagePerBlockApprox,
        setDefinitions, // Use setDefinitions
        drills, // Keep drills separate as it's a pool of choices for activity
        interBlockRest
    } = strategyConfig;
    const shuffledSetDefinitions = _.shuffle(setDefinitions);

    let setsOutput = [];
    let accumulatedDistInSet = 0;
    const availableRepDistances = shuffledSetDefinitions.map(sd => sd.distance).sort((a,b) => a-b);
    if (availableRepDistances.length === 0) {
        return { generatedSets: [], totalDistance: 0, strategySpecificSummary: "No set definitions provided for MultiBlock." };
    }
    const smallestRepDist = availableRepDistances[0];

    let targetOverallYardage = Math.min(remainingDistance, setTargetDistanceMaxCap);
    targetOverallYardage = Math.max(targetOverallYardage, setTargetDistanceMin);

    if (targetOverallYardage < smallestRepDist) {
        return { generatedSets: [], totalDistance: 0, strategySpecificSummary: "Overall target yardage too low." };
    }

    let numBlocks = Math.max(1, Math.ceil(targetOverallYardage / targetYardagePerBlockApprox));
    let remainingForBlocksAllocation = targetOverallYardage;

    for (let i = 0; i < numBlocks; i++) {
        if (remainingForBlocksAllocation <= 0 || accumulatedDistInSet >= targetOverallYardage) break;
        if (remainingForBlocksAllocation < smallestRepDist) break;

        let distForCurrentBlockTarget = Math.floor(remainingForBlocksAllocation / (numBlocks - i));
        distForCurrentBlockTarget = Math.min(distForCurrentBlockTarget, remainingForBlocksAllocation);

        if (distForCurrentBlockTarget < smallestRepDist) continue;

        // Select a SetDefinition for the block (randomly from those that fit)
        const suitableSetDefs = shuffledSetDefinitions.filter(sd => sd.distance <= distForCurrentBlockTarget);
        if (suitableSetDefs.length === 0) continue;
        let chosenSetDef = suitableSetDefs[Math.floor(Math.random() * suitableSetDefs.length)];

        // If random choice too large, pick largest that fits (already somewhat handled by filter, but good check)
        // This part of logic might need refinement if random choice is strictly preferred.
        // For now, ensure it fits:
        if (chosenSetDef.distance > distForCurrentBlockTarget) {
             const possibleSetDefs = suitableSetDefs.sort((a,b) => b.distance - a.distance); // get largest
             if (possibleSetDefs.length > 0) chosenSetDef = possibleSetDefs[0];
             else continue;
        }

        const currentRepDist = chosenSetDef.distance;
        const maxRepsForThisDist = chosenSetDef.repScheme.maxReps || Infinity; // Max reps for this specific distance

        let numReps = Math.floor(distForCurrentBlockTarget / currentRepDist);
        numReps = Math.min(numReps, maxRepsForThisDist);
        numReps = Math.max(numReps, chosenSetDef.repScheme.minReps || 1);

        if (numReps * currentRepDist > distForCurrentBlockTarget) {
             numReps = Math.floor(distForCurrentBlockTarget / currentRepDist);
        }
        if (numReps === 0) continue;

        const currentBlockActualYardage = numReps * currentRepDist;
        if (currentBlockActualYardage > 0) {
            const blockRepRest = chosenSetDef.rest || getRestString(currentRepDist, restConfig);
            const drillType = chosenSetDef.activity || drills[Math.floor(Math.random() * drills.length)]; // Prefer activity from setDef

            setsOutput.push({
                reps: numReps, dist: currentRepDist, activity: drillType, restString: blockRepRest, type: 'mainSetItem',
                paceDesc: chosenSetDef.paceDescription, notes: chosenSetDef.notes,
            });
            accumulatedDistInSet += currentBlockActualYardage;
            remainingForBlocksAllocation -= currentBlockActualYardage;

            if (i < numBlocks - 1 && remainingForBlocksAllocation >= smallestRepDist && accumulatedDistInSet < targetOverallYardage) {
                const restSecondsVal = interBlockRest.minSeconds + Math.floor(Math.random() * (interBlockRest.maxSeconds - interBlockRest.minSeconds + 1));
                const formattedBlockRestText = typeof interBlockRest.format === 'function' ?
                    interBlockRest.format(restSecondsVal) : `${restSecondsVal}s rest`;
                setsOutput.push({ type: 'blockRestItem', text: formattedBlockRestText });
            }
        }
    }

    if (accumulatedDistInSet > 0) {
        return {
            generatedSets: setsOutput,
            totalDistance: accumulatedDistInSet,
            strategySpecificSummary: `${setsOutput.filter(s=>s.type==='mainSetItem').length} block(s), total ${accumulatedDistInSet}yds`,
            restSummary: "Varied"
        };
    }
    return { generatedSets: [], totalDistance: 0, strategySpecificSummary: "No blocks generated." };
}

function generateSet_PatternBased(remainingDistance, strategyConfig, restConfig, setFormattingConfig) {
    const { setDefinitions, selectionLogic, fallbackStrategy } = strategyConfig; // Use setDefinitions
    const shuffledSetDefinitions = _.shuffle(setDefinitions);
    let viablePatterns = [];
    // console.log('[PatternBased] Initial remainingDistance:', remainingDistance);
    // console.log('[PatternBased] Shuffled setDefinitions:', JSON.stringify(shuffledSetDefinitions, null, 2));

    for (const setDef of shuffledSetDefinitions) { // Iterate shuffledSetDefinitions
        // console.log('[PatternBased] Considering setDef:', JSON.stringify(setDef, null, 2));
        if (setDef.repScheme.type === 'dynamic' && setDef.distance) {
            // console.log('[PatternBased] Is dynamic');
            if (remainingDistance >= setDef.distance) {
                let numReps = Math.floor(remainingDistance / setDef.distance);
                if (setDef.repScheme.maxReps) numReps = Math.min(numReps, setDef.repScheme.maxReps);
                if (setDef.repScheme.minReps) numReps = Math.max(numReps, setDef.repScheme.minReps);

                if (numReps > 0 && (numReps * setDef.distance <= remainingDistance) ) {
                    viablePatterns.push({
                        ...setDef, // Includes original distance, rest, paceDesc, etc.
                        reps: numReps,
                        // dist: setDef.distance, // Already in setDef
                            totalDistance: numReps * setDef.distance, // Corrected property name
                        id: setDef.id || `${numReps}x${setDef.distance}` // Use existing ID or format
                    });
                }
            }
        } else if (setDef.repScheme.type === 'fixed' && setDef.totalDistance) {
            // console.log('[PatternBased] Is fixed type');
            if (remainingDistance >= setDef.totalDistance) {
                // console.log('[PatternBased] Adding fixed setDef to viablePatterns:', JSON.stringify(setDef));
                // For fixed, reps and dist are already defined in setDef.repScheme.fixedReps and setDef.distance
                viablePatterns.push({ ...setDef, reps: setDef.repScheme.fixedReps });
            } else {
                // console.log('[PatternBased] Fixed setDef totalDistance too high:', setDef.totalDistance);
            }
        }
    }
    // console.log('[PatternBased] ViablePatterns:', JSON.stringify(viablePatterns, null, 2));

    let bestFitSet = null;
    if (viablePatterns.length > 0) {
        // console.log('[PatternBased] Viable patterns found. SelectionLogic:', selectionLogic);
        if (selectionLogic === "maxAchievedDistance") {
             viablePatterns.sort((a, b) => {
                if (b.totalDistance !== a.totalDistance) return b.totalDistance - a.totalDistance;
                // Approx original index for tie-breaking (now randomized due to shuffledSetDefinitions)
                // Ensure 'a' and 'b' passed to findIndex are from the original shuffledSetDefinitions if 'id' is not unique enough
                // or if viablePatterns objects are modified copies that break === identity.
                // However, given typical use, matching by 'id' should be robust enough.
                return shuffledSetDefinitions.findIndex(sd => sd.id === a.id) - shuffledSetDefinitions.findIndex(sd => sd.id === b.id);
            });
            bestFitSet = viablePatterns[0];
        } else if (selectionLogic === "prioritizeMaxDistanceThenRandom") {
            let maxDist = 0;
            // Ensure using totalDistance, which is the correct property name from setDef
            viablePatterns.forEach(p => { if (p.totalDistance > maxDist) maxDist = p.totalDistance; });
            const bestDistancePatterns = viablePatterns.filter(p => p.totalDistance === maxDist);
            if (bestDistancePatterns.length > 0) {
                bestFitSet = bestDistancePatterns[Math.floor(Math.random() * bestDistancePatterns.length)];
            }
        } else {
            bestFitSet = viablePatterns[0];
        }
    }

    if (!bestFitSet && fallbackStrategy && fallbackStrategy.setDefinitions && remainingDistance >= fallbackStrategy.minRepDistance) { // Check fallbackStrategy.setDefinitions
        // If fallbackStrategy.setDefinitions are derived from the main setDefinitions, they should be shuffled too.
        // Assuming they might be a distinct list, we shuffle them here if they exist.
        // If they are guaranteed to be a subset of the already shuffled main list, this specific shuffle might be redundant
        // but harmless. If they are a completely separate list, this is necessary.
        const shuffledFallbackSetDefinitions = fallbackStrategy.setDefinitions ? _.shuffle(fallbackStrategy.setDefinitions) : [];

        if (fallbackStrategy.type === "simpleRepsMaxDistance") {
            let bestFallbackOption = null;
            let maxFallbackYardage = 0;
            for (const fbSetDef of shuffledFallbackSetDefinitions) { // Iterate shuffledFallbackSetDefinitions
                if (remainingDistance >= fbSetDef.distance) {
                    let numReps = Math.floor(remainingDistance / fbSetDef.distance);
                    if (fbSetDef.repScheme && fbSetDef.repScheme.maxReps) { // Assume fallback options are dynamic
                       numReps = Math.min(numReps, fbSetDef.repScheme.maxReps);
                    }
                    if (fbSetDef.repScheme && fbSetDef.repScheme.minReps) {
                        numReps = Math.max(numReps, fbSetDef.repScheme.minReps);
                    }

                    if (numReps > 0 && (numReps * fbSetDef.distance <= remainingDistance)) {
                        const currentYardage = numReps * fbSetDef.distance;
                        if (currentYardage > maxFallbackYardage) {
                            maxFallbackYardage = currentYardage;
                            bestFallbackOption = {
                                ...fbSetDef,
                                reps: numReps,
                                totalDistance: currentYardage, // Corrected here
                                id: fbSetDef.id || `${numReps}x${fbSetDef.distance} (fallback)`
                            };
                            // console.log(`[FallbackDebug] Set bestFallbackOption: ${JSON.stringify(bestFallbackOption, null, 2)} with yardage ${currentYardage}`);
                        }
                    }
                }
            }
            if (bestFallbackOption) bestFitSet = bestFallbackOption;
            // console.log(`[FallbackDebug] After loop, bestFallbackOption: ${JSON.stringify(bestFallbackOption, null, 2)}`);
        }
    }
    // console.log(`[FallbackDebug] Before final return, bestFitSet: ${JSON.stringify(bestFitSet, null, 2)}`);

    if (bestFitSet) {
        // console.log(`[FallbackDebug] bestFitSet IS valid, creating setInfo.`);
        const rest = bestFitSet.rest || getRestString(bestFitSet.distance, restConfig, bestFitSet.rest);
        const setInfo = {
            reps: bestFitSet.reps,
            dist: bestFitSet.distance,
            restString: rest,
            paceDesc: bestFitSet.paceDescription,
            activity: bestFitSet.activity || setFormattingConfig.defaultActivity || "swim",
            notes: bestFitSet.notes,
        };
        return {
            generatedSets: [setInfo], totalDistance: bestFitSet.totalDistance, // Corrected from totalDist
            strategySpecificSummary: bestFitSet.id || `${bestFitSet.reps}x${bestFitSet.distance}`,
            restSummary: rest, paceDescription: bestFitSet.paceDescription
        };
    }
    return { generatedSets: [], totalDistance: 0, strategySpecificSummary: "No pattern or fallback matched." };
}

// --- Main Generator Function ---
export function generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, config) {
    let sets = [];
    let mainSetTotalDist = 0;
    let targetPacePer100 = 0;
    let descriptiveMessage = "";

    if (!config) {
        return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage: "Error: Workout configuration not provided." };
    }

    targetPacePer100 = calculateTargetPace(cssSecondsPer100, config.paceConfig);

    const getMinRepDistForType = (cfg) => {
        if (!cfg || !cfg.strategyConfig) return cfg?.minTotalDistanceForSet || 0;

        let minDist = Infinity;
        if (cfg.strategyConfig.setDefinitions && cfg.strategyConfig.setDefinitions.length > 0) {
            cfg.strategyConfig.setDefinitions.forEach(sd => {
                if (sd.distance < minDist) minDist = sd.distance;
            });
        }
        // Check fallback definitions too, if they exist
        if (cfg.strategyConfig.fallbackStrategy && cfg.strategyConfig.fallbackStrategy.setDefinitions && cfg.strategyConfig.fallbackStrategy.setDefinitions.length > 0) {
             cfg.strategyConfig.fallbackStrategy.setDefinitions.forEach(sd => {
                if (sd.distance < minDist) minDist = sd.distance;
            });
        }
        // If still Infinity, means no distances found, use fallbackStrategy.minRepDistance or overall minTotalDistanceForSet
        if (minDist === Infinity) {
            minDist = cfg.strategyConfig.fallbackStrategy?.minRepDistance || cfg.minTotalDistanceForSet || 0;
        }
        // Final fallback to minTotalDistanceForSet if all else fails or gives 0 but minTotalDistanceForSet is higher
        return Math.max(minDist, cfg.minTotalDistanceForSet || 0) ;
    };


    if (config.minTotalDistanceForSet && remainingDistanceForMainSet < config.minTotalDistanceForSet) {
        descriptiveMessage = formatDescriptiveMessage(config.descriptiveMessages.tooShort, {
            workoutTypeName: config.workoutTypeName,
            minRepDistForType: String(getMinRepDistForType(config)), // Updated to use the new logic
            remainingDistance: String(remainingDistanceForMainSet)
        });
        return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage };
    }

    let strategyResult;
    const strategyFnMap = {
        "bestFitSingleRepetition": generateSet_BestFitSingleRepetition,
        "closestFitGeneral": generateSet_ClosestFitGeneral,
        "targetYardageWithRepChoice": generateSet_TargetYardageRepChoice,
        "multiBlock": generateSet_MultiBlock,
        "patternBased": generateSet_PatternBased,
    };

    const strategyFn = strategyFnMap[config.setGenerationStrategy];

    if (typeof strategyFn === 'function') {
        if (config.setGenerationStrategy === "patternBased") {
            strategyResult = strategyFn(remainingDistanceForMainSet, config.strategyConfig, config.restConfig, config.setFormatting);
        } else if (config.setGenerationStrategy === "multiBlock") {
            strategyResult = strategyFn(remainingDistanceForMainSet, config.strategyConfig, config.restConfig);
        } else {
            strategyResult = strategyFn(remainingDistanceForMainSet, config.strategyConfig, config.restConfig, energySystem, config.setFormatting);
        }
    } else {
        descriptiveMessage = `Error: Unknown/unimplemented strategy: ${config.setGenerationStrategy || 'undefined'}`;
        return { sets, mainSetTotalDist: 0, targetPacePer100, descriptiveMessage };
    }

    if (strategyResult && strategyResult.generatedSets && strategyResult.generatedSets.length > 0 && strategyResult.totalDistance > 0) {
        mainSetTotalDist = strategyResult.totalDistance;
        strategyResult.generatedSets.forEach(item => {
            if (item.type === 'blockRestItem') {
                sets.push(item.text);
            } else {
                 sets.push(formatSetString(item, energySystem, config.setFormatting));
            }
        });

        let paceSummaryText = "CSS";
        if (config.paceConfig) {
            const pc = config.paceConfig;
            if (pc.offset === 0 && !pc.randomRange) { /* paceSummaryText already "CSS" */ }
            else if (pc.operator && (pc.offset || pc.randomRange)) {
                 let basePaceDesc = "CSS ";
                 let offsetPart = "";
                 if (pc.offset) {
                    offsetPart = `${pc.operator}${pc.offset}`;
                 }
                 if (pc.randomRange) {
                    const rangeEnd = pc.offset + pc.randomRange;
                    if (pc.offset && Math.abs(rangeEnd) !== Math.abs(pc.offset)) {
                        offsetPart += `-${Math.abs(rangeEnd)}`;
                    } else if (!pc.offset) {
                        offsetPart = `${pc.operator}0-${Math.abs(pc.randomRange)}`;
                    }
                 }
                 paceSummaryText = basePaceDesc + offsetPart + "s/100m";
            }
        }

        descriptiveMessage = formatDescriptiveMessage(config.descriptiveMessages.success, {
            workoutTypeName: config.workoutTypeName,
            setSummary: strategyResult.strategySpecificSummary || "Set generated",
            energySystem: energySystem,
            totalDistance: String(mainSetTotalDist),
            paceDescription: strategyResult.paceDescription || paceSummaryText,
            restSummary: strategyResult.restSummary || "Varied rest",
        });

    } else {
        mainSetTotalDist = 0;
        descriptiveMessage = formatDescriptiveMessage(config.descriptiveMessages.fail, {
            workoutTypeName: config.workoutTypeName,
            energySystem: energySystem,
            remainingDistance: String(remainingDistanceForMainSet),
            details: strategyResult?.strategySpecificSummary || "No sets generated by strategy."
        });
    }

    return { sets, mainSetTotalDist, targetPacePer100, descriptiveMessage };
}
