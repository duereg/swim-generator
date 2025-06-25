// lib/workoutGenerator.js

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
    return structure.trim().replace(/\s\s+/g, ' ').replace(/\s\(@/g, ' @');
}

function getRestString(repDist, restConfig, patternRestValue) {
    if (!restConfig) return 'r10"';

    switch (restConfig.type) {
        case "fixed":
            return restConfig.value;
        case "customFunction":
            if (typeof restConfig.customFunction === 'function') {
                return restConfig.customFunction(repDist);
            }
            return 'r10"';
        case "distanceBased": {
            const sortedKeys = Object.keys(restConfig.values)
                                     .filter(k => k !== 'default')
                                     .map(Number)
                                     .sort((a, b) => b - a);
            for (const keyDist of sortedKeys) {
                if (repDist >= keyDist) {
                    return restConfig.values[keyDist];
                }
            }
            return restConfig.values.default || 'r10"';
        }
        case "patternDefined":
            return patternRestValue || "";
        default:
            return 'r10"';
    }
}


// --- Strategy Implementations ---

function generateSet_BestFitSingleRepetition(remainingDistance, strategyConfig, restConfig, energySystem, setFormattingConfig) {
    const { repetitionDistances, maxRepsPerDistance, selectionPreference } = strategyConfig; // Updated: possibleRepDistances -> repetitionDistances
    let bestOption = { dist: 0, reps: 0, totalYardage: 0, isPreferredShorter: false };

    for (const currentDist of repetitionDistances) { // Updated
        if (remainingDistance >= currentDist) {
            let currentReps = Math.floor(remainingDistance / currentDist);
            if (currentReps === 0) continue;

            const maxReps = maxRepsPerDistance[currentDist] || 1;
            currentReps = Math.min(currentReps, maxReps);

            if (currentReps > 0) {
                const currentTotalYardage = currentReps * currentDist;
                const isCurrentDistPreferredShorter = selectionPreference.shorterRepValue && currentDist === selectionPreference.shorterRepValue;

                if (currentTotalYardage > bestOption.totalYardage) {
                    bestOption = { dist: currentDist, reps: currentReps, totalYardage: currentTotalYardage, isPreferredShorter: isCurrentDistPreferredShorter };
                } else if (currentTotalYardage === bestOption.totalYardage) {
                    if (selectionPreference.tiebreakYardage === "preferShorterRepIfSameYardageThenMoreReps") {
                        if (!bestOption.isPreferredShorter && isCurrentDistPreferredShorter) {
                            bestOption = { dist: currentDist, reps: currentReps, totalYardage: currentTotalYardage, isPreferredShorter: isCurrentDistPreferredShorter };
                        } else if (bestOption.isPreferredShorter === isCurrentDistPreferredShorter && currentReps > bestOption.reps) {
                            bestOption = { dist: currentDist, reps: currentReps, totalYardage: currentTotalYardage, isPreferredShorter: isCurrentDistPreferredShorter };
                        }
                    }
                }
            }
        }
    }

    if (bestOption.reps > 0 && bestOption.dist > 0) {
        const rest = getRestString(bestOption.dist, restConfig);
        const setInfo = {
            reps: bestOption.reps,
            dist: bestOption.dist,
            restString: rest,
            activity: setFormattingConfig.defaultActivity || "swim/kick"
        };
        return {
            generatedSets: [setInfo],
            totalDistance: bestOption.totalYardage,
            strategySpecificSummary: `${bestOption.reps}x${bestOption.dist}`,
            restSummary: rest
        };
    }
    return { generatedSets: [], totalDistance: 0, strategySpecificSummary: "No suitable reps found." };
}

function generateSet_ClosestFitGeneral(remainingDistance, strategyConfig, restConfig, energySystem, setFormattingConfig) {
    const { repetitionDistances, minRepDistanceForFallback, conservativeAdjustment } = strategyConfig; // Updated: possibleRepDistances -> repetitionDistances
    let bestRepDist = 0;
    let bestNumReps = 0;
    let smallestRemainder = Infinity;

    for (const dist of repetitionDistances) { // Updated
        if (remainingDistance >= dist) {
            let currentNumReps = Math.floor(remainingDistance / dist);
            let currentRemainder = remainingDistance - (currentNumReps * dist);
            if (currentNumReps > 0) {
                if (currentRemainder < smallestRemainder) {
                    smallestRemainder = currentRemainder;
                    bestRepDist = dist;
                    bestNumReps = currentNumReps;
                } else if (currentRemainder === smallestRemainder) {
                    if (dist > bestRepDist) {
                        bestRepDist = dist;
                        bestNumReps = currentNumReps;
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
    }

    if (bestNumReps > 0 && bestRepDist > 0 && conservativeAdjustment && conservativeAdjustment.enabled) {
        let calculatedDist = bestNumReps * bestRepDist;
        if (calculatedDist > remainingDistance * conservativeAdjustment.usageThresholdFactor &&
            bestRepDist >= conservativeAdjustment.minRepDistance &&
            bestNumReps >= conservativeAdjustment.minReps) {
            bestNumReps--;
        }
    }

    if (bestNumReps > 0 && bestRepDist > 0) {
        const rest = getRestString(bestRepDist, restConfig);
        const setInfo = {
            reps: bestNumReps,
            dist: bestRepDist,
            restString: rest,
            activity: setFormattingConfig.defaultActivity || "swim"
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
        setTargetDistanceMin, // Updated
        setTargetDistanceMaxDefault, // Updated
        setTargetDistanceMaxCap, // Updated
        repetitionDistances, // Updated
        repChoiceLogic
    } = strategyConfig;

    let actualTargetYardage = Math.min(remainingDistance, setTargetDistanceMaxCap); // Updated
    actualTargetYardage = Math.max(actualTargetYardage, setTargetDistanceMin); // Updated
    if(setTargetDistanceMaxDefault) { // Updated
        actualTargetYardage = Math.min(actualTargetYardage, setTargetDistanceMaxDefault); // Updated
    }

    if (actualTargetYardage < repetitionDistances.sort((a,b)=>a-b)[0]) { // Updated
        return { generatedSets: [], totalDistance: 0, strategySpecificSummary: "Target yardage too low for any rep." };
    }

    let repDist = 0;
    const canDoPreferred = repChoiceLogic.preferDistance && actualTargetYardage >= repChoiceLogic.preferDistance;
    const preferredIsViable = repetitionDistances.includes(repChoiceLogic.preferDistance); // Updated

    if (preferredIsViable && canDoPreferred && actualTargetYardage >= repChoiceLogic.thresholdYardage) {
        repDist = repChoiceLogic.preferDistance;
    } else {
        const sortedAvailableDists = repetitionDistances.filter(d => actualTargetYardage >= d).sort((a,b) => a-b); // Updated
        if(sortedAvailableDists.length > 0) {
            repDist = sortedAvailableDists[0];
        }
    }

    if (repDist === 0) {
         return { generatedSets: [], totalDistance: 0, strategySpecificSummary: "Could not select rep distance for target." };
    }

    let numReps = Math.floor(actualTargetYardage / repDist);
    numReps = Math.max(numReps, 1);

    const currentSetTotalYardage = numReps * repDist;

    if (currentSetTotalYardage > 0) {
        const rest = getRestString(repDist, restConfig);
        const setInfo = {
            reps: numReps,
            dist: repDist,
            restString: rest,
            activity: setFormattingConfig.defaultActivity || "sprint"
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
        setTargetDistanceMin, // Updated
        setTargetDistanceMaxCap, // Updated
        targetYardagePerBlockApprox,
        repetitionDistances, // Updated
        maxRepsInBlock,
        drills,
        interBlockRest
    } = strategyConfig;

    let setsOutput = [];
    let accumulatedDistInSet = 0;
    const smallestRepDist = repetitionDistances.sort((a,b)=>a-b)[0]; // Updated

    let targetOverallYardage = Math.min(remainingDistance, setTargetDistanceMaxCap); // Updated
    targetOverallYardage = Math.max(targetOverallYardage, setTargetDistanceMin); // Updated

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

        let currentRepDist = repetitionDistances[Math.floor(Math.random() * repetitionDistances.length)]; // Updated
        if (currentRepDist > distForCurrentBlockTarget) {
            const possibleDists = repetitionDistances.filter(d => d <= distForCurrentBlockTarget).sort((a,b)=>b-a); // Updated
            if (possibleDists.length > 0) currentRepDist = possibleDists[0];
            else continue;
        }
        if (currentRepDist === 0) continue;

        let numReps = Math.floor(distForCurrentBlockTarget / currentRepDist);
        numReps = Math.min(numReps, maxRepsInBlock);
        numReps = Math.max(numReps, 1);
        if (numReps * currentRepDist > distForCurrentBlockTarget) {
             numReps = Math.floor(distForCurrentBlockTarget / currentRepDist);
        }
        if (numReps === 0) continue;

        const currentBlockActualYardage = numReps * currentRepDist;
        if (currentBlockActualYardage > 0) {
            const blockRepRest = getRestString(currentRepDist, restConfig);
            const drillType = drills[Math.floor(Math.random() * drills.length)];

            setsOutput.push({
                reps: numReps, dist: currentRepDist, activity: drillType, restString: blockRepRest, type: 'mainSetItem'
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
    const { patterns, selectionLogic, fallbackStrategy } = strategyConfig;
    let viablePatterns = [];

    for (const pattern of patterns) {
        if (pattern.type === 'dynamicReps' && pattern.baseDist) {
            if (remainingDistance >= pattern.baseDist) {
                let numReps = Math.floor(remainingDistance / pattern.baseDist);
                numReps = Math.min(numReps, pattern.maxReps);
                if (numReps > 0) {
                    viablePatterns.push({
                        ...pattern, reps: numReps, dist: pattern.baseDist,
                        totalDist: numReps * pattern.baseDist,
                        id: `${numReps}x${pattern.baseDist}`
                    });
                }
            }
        } else if (pattern.type === 'fixedReps' && pattern.requiredDist) {
            if (remainingDistance >= pattern.requiredDist) {
                viablePatterns.push({ ...pattern, totalDist: pattern.requiredDist });
            }
        }
    }

    let bestFitSet = null;
    if (viablePatterns.length > 0) {
        if (selectionLogic === "maxAchievedDistance") {
             viablePatterns.sort((a, b) => {
                if (b.totalDist !== a.totalDist) {
                    return b.totalDist - a.totalDist;
                }
                return (patterns.indexOf(a)) - (patterns.indexOf(b));
            });
            bestFitSet = viablePatterns[0];

        } else if (selectionLogic === "prioritizeMaxDistanceThenRandom") {
            let maxDist = 0;
            viablePatterns.forEach(p => { if (p.totalDist > maxDist) maxDist = p.totalDist; });
            const bestDistancePatterns = viablePatterns.filter(p => p.totalDist === maxDist);
            if (bestDistancePatterns.length > 0) {
                bestFitSet = bestDistancePatterns[Math.floor(Math.random() * bestDistancePatterns.length)];
            }
        } else {
            bestFitSet = viablePatterns[0];
        }
    }

    if (!bestFitSet && fallbackStrategy && remainingDistance >= fallbackStrategy.minRepDistance) {
        if (fallbackStrategy.type === "simpleRepsMaxDistance") {
            let bestFallbackOption = null;
            let maxFallbackYardage = 0;
            for (const option of fallbackStrategy.options) {
                if (remainingDistance >= option.dist) {
                    let numReps = Math.floor(remainingDistance / option.dist);
                    numReps = Math.min(numReps, option.maxReps);
                    if (numReps > 0) {
                        const currentYardage = numReps * option.dist;
                        if (currentYardage > maxFallbackYardage) {
                            maxFallbackYardage = currentYardage;
                            bestFallbackOption = {
                                ...option, reps: numReps, totalDist: currentYardage,
                                id: `${numReps}x${option.dist} (fallback)`
                            };
                        }
                    }
                }
            }
            if (bestFallbackOption) bestFitSet = bestFallbackOption;
        }
    }

    if (bestFitSet) {
        const rest = getRestString(bestFitSet.dist, restConfig, bestFitSet.rest);
        const setInfo = {
            reps: bestFitSet.reps, dist: bestFitSet.dist,
            restString: rest, paceDesc: bestFitSet.paceDesc,
            activity: setFormattingConfig.defaultActivity || "swim"
        };
        return {
            generatedSets: [setInfo], totalDistance: bestFitSet.totalDist,
            strategySpecificSummary: bestFitSet.id || `${bestFitSet.reps}x${bestFitSet.dist}`,
            restSummary: rest, paceDescription: bestFitSet.paceDesc
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
        if (!cfg) return 0;
        // Use standardized name 'repetitionDistances' first
        if (cfg.strategyConfig?.repetitionDistances?.length > 0) return cfg.strategyConfig.repetitionDistances.sort((a,b)=>a-b)[0];
        // Fallback for older name if somehow still present (should not be needed after config update)
        if (cfg.strategyConfig?.possibleRepDistances?.length > 0) return cfg.strategyConfig.possibleRepDistances.sort((a,b)=>a-b)[0];

        if (cfg.strategyConfig?.patterns?.length > 0) {
            const patternDists = cfg.strategyConfig.patterns.map(p => p.baseDist || p.dist).filter(d => typeof d === 'number').sort((a,b)=>a-b);
            if (patternDists.length > 0) return patternDists[0];
        }
        if (cfg.strategyConfig?.fallbackStrategy?.minRepDistance) return cfg.strategyConfig.fallbackStrategy.minRepDistance;
        return cfg.minTotalDistanceForSet || 0;
    };

    if (config.minTotalDistanceForSet && remainingDistanceForMainSet < config.minTotalDistanceForSet) {
        descriptiveMessage = formatDescriptiveMessage(config.descriptiveMessages.tooShort, {
            workoutTypeName: config.workoutTypeName,
            minRepDistForType: String(getMinRepDistForType(config)),
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
