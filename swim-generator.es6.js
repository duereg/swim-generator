import _ from 'lodash';

var patterns = [
	{
		repeat: true,
		minTime: 0,
		name: "repeating intervals"
	},
	{
		pattern: [
			{
				group: "a",
				interval: [
					4,
					1
				]
			},
			{
				group: "b",
				interval: [
					2,
					2
				]
			},
			{
				group: "c",
				interval: [
					1,
					4
				]
			},
			{
				group: "b",
				interval: [
					2,
					2
				]
			},
			{
				group: "a",
				interval: [
					4,
					1
				]
			}
		],
		repeat: false,
		minTime: 400,
		intervalSize: 4,
		name: "100 pyramid"
	},
	{
		pattern: [
			{
				group: "a",
				interval: [
					2,
					4
				]
			},
			{
				group: "b",
				interval: [
					1,
					8
				]
			},
			{
				group: "c",
				interval: [
					2,
					4
				]
			}
		],
		repeat: false,
		minTime: 480,
		intervalSize: 4,
		name: "Short 200 pyramid"
	},
	{
		pattern: [
			{
				group: "a",
				interval: [
					6,
					2
				]
			},
			{
				group: "b",
				interval: [
					3,
					4
				]
			},
			{
				group: "c",
				interval: [
					2,
					6
				]
			},
			{
				group: "b",
				interval: [
					3,
					4
				]
			},
			{
				group: "a",
				interval: [
					6,
					2
				]
			}
		],
		repeat: false,
		minTime: 1200,
		intervalSize: 12,
		name: "150 pyramid"
	},
	{
		pattern: [
			{
				group: "a",
				interval: [
					4,
					1
				]
			},
			{
				group: "b",
				interval: [
					2,
					2
				]
			},
			{
				group: "a",
				interval: [
					4,
					1
				]
			},
			{
				group: "c",
				interval: [
					1,
					4
				]
			},
			{
				group: "a",
				interval: [
					4,
					1
				]
			},
			{
				group: "b",
				interval: [
					2,
					2
				]
			},
			{
				group: "a",
				interval: [
					4,
					1
				]
			}
		],
		repeat: false,
		minTime: 560,
		intervalSize: 4,
		name: "200 binary"
	},
	{
		pattern: [
			{
				group: "a",
				interval: [
					3,
					2
				]
			},
			{
				group: "b",
				interval: [
					2,
					3
				]
			},
			{
				group: "a",
				interval: [
					3,
					2
				]
			},
			{
				group: "c",
				interval: [
					1,
					6
				]
			},
			{
				group: "a",
				interval: [
					3,
					2
				]
			},
			{
				group: "b",
				interval: [
					2,
					3
				]
			},
			{
				group: "a",
				interval: [
					3,
					2
				]
			}
		],
		repeat: false,
		minTime: 840,
		intervalSize: 6,
		name: "300 binary"
	},
	{
		pattern: [
			{
				group: "a",
				interval: [
					2,
					4
				]
			},
			{
				group: "a",
				interval: [
					2,
					3
				]
			},
			{
				group: "a",
				interval: [
					2,
					2
				]
			},
			{
				group: "a",
				interval: [
					2,
					1
				]
			}
		],
		repeat: false,
		minTime: 400,
		intervalSize: 5,
		name: "decline"
	},
	{
		pattern: [
			{
				group: "a",
				interval: [
					1,
					8
				]
			},
			{
				group: "b",
				interval: [
					2,
					4
				]
			},
			{
				group: "c",
				interval: [
					4,
					2
				]
			}
		],
		repeat: false,
		minTime: 480,
		intervalSize: 5,
		name: "short decline"
	},
	{
		pattern: [
			{
				group: "a",
				interval: [
					4,
					4
				]
			},
			{
				group: "b",
				interval: [
					4,
					4
				]
			},
			{
				group: "a",
				interval: [
					4,
					4
				]
			},
			{
				group: "b",
				interval: [
					4,
					4
				]
			}
		],
		repeat: false,
		minTime: 1600,
		intervalSize: 8,
		name: "4x4"
	},
	{
		pattern: [
			{
				group: "a",
				interval: [
					3,
					4
				]
			},
			{
				group: "b",
				interval: [
					4,
					3
				]
			},
			{
				group: "a",
				interval: [
					3,
					4
				]
			},
			{
				group: "b",
				interval: [
					4,
					3
				]
			},
			{
				group: "a",
				interval: [
					3,
					4
				]
			},
			{
				group: "b",
				interval: [
					4,
					3
				]
			}
		],
		repeat: false,
		minTime: 1440,
		intervalSize: 8,
		name: "100's and 75's"
	},
	{
		pattern: [
			{
				group: "a",
				interval: [
					1,
					8
				]
			},
			{
				group: "b",
				interval: [
					4,
					2
				]
			},
			{
				group: "a",
				interval: [
					1,
					8
				]
			},
			{
				group: "b",
				interval: [
					4,
					2
				]
			},
			{
				group: "a",
				interval: [
					1,
					8
				]
			},
			{
				group: "b",
				interval: [
					4,
					2
				]
			},
			{
				group: "a",
				interval: [
					1,
					8
				]
			},
			{
				group: "b",
				interval: [
					4,
					2
				]
			}
		],
		repeat: false,
		minTime: 1280,
		intervalSize: 8,
		name: "200's and 50's"
	},
	{
		pattern: [
			{
				group: "a",
				interval: [
					10,
					4
				]
			}
		],
		repeat: false,
		minTime: 1000,
		intervalSize: 40,
		name: "10x100"
	}
];

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _createForOfIteratorHelper(r, e) {
  var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (!t) {
    if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
      t && (r = t);
      var n = 0,
        F = function () {};
      return {
        s: F,
        n: function () {
          return n >= r.length ? {
            done: true
          } : {
            done: false,
            value: r[n++]
          };
        },
        e: function (r) {
          throw r;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var o,
    a = true,
    u = false;
  return {
    s: function () {
      t = t.call(r);
    },
    n: function () {
      var r = t.next();
      return a = r.done, r;
    },
    e: function (r) {
      u = true, o = r;
    },
    f: function () {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    }
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

// Warmup options based on various sources [2, 5, 7, 8, 11, 13, 15, 17, 19, 20]
var warmups = [{
  desc: "200 no fins, 200 w fins swim",
  dist: 400,
  type: "swim"
},
//[2]
{
  desc: "400 warmup (75 kick, 25 under)",
  dist: 400,
  type: "kick"
},
//[5]
{
  desc: "250 pull warmup, 250 swim warmup",
  dist: 500,
  type: "pull/swim"
},
//[20]
{
  desc: "250 warmup",
  dist: 250,
  type: "general"
},
//[8, 13]
{
  desc: "200 warm up",
  dist: 200,
  type: "general"
},
//[7]
{
  desc: "500 warmup",
  dist: 500,
  type: "general"
},
//[11, 17]
{
  desc: "300 warm up",
  dist: 300,
  type: "general"
},
//[15]
{
  desc: "150 warm up",
  dist: 150,
  type: "general"
} //[19]
];

// Option for no warmup, as seen in some sources [1, 9]
var noWarmupOption = {
  desc: "No warmup bitches",
  dist: 0,
  type: "none"
}; //[1]

// Cool-down options based on various sources [2, 5, 7, 9, 10, 12, 13, 16, 17, 19-21]
var cooldowns = [{
  desc: "200 w fins (or combo)",
  dist: 200,
  type: "fins"
},
//[2]
{
  desc: "200 swim cooldown",
  dist: 200,
  type: "swim"
},
//[5]
{
  desc: "100 cool down",
  dist: 100,
  type: "general"
},
//[7]
{
  desc: "300 CD",
  dist: 300,
  type: "general"
},
//[9]
{
  desc: "200 CD",
  dist: 200,
  type: "general"
},
//[10, 16, 21]
{
  desc: "450 cooldown (300 swim, 150 under)",
  dist: 450,
  type: "swim/under"
},
//[20]
{
  desc: "100 cool",
  dist: 100,
  type: "general"
},
//[17]
{
  desc: "150 cooldown and 20 minutes of stick skills",
  dist: 150,
  type: "general"
},
//[19]
{
  desc: "100 fin swim cooldown",
  dist: 100,
  type: "fin swim"
},
//[12]
{
  desc: "250 cool down",
  dist: 250,
  type: "general"
} //[13]
];

// --- Helper Functions ---

function calculateTargetPace(cssSecondsPer100, paceConfig) {
  if (!paceConfig || typeof cssSecondsPer100 !== 'number') {
    return cssSecondsPer100;
  }
  var pace = cssSecondsPer100;
  var offset = paceConfig.offset || 0;
  var randomRange = paceConfig.randomRange || 0;
  var randomComponent = 0;
  if (randomRange > 0) {
    randomComponent = Math.random() * randomRange;
  }
  var totalAdjustment = offset + randomComponent;
  if (paceConfig.operator === "+") {
    pace += totalAdjustment;
  } else if (paceConfig.operator === "-") {
    pace -= totalAdjustment;
  }
  return pace;
}
function formatDescriptiveMessage(template, params) {
  if (!template) return "No descriptive message template provided.";
  var message = template;
  for (var key in params) {
    if (params[key] !== undefined) {
      message = message.replace(new RegExp("{".concat(key, "}"), 'g'), params[key]);
    }
  }
  message = message.replace(/{[^}]+}/g, '');
  return message.trim();
}
function formatSetString(setInfo, energySystem, formatConfig) {
  var structure = formatConfig.baseStructure || "{reps}x{dist} {activity} ({energySystem} focus) {rest}";
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
    case "fixed":
      return restConfig.value;
    case "customFunction":
      if (typeof restConfig.customFunction === 'function') return restConfig.customFunction(repDist);
      return 'r10"';
    case "distanceBased":
      {
        var sortedKeys = Object.keys(restConfig.values).filter(function (k) {
          return k !== 'default';
        }).map(Number).sort(function (a, b) {
          return b - a;
        });
        var _iterator = _createForOfIteratorHelper(sortedKeys),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var keyDist = _step.value;
            if (repDist >= keyDist) return restConfig.values[keyDist];
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return restConfig.values["default"] || 'r10"';
      }
    case "patternDefined":
      return patternRestValue || "";
    default:
      return 'r10"';
  }
}

// --- Strategy Implementations ---

function generateSet_BestFitSingleRepetition(remainingDistance, strategyConfig, restConfig, energySystem, setFormattingConfig) {
  var setDefinitions = strategyConfig.setDefinitions,
    selectionPreference = strategyConfig.selectionPreference; // Use setDefinitions
  var shuffledSetDefinitions = _.shuffle(setDefinitions);
  var bestOption = {
    setDef: null,
    reps: 0,
    totalYardage: 0,
    isPreferredShorter: false
  };
  var _iterator2 = _createForOfIteratorHelper(shuffledSetDefinitions),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var setDef = _step2.value;
      // Iterate over shuffledSetDefinitions
      var currentDist = setDef.distance;
      if (setDef.repScheme.type === "dynamic" && remainingDistance >= currentDist) {
        var currentReps = Math.floor(remainingDistance / currentDist);
        if (currentReps === 0) continue;
        var maxReps = setDef.repScheme.maxReps || Infinity;
        currentReps = Math.min(currentReps, maxReps);
        if (setDef.repScheme.minReps) {
          currentReps = Math.max(currentReps, setDef.repScheme.minReps);
          if (currentReps * currentDist > remainingDistance) continue; // Not enough for minReps
        }
        if (currentReps > 0) {
          var currentTotalYardage = currentReps * currentDist;
          var isCurrentDistPreferredShorter = selectionPreference.shorterRepValue && currentDist === selectionPreference.shorterRepValue;
          if (currentTotalYardage > bestOption.totalYardage) {
            bestOption = {
              setDef: setDef,
              reps: currentReps,
              totalYardage: currentTotalYardage,
              isPreferredShorter: isCurrentDistPreferredShorter
            };
          } else if (currentTotalYardage === bestOption.totalYardage) {
            if (selectionPreference.tiebreakYardage === "preferShorterRepIfSameYardageThenMoreReps") {
              if (!bestOption.isPreferredShorter && isCurrentDistPreferredShorter) {
                bestOption = {
                  setDef: setDef,
                  reps: currentReps,
                  totalYardage: currentTotalYardage,
                  isPreferredShorter: isCurrentDistPreferredShorter
                };
              } else if (bestOption.isPreferredShorter === isCurrentDistPreferredShorter && currentReps > bestOption.reps) {
                bestOption = {
                  setDef: setDef,
                  reps: currentReps,
                  totalYardage: currentTotalYardage,
                  isPreferredShorter: isCurrentDistPreferredShorter
                };
              }
            }
          }
        }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  if (bestOption.reps > 0 && bestOption.setDef) {
    var chosenSetDef = bestOption.setDef;
    var rest = chosenSetDef.rest || getRestString(chosenSetDef.distance, restConfig); // Prioritize setDef.rest
    var setInfo = {
      reps: bestOption.reps,
      dist: chosenSetDef.distance,
      restString: rest,
      activity: chosenSetDef.activity || setFormattingConfig.defaultActivity || "swim",
      paceDesc: chosenSetDef.paceDescription,
      // Pass through if available
      notes: chosenSetDef.notes
    };
    return {
      generatedSets: [setInfo],
      totalDistance: bestOption.totalYardage,
      strategySpecificSummary: "".concat(bestOption.reps, "x").concat(chosenSetDef.distance),
      restSummary: rest
    };
  }
  return {
    generatedSets: [],
    totalDistance: 0,
    strategySpecificSummary: "No suitable reps found."
  };
}
function generateSet_ClosestFitGeneral(remainingDistance, strategyConfig, restConfig, energySystem, setFormattingConfig) {
  var setDefinitions = strategyConfig.setDefinitions,
    minRepDistanceForFallback = strategyConfig.minRepDistanceForFallback,
    conservativeAdjustment = strategyConfig.conservativeAdjustment; // Use setDefinitions
  var shuffledSetDefinitions = _.shuffle(setDefinitions);
  var bestRepDist = 0;
  var bestNumReps = 0;
  var smallestRemainder = Infinity;
  var chosenSetDef = null;
  var _iterator3 = _createForOfIteratorHelper(shuffledSetDefinitions),
    _step3;
  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var setDef = _step3.value;
      // Iterate over shuffledSetDefinitions
      var dist = setDef.distance;
      if (remainingDistance >= dist) {
        var currentNumReps = Math.floor(remainingDistance / dist);
        var currentRemainder = remainingDistance - currentNumReps * dist;
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
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  if (bestNumReps === 0 && remainingDistance >= minRepDistanceForFallback) {
    if (remainingDistance >= 50) {
      bestRepDist = Math.floor(remainingDistance / 50) * 50;
      if (bestRepDist === 0) bestRepDist = 50;
    } else {
      bestRepDist = minRepDistanceForFallback;
    }
    if (bestRepDist > 0) bestNumReps = Math.floor(remainingDistance / bestRepDist);
    if (bestNumReps * bestRepDist > remainingDistance || bestNumReps === 0 && bestRepDist > 0 && remainingDistance >= bestRepDist) {
      if (remainingDistance >= bestRepDist && bestRepDist > 0) bestNumReps = Math.floor(remainingDistance / bestRepDist);else bestNumReps = 0;
    }
    if (bestNumReps > 0) {
      // Find a matching setDef for fallback or use defaults
      chosenSetDef = setDefinitions.find(function (sd) {
        return sd.distance === bestRepDist;
      }) || {
        distance: bestRepDist
      };
    }
  }
  if (bestNumReps > 0 && bestRepDist > 0 && conservativeAdjustment && conservativeAdjustment.enabled) {
    var calculatedDist = bestNumReps * bestRepDist;
    if (calculatedDist > remainingDistance * conservativeAdjustment.usageThresholdFactor && bestRepDist >= conservativeAdjustment.minRepDistance && bestNumReps >= conservativeAdjustment.minReps) {
      bestNumReps--;
    }
  }
  if (bestNumReps > 0 && bestRepDist > 0 && chosenSetDef) {
    var rest = chosenSetDef.rest || getRestString(bestRepDist, restConfig);
    var setInfo = {
      reps: bestNumReps,
      dist: bestRepDist,
      restString: rest,
      activity: chosenSetDef.activity || setFormattingConfig.defaultActivity || "swim",
      paceDesc: chosenSetDef.paceDescription,
      notes: chosenSetDef.notes
    };
    return {
      generatedSets: [setInfo],
      totalDistance: bestNumReps * bestRepDist,
      strategySpecificSummary: "".concat(bestNumReps, "x").concat(bestRepDist),
      restSummary: rest
    };
  }
  return {
    generatedSets: [],
    totalDistance: 0,
    strategySpecificSummary: "No suitable reps found."
  };
}
function generateSet_TargetYardageRepChoice(remainingDistance, strategyConfig, restConfig, energySystem, setFormattingConfig) {
  var setTargetDistanceMin = strategyConfig.setTargetDistanceMin,
    setTargetDistanceMaxDefault = strategyConfig.setTargetDistanceMaxDefault,
    setTargetDistanceMaxCap = strategyConfig.setTargetDistanceMaxCap,
    setDefinitions = strategyConfig.setDefinitions,
    repChoiceLogic = strategyConfig.repChoiceLogic;
  var shuffledSetDefinitions = _.shuffle(setDefinitions);
  var actualTargetYardage = Math.min(remainingDistance, setTargetDistanceMaxCap);
  actualTargetYardage = Math.max(actualTargetYardage, setTargetDistanceMin);
  if (setTargetDistanceMaxDefault) {
    actualTargetYardage = Math.min(actualTargetYardage, setTargetDistanceMaxDefault);
  }
  var availableRepDistances = shuffledSetDefinitions.map(function (sd) {
    return sd.distance;
  }).sort(function (a, b) {
    return a - b;
  });
  if (availableRepDistances.length === 0 || actualTargetYardage < availableRepDistances[0]) {
    return {
      generatedSets: [],
      totalDistance: 0,
      strategySpecificSummary: "Target yardage too low for any rep or no definitions."
    };
  }
  var chosenSetDef = null;
  var preferredSetDef = shuffledSetDefinitions.find(function (sd) {
    return sd.distance === repChoiceLogic.preferDistance;
  });
  if (preferredSetDef && actualTargetYardage >= preferredSetDef.distance && actualTargetYardage >= repChoiceLogic.thresholdYardage) {
    chosenSetDef = preferredSetDef;
  } else {
    var sortedAvailableSetDefs = shuffledSetDefinitions.filter(function (sd) {
      return actualTargetYardage >= sd.distance;
    }).sort(function (a, b) {
      return a.distance - b.distance;
    });
    if (sortedAvailableSetDefs.length > 0) {
      chosenSetDef = sortedAvailableSetDefs[0];
    }
  }
  if (!chosenSetDef) {
    return {
      generatedSets: [],
      totalDistance: 0,
      strategySpecificSummary: "Could not select rep distance for target."
    };
  }
  var repDist = chosenSetDef.distance;
  var numReps = Math.floor(actualTargetYardage / repDist);
  numReps = Math.max(numReps, 1);
  var currentSetTotalYardage = numReps * repDist;
  if (currentSetTotalYardage > 0) {
    var rest = chosenSetDef.rest || getRestString(repDist, restConfig);
    var setInfo = {
      reps: numReps,
      dist: repDist,
      restString: rest,
      activity: chosenSetDef.activity || setFormattingConfig.defaultActivity || "sprint",
      paceDesc: chosenSetDef.paceDescription,
      notes: chosenSetDef.notes
    };
    return {
      generatedSets: [setInfo],
      totalDistance: currentSetTotalYardage,
      strategySpecificSummary: "".concat(numReps, "x").concat(repDist),
      restSummary: rest
    };
  }
  return {
    generatedSets: [],
    totalDistance: 0,
    strategySpecificSummary: "Calculated zero yardage."
  };
}
function generateSet_MultiBlock(remainingDistance, strategyConfig, restConfig) {
  var setTargetDistanceMin = strategyConfig.setTargetDistanceMin,
    setTargetDistanceMaxCap = strategyConfig.setTargetDistanceMaxCap,
    targetYardagePerBlockApprox = strategyConfig.targetYardagePerBlockApprox,
    setDefinitions = strategyConfig.setDefinitions,
    drills = strategyConfig.drills,
    interBlockRest = strategyConfig.interBlockRest;
  var shuffledSetDefinitions = _.shuffle(setDefinitions);
  var setsOutput = [];
  var accumulatedDistInSet = 0;
  var availableRepDistances = shuffledSetDefinitions.map(function (sd) {
    return sd.distance;
  }).sort(function (a, b) {
    return a - b;
  });
  if (availableRepDistances.length === 0) {
    return {
      generatedSets: [],
      totalDistance: 0,
      strategySpecificSummary: "No set definitions provided for MultiBlock."
    };
  }
  var smallestRepDist = availableRepDistances[0];
  var targetOverallYardage = Math.min(remainingDistance, setTargetDistanceMaxCap);
  targetOverallYardage = Math.max(targetOverallYardage, setTargetDistanceMin);
  if (targetOverallYardage < smallestRepDist) {
    return {
      generatedSets: [],
      totalDistance: 0,
      strategySpecificSummary: "Overall target yardage too low."
    };
  }
  var numBlocks = Math.max(1, Math.ceil(targetOverallYardage / targetYardagePerBlockApprox));
  var remainingForBlocksAllocation = targetOverallYardage;
  var _loop = function _loop() {
      if (remainingForBlocksAllocation <= 0 || accumulatedDistInSet >= targetOverallYardage) return 0; // break
      if (remainingForBlocksAllocation < smallestRepDist) return 0; // break
      var distForCurrentBlockTarget = Math.floor(remainingForBlocksAllocation / (numBlocks - i));
      distForCurrentBlockTarget = Math.min(distForCurrentBlockTarget, remainingForBlocksAllocation);
      if (distForCurrentBlockTarget < smallestRepDist) return 1; // continue

      // Select a SetDefinition for the block (randomly from those that fit)
      var suitableSetDefs = shuffledSetDefinitions.filter(function (sd) {
        return sd.distance <= distForCurrentBlockTarget;
      });
      if (suitableSetDefs.length === 0) return 1; // continue
      var chosenSetDef = suitableSetDefs[Math.floor(Math.random() * suitableSetDefs.length)];

      // If random choice too large, pick largest that fits (already somewhat handled by filter, but good check)
      // This part of logic might need refinement if random choice is strictly preferred.
      // For now, ensure it fits:
      if (chosenSetDef.distance > distForCurrentBlockTarget) {
        var possibleSetDefs = suitableSetDefs.sort(function (a, b) {
          return b.distance - a.distance;
        }); // get largest
        if (possibleSetDefs.length > 0) chosenSetDef = possibleSetDefs[0];else return 1; // continue
      }
      var currentRepDist = chosenSetDef.distance;
      var maxRepsForThisDist = chosenSetDef.repScheme.maxReps || Infinity; // Max reps for this specific distance

      var numReps = Math.floor(distForCurrentBlockTarget / currentRepDist);
      numReps = Math.min(numReps, maxRepsForThisDist);
      numReps = Math.max(numReps, chosenSetDef.repScheme.minReps || 1);
      if (numReps * currentRepDist > distForCurrentBlockTarget) {
        numReps = Math.floor(distForCurrentBlockTarget / currentRepDist);
      }
      if (numReps === 0) return 1; // continue
      var currentBlockActualYardage = numReps * currentRepDist;
      if (currentBlockActualYardage > 0) {
        var blockRepRest = chosenSetDef.rest || getRestString(currentRepDist, restConfig);
        var drillType = chosenSetDef.activity || drills[Math.floor(Math.random() * drills.length)]; // Prefer activity from setDef

        setsOutput.push({
          reps: numReps,
          dist: currentRepDist,
          activity: drillType,
          restString: blockRepRest,
          type: 'mainSetItem',
          paceDesc: chosenSetDef.paceDescription,
          notes: chosenSetDef.notes
        });
        accumulatedDistInSet += currentBlockActualYardage;
        remainingForBlocksAllocation -= currentBlockActualYardage;
        if (i < numBlocks - 1 && remainingForBlocksAllocation >= smallestRepDist && accumulatedDistInSet < targetOverallYardage) {
          var restSecondsVal = interBlockRest.minSeconds + Math.floor(Math.random() * (interBlockRest.maxSeconds - interBlockRest.minSeconds + 1));
          var formattedBlockRestText = typeof interBlockRest.format === 'function' ? interBlockRest.format(restSecondsVal) : "".concat(restSecondsVal, "s rest");
          setsOutput.push({
            type: 'blockRestItem',
            text: formattedBlockRestText
          });
        }
      }
    },
    _ret;
  for (var i = 0; i < numBlocks; i++) {
    _ret = _loop();
    if (_ret === 0) break;
    if (_ret === 1) continue;
  }
  if (accumulatedDistInSet > 0) {
    return {
      generatedSets: setsOutput,
      totalDistance: accumulatedDistInSet,
      strategySpecificSummary: "".concat(setsOutput.filter(function (s) {
        return s.type === 'mainSetItem';
      }).length, " block(s), total ").concat(accumulatedDistInSet, "yds"),
      restSummary: "Varied"
    };
  }
  return {
    generatedSets: [],
    totalDistance: 0,
    strategySpecificSummary: "No blocks generated."
  };
}
function generateSet_PatternBased(remainingDistance, strategyConfig, restConfig, setFormattingConfig) {
  var setDefinitions = strategyConfig.setDefinitions,
    selectionLogic = strategyConfig.selectionLogic,
    fallbackStrategy = strategyConfig.fallbackStrategy; // Use setDefinitions
  var shuffledSetDefinitions = _.shuffle(setDefinitions);
  var viablePatterns = [];
  // console.log('[PatternBased] Initial remainingDistance:', remainingDistance);
  // console.log('[PatternBased] Shuffled setDefinitions:', JSON.stringify(shuffledSetDefinitions, null, 2));
  var _iterator4 = _createForOfIteratorHelper(shuffledSetDefinitions),
    _step4;
  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var setDef = _step4.value;
      // Iterate shuffledSetDefinitions
      // console.log('[PatternBased] Considering setDef:', JSON.stringify(setDef, null, 2));
      if (setDef.repScheme.type === 'dynamic' && setDef.distance) {
        // console.log('[PatternBased] Is dynamic');
        if (remainingDistance >= setDef.distance) {
          var _numReps = Math.floor(remainingDistance / setDef.distance);
          if (setDef.repScheme.maxReps) _numReps = Math.min(_numReps, setDef.repScheme.maxReps);
          if (setDef.repScheme.minReps) _numReps = Math.max(_numReps, setDef.repScheme.minReps);
          if (_numReps > 0 && _numReps * setDef.distance <= remainingDistance) {
            viablePatterns.push(_objectSpread2(_objectSpread2({}, setDef), {}, {
              // Includes original distance, rest, paceDesc, etc.
              reps: _numReps,
              // dist: setDef.distance, // Already in setDef
              totalDistance: _numReps * setDef.distance,
              // Corrected property name
              id: setDef.id || "".concat(_numReps, "x").concat(setDef.distance) // Use existing ID or format
            }));
          }
        }
      } else if (setDef.repScheme.type === 'fixed' && setDef.totalDistance) {
        // console.log('[PatternBased] Is fixed type');
        if (remainingDistance >= setDef.totalDistance) {
          // console.log('[PatternBased] Adding fixed setDef to viablePatterns:', JSON.stringify(setDef));
          // For fixed, reps and dist are already defined in setDef.repScheme.fixedReps and setDef.distance
          viablePatterns.push(_objectSpread2(_objectSpread2({}, setDef), {}, {
            reps: setDef.repScheme.fixedReps
          }));
        } else {
          // console.log('[PatternBased] Fixed setDef totalDistance too high:', setDef.totalDistance);
        }
      }
    }
    // console.log('[PatternBased] ViablePatterns:', JSON.stringify(viablePatterns, null, 2));
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }
  var bestFitSet = null;
  if (viablePatterns.length > 0) {
    // console.log('[PatternBased] Viable patterns found. SelectionLogic:', selectionLogic);
    if (selectionLogic === "maxAchievedDistance") {
      viablePatterns.sort(function (a, b) {
        if (b.totalDistance !== a.totalDistance) return b.totalDistance - a.totalDistance;
        // Approx original index for tie-breaking (now randomized due to shuffledSetDefinitions)
        // Ensure 'a' and 'b' passed to findIndex are from the original shuffledSetDefinitions if 'id' is not unique enough
        // or if viablePatterns objects are modified copies that break === identity.
        // However, given typical use, matching by 'id' should be robust enough.
        return shuffledSetDefinitions.findIndex(function (sd) {
          return sd.id === a.id;
        }) - shuffledSetDefinitions.findIndex(function (sd) {
          return sd.id === b.id;
        });
      });
      bestFitSet = viablePatterns[0];
    } else if (selectionLogic === "prioritizeMaxDistanceThenRandom") {
      var maxDist = 0;
      // Ensure using totalDistance, which is the correct property name from setDef
      viablePatterns.forEach(function (p) {
        if (p.totalDistance > maxDist) maxDist = p.totalDistance;
      });
      var bestDistancePatterns = viablePatterns.filter(function (p) {
        return p.totalDistance === maxDist;
      });
      if (bestDistancePatterns.length > 0) {
        bestFitSet = bestDistancePatterns[Math.floor(Math.random() * bestDistancePatterns.length)];
      }
    } else {
      bestFitSet = viablePatterns[0];
    }
  }
  if (!bestFitSet && fallbackStrategy && fallbackStrategy.setDefinitions && remainingDistance >= fallbackStrategy.minRepDistance) {
    // Check fallbackStrategy.setDefinitions
    // If fallbackStrategy.setDefinitions are derived from the main setDefinitions, they should be shuffled too.
    // Assuming they might be a distinct list, we shuffle them here if they exist.
    // If they are guaranteed to be a subset of the already shuffled main list, this specific shuffle might be redundant
    // but harmless. If they are a completely separate list, this is necessary.
    var shuffledFallbackSetDefinitions = fallbackStrategy.setDefinitions ? _.shuffle(fallbackStrategy.setDefinitions) : [];
    if (fallbackStrategy.type === "simpleRepsMaxDistance") {
      var bestFallbackOption = null;
      var maxFallbackYardage = 0;
      var _iterator5 = _createForOfIteratorHelper(shuffledFallbackSetDefinitions),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var fbSetDef = _step5.value;
          // Iterate shuffledFallbackSetDefinitions
          if (remainingDistance >= fbSetDef.distance) {
            var numReps = Math.floor(remainingDistance / fbSetDef.distance);
            if (fbSetDef.repScheme && fbSetDef.repScheme.maxReps) {
              // Assume fallback options are dynamic
              numReps = Math.min(numReps, fbSetDef.repScheme.maxReps);
            }
            if (fbSetDef.repScheme && fbSetDef.repScheme.minReps) {
              numReps = Math.max(numReps, fbSetDef.repScheme.minReps);
            }
            if (numReps > 0 && numReps * fbSetDef.distance <= remainingDistance) {
              var currentYardage = numReps * fbSetDef.distance;
              if (currentYardage > maxFallbackYardage) {
                maxFallbackYardage = currentYardage;
                bestFallbackOption = _objectSpread2(_objectSpread2({}, fbSetDef), {}, {
                  reps: numReps,
                  totalDistance: currentYardage,
                  // Corrected here
                  id: fbSetDef.id || "".concat(numReps, "x").concat(fbSetDef.distance, " (fallback)")
                });
                // console.log(`[FallbackDebug] Set bestFallbackOption: ${JSON.stringify(bestFallbackOption, null, 2)} with yardage ${currentYardage}`);
              }
            }
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      if (bestFallbackOption) bestFitSet = bestFallbackOption;
      // console.log(`[FallbackDebug] After loop, bestFallbackOption: ${JSON.stringify(bestFallbackOption, null, 2)}`);
    }
  }
  // console.log(`[FallbackDebug] Before final return, bestFitSet: ${JSON.stringify(bestFitSet, null, 2)}`);

  if (bestFitSet) {
    // console.log(`[FallbackDebug] bestFitSet IS valid, creating setInfo.`);
    var rest = bestFitSet.rest || getRestString(bestFitSet.distance, restConfig, bestFitSet.rest);
    var setInfo = {
      reps: bestFitSet.reps,
      dist: bestFitSet.distance,
      restString: rest,
      paceDesc: bestFitSet.paceDescription,
      activity: bestFitSet.activity || setFormattingConfig.defaultActivity || "swim",
      notes: bestFitSet.notes
    };
    return {
      generatedSets: [setInfo],
      totalDistance: bestFitSet.totalDistance,
      // Corrected from totalDist
      strategySpecificSummary: bestFitSet.id || "".concat(bestFitSet.reps, "x").concat(bestFitSet.distance),
      restSummary: rest,
      paceDescription: bestFitSet.paceDescription
    };
  }
  return {
    generatedSets: [],
    totalDistance: 0,
    strategySpecificSummary: "No pattern or fallback matched."
  };
}

// --- Main Generator Function ---
function generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, config) {
  var sets = [];
  var mainSetTotalDist = 0;
  var targetPacePer100 = 0;
  var descriptiveMessage = "";
  if (!config) {
    return {
      sets: sets,
      mainSetTotalDist: mainSetTotalDist,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: "Error: Workout configuration not provided."
    };
  }
  targetPacePer100 = calculateTargetPace(cssSecondsPer100, config.paceConfig);
  var getMinRepDistForType = function getMinRepDistForType(cfg) {
    if (!cfg || !cfg.strategyConfig) return (cfg === null || cfg === void 0 ? void 0 : cfg.minTotalDistanceForSet) || 0;
    var minDist = Infinity;
    if (cfg.strategyConfig.setDefinitions && cfg.strategyConfig.setDefinitions.length > 0) {
      cfg.strategyConfig.setDefinitions.forEach(function (sd) {
        if (sd.distance < minDist) minDist = sd.distance;
      });
    }
    // Check fallback definitions too, if they exist
    if (cfg.strategyConfig.fallbackStrategy && cfg.strategyConfig.fallbackStrategy.setDefinitions && cfg.strategyConfig.fallbackStrategy.setDefinitions.length > 0) {
      cfg.strategyConfig.fallbackStrategy.setDefinitions.forEach(function (sd) {
        if (sd.distance < minDist) minDist = sd.distance;
      });
    }
    // If still Infinity, means no distances found, use fallbackStrategy.minRepDistance or overall minTotalDistanceForSet
    if (minDist === Infinity) {
      var _cfg$strategyConfig$f;
      minDist = ((_cfg$strategyConfig$f = cfg.strategyConfig.fallbackStrategy) === null || _cfg$strategyConfig$f === void 0 ? void 0 : _cfg$strategyConfig$f.minRepDistance) || cfg.minTotalDistanceForSet || 0;
    }
    // Final fallback to minTotalDistanceForSet if all else fails or gives 0 but minTotalDistanceForSet is higher
    return Math.max(minDist, cfg.minTotalDistanceForSet || 0);
  };
  if (config.minTotalDistanceForSet && remainingDistanceForMainSet < config.minTotalDistanceForSet) {
    descriptiveMessage = formatDescriptiveMessage(config.descriptiveMessages.tooShort, {
      workoutTypeName: config.workoutTypeName,
      minRepDistForType: String(getMinRepDistForType(config)),
      // Updated to use the new logic
      remainingDistance: String(remainingDistanceForMainSet)
    });
    return {
      sets: sets,
      mainSetTotalDist: 0,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: descriptiveMessage
    };
  }
  var strategyResult;
  var strategyFnMap = {
    "bestFitSingleRepetition": generateSet_BestFitSingleRepetition,
    "closestFitGeneral": generateSet_ClosestFitGeneral,
    "targetYardageWithRepChoice": generateSet_TargetYardageRepChoice,
    "multiBlock": generateSet_MultiBlock,
    "patternBased": generateSet_PatternBased
  };
  var strategyFn = strategyFnMap[config.setGenerationStrategy];
  if (typeof strategyFn === 'function') {
    if (config.setGenerationStrategy === "patternBased") {
      strategyResult = strategyFn(remainingDistanceForMainSet, config.strategyConfig, config.restConfig, config.setFormatting);
    } else if (config.setGenerationStrategy === "multiBlock") {
      strategyResult = strategyFn(remainingDistanceForMainSet, config.strategyConfig, config.restConfig);
    } else {
      strategyResult = strategyFn(remainingDistanceForMainSet, config.strategyConfig, config.restConfig, energySystem, config.setFormatting);
    }
  } else {
    descriptiveMessage = "Error: Unknown/unimplemented strategy: ".concat(config.setGenerationStrategy || 'undefined');
    return {
      sets: sets,
      mainSetTotalDist: 0,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: descriptiveMessage
    };
  }
  if (strategyResult && strategyResult.generatedSets && strategyResult.generatedSets.length > 0 && strategyResult.totalDistance > 0) {
    mainSetTotalDist = strategyResult.totalDistance;
    strategyResult.generatedSets.forEach(function (item) {
      if (item.type === 'blockRestItem') {
        sets.push(item.text);
      } else {
        sets.push(formatSetString(item, energySystem, config.setFormatting));
      }
    });
    var paceSummaryText = "CSS";
    if (config.paceConfig) {
      var pc = config.paceConfig;
      if (pc.offset === 0 && !pc.randomRange) ; else if (pc.operator && (pc.offset || pc.randomRange)) {
        var basePaceDesc = "CSS ";
        var offsetPart = "";
        if (pc.offset) {
          offsetPart = "".concat(pc.operator).concat(pc.offset);
        }
        if (pc.randomRange) {
          var rangeEnd = pc.offset + pc.randomRange;
          if (pc.offset && Math.abs(rangeEnd) !== Math.abs(pc.offset)) {
            offsetPart += "-".concat(Math.abs(rangeEnd));
          } else if (!pc.offset) {
            offsetPart = "".concat(pc.operator, "0-").concat(Math.abs(pc.randomRange));
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
      restSummary: strategyResult.restSummary || "Varied rest"
    });
  } else {
    var _strategyResult;
    mainSetTotalDist = 0;
    descriptiveMessage = formatDescriptiveMessage(config.descriptiveMessages.fail, {
      workoutTypeName: config.workoutTypeName,
      energySystem: energySystem,
      remainingDistance: String(remainingDistanceForMainSet),
      details: ((_strategyResult = strategyResult) === null || _strategyResult === void 0 ? void 0 : _strategyResult.strategySpecificSummary) || "No sets generated by strategy."
    });
  }
  return {
    sets: sets,
    mainSetTotalDist: mainSetTotalDist,
    targetPacePer100: targetPacePer100,
    descriptiveMessage: descriptiveMessage
  };
}

// lib/data/mainSetConfigs.js - V3_SCHEMA_UPDATE_MARKER_CONFIGS

// Helper function for SP2 Rest (from MAX_SPRINT.js)
var getSp2RestString = function getSp2RestString(repDist) {
  var minSec, maxSec;
  if (repDist === 25) {
    minSec = 60;
    maxSec = 180;
  } else if (repDist === 50) {
    minSec = 180;
    maxSec = 300;
  } else {
    // Should not happen
    minSec = 60;
    maxSec = 120;
  }
  var totalSeconds = minSec + Math.floor(Math.random() * (maxSec - minSec + 1));
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;
  var restString = "";
  if (minutes > 0) restString += "".concat(minutes, "'");
  if (seconds > 0) restString += "".concat(seconds, "\"");else if (minutes === 0 && seconds === 0) restString = '10"';
  return "r".concat(restString);
};

// Helper function for SP1 Rest (from SPEED_ENDURANCE.js)
var getSp1Rest = function getSp1Rest(repDist) {
  var baseRestSeconds;
  if (repDist === 100) baseRestSeconds = 10;else if (repDist === 75) baseRestSeconds = 7.5;else if (repDist === 50) baseRestSeconds = 5;else if (repDist === 25) baseRestSeconds = 2.5;else baseRestSeconds = 5;
  var multiplier = 2 + Math.random();
  var restSeconds = Math.round(baseRestSeconds * multiplier / 5) * 5;
  restSeconds = Math.max(restSeconds, 5);
  if (repDist === 100) restSeconds = Math.max(restSeconds, 20);
  return "r".concat(restSeconds, "\"");
};

// Unified SetDefinition Schema (for reference in this file)
// {
//     id: String (optional),
//     distance: Number,
//     repScheme: {
//         type: "dynamic" | "fixed",
//         maxReps: Number (if type="dynamic"),
//         fixedReps: Number (if type="fixed"),
//         minReps: Number (optional for "dynamic")
//     },
//     rest: String (optional),
//     paceDescription: String (optional),
//     activity: String (optional, defaults to "swim"),
//     notes: String (optional),
//     totalDistance: Number (optional, for type="fixed")
// }

var ENDURANCE_BASE_CONFIG = {
  workoutTypeName: "EN1",
  minTotalDistanceForSet: 500,
  paceConfig: {
    baseMetric: "css",
    offset: 5,
    randomRange: 10,
    operator: "+"
  },
  setGenerationStrategy: "bestFitSingleRepetition",
  strategyConfig: {
    setDefinitions: [{
      distance: 500,
      repScheme: {
        type: "dynamic",
        maxReps: 12
      },
      activity: "swim/kick"
    }, {
      distance: 600,
      repScheme: {
        type: "dynamic",
        maxReps: 10
      },
      activity: "swim/kick"
    }, {
      distance: 700,
      repScheme: {
        type: "dynamic",
        maxReps: 8
      },
      activity: "swim/kick"
    }, {
      distance: 800,
      repScheme: {
        type: "dynamic",
        maxReps: 7
      },
      activity: "swim/kick"
    }, {
      distance: 900,
      repScheme: {
        type: "dynamic",
        maxReps: 6
      },
      activity: "swim/kick"
    }, {
      distance: 1000,
      repScheme: {
        type: "dynamic",
        maxReps: 6
      },
      activity: "swim/kick"
    }],
    selectionPreference: {
      tiebreakYardage: "preferShorterRepIfSameYardageThenMoreReps",
      shorterRepValue: 500
    }
  },
  restConfig: {
    type: "fixed",
    value: 'r60"'
  },
  setFormatting: {
    baseStructure: "{reps}x{dist} {activity} ({energySystem} focus) {rest}",
    defaultActivity: "swim/kick"
  },
  descriptiveMessages: {
    success: "EN1: {setSummary} ({energySystem}), CSS +5-15s/100m pace guide, 60\" rest.",
    tooShort: "EN1: Too short. Min rep distance {minRepDistForType}, available: {remainingDistance}.",
    fail: "EN1: Could not fit EN1 reps for {energySystem}. Available: {remainingDistance}."
  }
};
var GENERAL_ENDURANCE_CONFIG = {
  workoutTypeName: "General Endurance",
  minTotalDistanceForSet: 25,
  paceConfig: {
    baseMetric: "css",
    offset: 0,
    operator: "+"
  },
  setGenerationStrategy: "closestFitGeneral",
  strategyConfig: {
    setDefinitions: [{
      distance: 500,
      repScheme: {
        type: "dynamic",
        maxReps: Infinity
      }
    }, {
      distance: 400,
      repScheme: {
        type: "dynamic",
        maxReps: Infinity
      }
    }, {
      distance: 300,
      repScheme: {
        type: "dynamic",
        maxReps: Infinity
      }
    }, {
      distance: 200,
      repScheme: {
        type: "dynamic",
        maxReps: Infinity
      }
    }, {
      distance: 100,
      repScheme: {
        type: "dynamic",
        maxReps: Infinity
      }
    }, {
      distance: 50,
      repScheme: {
        type: "dynamic",
        maxReps: Infinity
      }
    }],
    minRepDistanceForFallback: 25,
    conservativeAdjustment: {
      enabled: true,
      usageThresholdFactor: 0.80,
      minRepDistance: 200,
      minReps: 3
    }
  },
  restConfig: {
    type: "distanceBased",
    values: {
      300: 'r45"',
      200: 'r30"',
      100: 'r20"',
      "default": 'r15"'
    }
  },
  setFormatting: {
    baseStructure: "{reps}x{dist} swim ({energySystem} focus) {rest}",
    defaultActivity: "swim"
  },
  descriptiveMessages: {
    success: "General Endurance ({energySystem}) default set. {setSummary}",
    tooShort: "General Endurance ({energySystem}) set - too short. Available: {remainingDistance}.",
    fail: "General Endurance ({energySystem}): Could not fit set. Available: {remainingDistance}."
  }
};
var MAX_SPRINT_CONFIG = {
  workoutTypeName: "SP2",
  minTotalDistanceForSet: 25,
  paceConfig: {
    baseMetric: "css",
    offset: 10,
    randomRange: 5,
    operator: "-"
  },
  setGenerationStrategy: "targetYardageWithRepChoice",
  strategyConfig: {
    setTargetDistanceMin: 300,
    setTargetDistanceMaxDefault: 600,
    setTargetDistanceMaxCap: 4500,
    setDefinitions: [{
      distance: 25,
      repScheme: {
        type: "dynamic",
        maxReps: Infinity
      },
      activity: "UW sprint",
      notes: "breath at wall"
    }, {
      distance: 50,
      repScheme: {
        type: "dynamic",
        maxReps: Infinity
      },
      activity: "UW sprint",
      notes: "breath at wall"
    }],
    repChoiceLogic: {
      preferDistance: 50,
      thresholdYardage: 150
    }
  },
  restConfig: {
    type: "customFunction",
    customFunction: getSp2RestString
  },
  setFormatting: {
    baseStructure: "{reps}x{dist} {activity} ({energySystem} focus, {notes}) {rest}",
    defaultActivity: "UW sprint"
  },
  descriptiveMessages: {
    success: "SP2: Lactate Production ({energySystem}), Near Max Effort. Set: {setSummary}. Total ~{totalDistance}yds.",
    tooShort: "SP2: Too short. Min rep 25. Available: {remainingDistance}.",
    fail: "SP2: Could not fit SP2 set. Available: {remainingDistance} (target yardage for SP2 is typically 300-600)."
  }
};
var SPEED_ENDURANCE_CONFIG = {
  workoutTypeName: "SP1",
  minTotalDistanceForSet: 25,
  paceConfig: {
    baseMetric: "css",
    offset: 3,
    randomRange: 2,
    operator: "-"
  },
  setGenerationStrategy: "multiBlock",
  strategyConfig: {
    setTargetDistanceMin: 400,
    setTargetDistanceMaxCap: 4500,
    targetYardagePerBlockApprox: 800,
    setDefinitions: [{
      distance: 25,
      repScheme: {
        type: "dynamic",
        maxReps: 16
      }
    }, {
      distance: 50,
      repScheme: {
        type: "dynamic",
        maxReps: 16
      }
    }, {
      distance: 75,
      repScheme: {
        type: "dynamic",
        maxReps: 16
      }
    }, {
      distance: 100,
      repScheme: {
        type: "dynamic",
        maxReps: 16
      }
    }],
    drills: ["swim", "kb", "FU", "HUHO"],
    interBlockRest: {
      minSeconds: 60,
      maxSeconds: 120,
      format: function format(seconds) {
        var minutes = Math.floor(seconds / 60);
        var secs = seconds % 60;
        var timeStr;
        if (minutes > 0) {
          timeStr = secs === 0 ? "".concat(minutes, "min") : "".concat(minutes, "min ").concat(secs, "s");
        } else {
          timeStr = "".concat(secs, "s");
        }
        return "".concat(timeStr, " rest between SP1 blocks");
      }
    }
  },
  restConfig: {
    type: "customFunction",
    customFunction: getSp1Rest
  },
  setFormatting: {
    baseStructure: "{reps}x{dist} {activity} ({energySystem} focus) {rest}"
  },
  descriptiveMessages: {
    success: "SP1: Lactate Tolerance ({energySystem}), CSS -3-5s. Total ~{totalDistance}yds.",
    tooShort: "SP1: Too short. Min rep 25. Available: {remainingDistance}.",
    fail: "SP1: Could not fit SP1 set. Available: {remainingDistance} (target yardage for SP1 is typically 400-800)."
  }
};
var THRESHOLD_DEVELOPMENT_CONFIG = {
  workoutTypeName: "EN3",
  minTotalDistanceForSet: 400,
  paceConfig: {
    baseMetric: "css",
    offset: 1,
    randomRange: 1,
    operator: "-"
  },
  setGenerationStrategy: "patternBased",
  strategyConfig: {
    setDefinitions: [{
      id: 'Nx400_css_r50',
      distance: 400,
      repScheme: {
        type: "dynamic",
        maxReps: 18
      },
      rest: 'r50"',
      paceDescription: 'CSS'
    }, {
      id: 'Nx500_css_r60',
      distance: 500,
      repScheme: {
        type: "dynamic",
        maxReps: 14
      },
      rest: 'r60"',
      paceDescription: 'CSS'
    }, {
      id: 'Nx600_css_r90',
      distance: 600,
      repScheme: {
        type: "dynamic",
        maxReps: 12
      },
      rest: 'r90"',
      paceDescription: 'CSS'
    }],
    selectionLogic: "maxAchievedDistance",
    fallbackStrategy: {
      type: "simpleRepsMaxDistance",
      setDefinitions: [{
        distance: 600,
        repScheme: {
          type: "dynamic",
          maxReps: 6
        },
        rest: 'r90"',
        paceDescription: 'CSS -1-2s'
      }, {
        distance: 500,
        repScheme: {
          type: "dynamic",
          maxReps: 6
        },
        rest: 'r60"',
        paceDescription: 'CSS -1-2s'
      }, {
        distance: 400,
        repScheme: {
          type: "dynamic",
          maxReps: 6
        },
        rest: 'r45"',
        paceDescription: 'CSS -1-2s'
      }],
      minRepDistance: 400
    }
  },
  restConfig: {
    type: "patternDefined"
  },
  setFormatting: {
    baseStructure: "{reps}x{dist} {energySystem} focus swim @ {paceDesc} {rest}",
    defaultActivity: "swim"
  },
  descriptiveMessages: {
    success: "EN3: {setSummary} ({energySystem}) @ {paceDescription}.",
    tooShort: "EN3: Too short for EN3 sets (min rep {minRepDistForType}). Available: {remainingDistance}.",
    fail: "EN3: Could not fit standard or fallback EN3 set for {energySystem}. Available: {remainingDistance}."
  }
};
var THRESHOLD_SUSTAINED_CONFIG = {
  workoutTypeName: "EN2",
  minTotalDistanceForSet: 100,
  paceConfig: {
    baseMetric: "css",
    offset: 0,
    operator: "+"
  },
  setGenerationStrategy: "patternBased",
  strategyConfig: {
    setDefinitions: [{
      id: '18x100_css_r10',
      distance: 100,
      repScheme: {
        type: 'fixed',
        fixedReps: 18
      },
      totalDistance: 1800,
      rest: 'r10"',
      paceDescription: 'CSS'
    }, {
      id: '10x200_css_r20',
      distance: 200,
      repScheme: {
        type: 'fixed',
        fixedReps: 10
      },
      totalDistance: 2000,
      rest: 'r20"',
      paceDescription: 'CSS'
    }, {
      id: 'Nx400_css_r40',
      distance: 400,
      repScheme: {
        type: 'dynamic',
        maxReps: 18
      },
      rest: 'r40"',
      paceDescription: 'CSS'
    }, {
      id: 'Nx500_css_r50',
      distance: 500,
      repScheme: {
        type: 'dynamic',
        maxReps: 14
      },
      rest: 'r50"',
      paceDescription: 'CSS'
    }, {
      id: 'Nx600_css_r60',
      distance: 600,
      repScheme: {
        type: 'dynamic',
        maxReps: 12
      },
      rest: 'r60"',
      paceDescription: 'CSS'
    }, {
      id: 'Nx800_css_r90',
      distance: 800,
      repScheme: {
        type: 'dynamic',
        maxReps: 8
      },
      rest: 'r90"',
      paceDescription: 'CSS'
    }, {
      id: 'Nx1000_css_r90',
      distance: 1000,
      repScheme: {
        type: 'dynamic',
        maxReps: 6
      },
      rest: 'r90"',
      paceDescription: 'CSS'
    }],
    selectionLogic: "prioritizeMaxDistanceThenRandom",
    fallbackStrategy: {
      type: "simpleRepsMaxDistance",
      setDefinitions: [{
        distance: 200,
        repScheme: {
          type: "dynamic",
          maxReps: 40
        },
        rest: 'r20"',
        paceDescription: 'CSS'
      }, {
        distance: 100,
        repScheme: {
          type: "dynamic",
          maxReps: 60
        },
        rest: 'r10"',
        paceDescription: 'CSS'
      }],
      minRepDistance: 100
    }
  },
  restConfig: {
    type: "patternDefined"
  },
  setFormatting: {
    baseStructure: "{reps}x{dist} {energySystem} focus swim @ {paceDesc} {rest}",
    defaultActivity: "swim"
  },
  descriptiveMessages: {
    success: "EN2: {setSummary} ({energySystem}) @ CSS.",
    tooShort: "EN2: Too short for EN2 sets. Available: {remainingDistance}.",
    fail: "EN2: Could not fit standard EN2 set for {energySystem}. Available: {remainingDistance}."
  }
};
var ALL_WORKOUT_CONFIGS = {
  ENDURANCE_BASE: ENDURANCE_BASE_CONFIG,
  GENERAL_ENDURANCE: GENERAL_ENDURANCE_CONFIG,
  MAX_SPRINT: MAX_SPRINT_CONFIG,
  SPEED_ENDURANCE: SPEED_ENDURANCE_CONFIG,
  THRESHOLD_DEVELOPMENT: THRESHOLD_DEVELOPMENT_CONFIG,
  THRESHOLD_SUSTAINED: THRESHOLD_SUSTAINED_CONFIG
};

// Further comments removed.

// lib/data/mainSets.js

// The individual functions are now replaced by calls to the generator

var ENDURANCE_BASE = function ENDURANCE_BASE(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
  return generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, ALL_WORKOUT_CONFIGS.ENDURANCE_BASE);
};
var GENERAL_ENDURANCE = function GENERAL_ENDURANCE(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
  return generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, ALL_WORKOUT_CONFIGS.GENERAL_ENDURANCE);
};
var MAX_SPRINT = function MAX_SPRINT(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
  return generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, ALL_WORKOUT_CONFIGS.MAX_SPRINT);
};
var SPEED_ENDURANCE = function SPEED_ENDURANCE(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
  return generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, ALL_WORKOUT_CONFIGS.SPEED_ENDURANCE);
};
var THRESHOLD_DEVELOPMENT = function THRESHOLD_DEVELOPMENT(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
  return generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, ALL_WORKOUT_CONFIGS.THRESHOLD_DEVELOPMENT);
};
var THRESHOLD_SUSTAINED = function THRESHOLD_SUSTAINED(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
  return generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, ALL_WORKOUT_CONFIGS.THRESHOLD_SUSTAINED);
};

// This object is used by other parts of the application to select a main set function.
// It now correctly points to the new wrapper functions.
var mainSetFunctions = {
  ENDURANCE_BASE: ENDURANCE_BASE,
  GENERAL_ENDURANCE: GENERAL_ENDURANCE,
  MAX_SPRINT: MAX_SPRINT,
  SPEED_ENDURANCE: SPEED_ENDURANCE,
  THRESHOLD_DEVELOPMENT: THRESHOLD_DEVELOPMENT,
  THRESHOLD_SUSTAINED: THRESHOLD_SUSTAINED
};

/**
 * Selects a warmup routine.
 * There's a 90% chance of selecting a warmup from the availableWarmups array,
 * and a 10% chance of selecting the noWarmupOption.
 *
 * @param {Array<Object>} availableWarmups - An array of warmup objects. Each object should have at least 'desc' and 'dist' properties.
 * @param {Object} noWarmupOption - An object representing the option of no warmup. Should have 'desc' and 'dist'.
 * @returns {Object} The selected warmup object.
 */
function selectWarmup(availableWarmups, noWarmupOption) {
  var useWarmup = Math.random() > 0.1; // 90% chance of including a warmup

  if (useWarmup && availableWarmups && availableWarmups.length > 0) {
    return availableWarmups[Math.floor(Math.random() * availableWarmups.length)];
  } else {
    return noWarmupOption;
  }
}

/**
 * Selects a cooldown routine randomly from the available options.
 *
 * @param {Array<Object>} availableCooldowns - An array of cooldown objects. Each object should have at least 'desc' and 'dist' properties.
 * @returns {Object|null} The selected cooldown object, or null if no cooldowns are available or an error occurs.
 */
function selectCooldown(availableCooldowns) {
  if (availableCooldowns && availableCooldowns.length > 0) {
    return availableCooldowns[Math.floor(Math.random() * availableCooldowns.length)];
  }
  return null; // Or return a default cooldown if preferred
}

/**
 * Generates the main set for a workout based on the energy system.
 *
 * @param {string} energySystem - The energy system focus (e.g., 'EN1', 'EN2').
 * @param {number} cssSecondsPer100 - Critical Swim Speed in seconds per 100 units.
 * @param {number} remainingDistanceForMainSet - The distance available for the main set.
 * @param {string} workoutType - The type of workout (e.g., 'THRESHOLD_SUSTAINED').
 * @param {string} energySystem - The energy system focus (e.g., 'EN1', 'EN2').
 * @param {number} cssSecondsPer100 - Critical Swim Speed in seconds per 100 units.
 * @param {number} remainingDistanceForMainSet - The distance available for the main set.
 * @param {Object} mainSetDefinitions - Object mapping workout types to generator functions.
 * @returns {{ sets: string[], mainSetTotalDist: number, targetPacePer100: number, descriptiveMessage?: string }}
 *           An object containing the sets, total distance of the main set, target pace,
 *           and an optional descriptive message for unknown or default systems.
 */
function generateMainSet(workoutType, energySystem, cssSecondsPer100, remainingDistanceForMainSet, mainSetDefinitions) {
  var generator = mainSetDefinitions[workoutType];
  var messageFromOuterScope;
  if (!generator) {
    messageFromOuterScope = "Unknown workout type: ".concat(workoutType, ". Defaulting to general endurance.");
    generator = mainSetDefinitions['GENERAL_ENDURANCE'];
  }

  // The generator function now expects energySystem as its first param.
  var mainSetOutput = generator(energySystem, cssSecondsPer100, remainingDistanceForMainSet);

  // Fallback condition: if the selected generator (not GENERAL_ENDURANCE) produced a very small set
  if (mainSetOutput.mainSetTotalDist < 100 && remainingDistanceForMainSet > 100 && workoutType !== 'GENERAL_ENDURANCE') {
    var fallbackMessage = "(Fallback to general endurance due to low generated distance for selected workout type).";
    var originalMessage = mainSetOutput.descriptiveMessage; // Message from the original, tiny set
    mainSetOutput = mainSetDefinitions['GENERAL_ENDURANCE'](energySystem, cssSecondsPer100, remainingDistanceForMainSet); // Rerun with GENERAL_ENDURANCE

    // Construct descriptive message for fallback
    var finalFallbackMessage = fallbackMessage;
    if (originalMessage) {
      // If the original (tiny) set had a message
      finalFallbackMessage = originalMessage + " " + fallbackMessage;
    } else if (mainSetOutput.descriptiveMessage) {
      // If GENERAL_ENDURANCE set has a message
      finalFallbackMessage = fallbackMessage + " " + mainSetOutput.descriptiveMessage;
    }
    mainSetOutput.descriptiveMessage = finalFallbackMessage;
  } else {
    // No fallback, or it was a direct 'GENERAL_ENDURANCE' call.
    // If messageFromOuterScope was set (i.e., unknown workout type), it takes precedence
    // unless the generator provided its own more specific message.
    if (messageFromOuterScope) {
      if (!mainSetOutput.descriptiveMessage) {
        mainSetOutput.descriptiveMessage = messageFromOuterScope;
      } else {
        // If generator (GENERAL_ENDURANCE in this case) set a message, and it was an unknown type,
        // combine or prioritize. For now, "Unknown type" message is more specific to the situation.
        mainSetOutput.descriptiveMessage = messageFromOuterScope + " Original generator message: " + mainSetOutput.descriptiveMessage;
      }
    } else if (workoutType === 'GENERAL_ENDURANCE' && !mainSetOutput.descriptiveMessage) {
      // If it was a direct 'GENERAL_ENDURANCE' call and the generator provided no message (unlikely with current data)
      mainSetOutput.descriptiveMessage = "General Endurance (".concat(energySystem, ") set.");
    }
  }
  return mainSetOutput;
}
var workoutFunctions = {
  selectWarmup: selectWarmup,
  selectCooldown: selectCooldown,
  generateMainSet: generateMainSet
};

// Helper function to convert MM:SS time string to total seconds per 100 units
function parseCssTimeToSeconds(cssTimeStr) {
  if (typeof cssTimeStr !== 'string') {
    return null;
  }
  var parts = cssTimeStr.split(':');
  if (parts.length === 2) {
    var minutes = parseInt(parts[0], 10);
    var seconds = parseFloat(parts[1]);
    if (isNaN(minutes) || isNaN(seconds)) {
      return null;
    }
    return minutes * 60 + seconds;
  }
  return null; // Invalid format
}

// Helper function to format total seconds per 100 units back to MM:SS
function formatSecondsToMmSs(totalSeconds) {
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = (totalSeconds % 60).toFixed(1); // One decimal for seconds
  return "".concat(minutes, ":").concat(seconds < 10 ? '0' : '').concat(seconds);
}

/**
 * Generates a random workout based on distance, energy system, and CSS time.
 * @param {number} totalDistanceYards - The approximate total desired workout distance in yards.
 * @param {string} energySystem - The energy system focus (e.g., 'EN1', 'EN2', 'EN3', 'SP1', 'SP2').
 * @param {string} cssTimeMmSs - The Critical Swim Speed in MM:SS format (e.g., '1:10').
 * @param {string} workoutType - The type of workout (e.g., 'threshold', 'anaerobic').
 * @returns {string} A formatted string describing the generated workout.
 */
function generateWorkout$1(totalDistanceYards, energySystem, cssTimeMmSs, workoutType) {
  var VERY_SHORT_WORKOUT_THRESHOLD = 600; // yards
  // noWarmupOption is imported and can be used directly or cloned if description needs change for this specific case
  // const noWarmupForShortOption = { ...noWarmupOption, desc: "No warmup (short workout)" };

  var cssSecondsPer100 = parseCssTimeToSeconds(cssTimeMmSs);
  if (cssSecondsPer100 === null) {
    return "Error: Invalid CSS time format. Please use MM:SS (e.g., '1:10').";
  }
  var workoutDetails = [];
  var currentDistanceCovered = 0;
  var mainSetUnits = "yards"; // Assuming SCY based on sources unless specified otherwise [7, 9, 16]

  // --- 1. Warmup Selection ---
  var selectedWarmup;
  if (totalDistanceYards < VERY_SHORT_WORKOUT_THRESHOLD) {
    selectedWarmup = _objectSpread2(_objectSpread2({}, noWarmupOption), {}, {
      desc: "No warmup (short workout)"
    });
  } else {
    // Re-introducing adaptive warmup logic for non-very-short workouts, with the specified modification
    selectedWarmup = workoutFunctions.selectWarmup(warmups, noWarmupOption); // Initial selection
    if (selectedWarmup && selectedWarmup.dist > 0) {
      var minMainSetThreshold = 200;
      var maxAllowedWarmupDist = totalDistanceYards - minMainSetThreshold;

      // Apply the more stringent percentage cap: 0.4 (40%) instead of 0.6
      maxAllowedWarmupDist = Math.min(maxAllowedWarmupDist, totalDistanceYards * 0.4);
      if (maxAllowedWarmupDist < 0 && totalDistanceYards > 0) {
        maxAllowedWarmupDist = totalDistanceYards * 0.4; // Fallback for small total distances if threshold makes it negative
        // This 0.4 is different from the one above.
        // Let's keep it as it was for this specific fallback:
        // maxAllowedWarmupDist = totalDistanceYards * 0.4; // This logic was for very small total distances
        // The logic from file before reset was:
        // if (maxAllowedWarmupDist < 0 && totalDistanceYards > 0) { maxAllowedWarmupDist = totalDistanceYards * 0.4; }
        // This specific 0.4 should remain if it's for the negative guard, distinct from the primary cap.
        // Re-evaluating based on typical structure: the primary cap (now 0.4) applies first.
        // Then, specific conditions for very small distances adjust if it results in negative or too small.
        // The previous adaptive logic was:
        // maxAllowedWarmupDist = Math.min(maxAllowedWarmupDist, totalDistanceYards * 0.6); // This is now 0.4
        // if (maxAllowedWarmupDist < 0 && totalDistanceYards > 0) { maxAllowedWarmupDist = totalDistanceYards * 0.4; }
        // The above line (totalDistanceYards * 0.4) was a fallback if the (totalDistanceYards - minMainSetThreshold) was negative.
        // It seems the logic should be:
        // 1. max = total - threshold
        // 2. max = min(max, total * NEW_PRIMARY_CAP (0.4))
        // 3. if max < 0 (because total was small), max = total * FALLBACK_CAP_FOR_SMALL_TOTAL (e.g. 0.4 or 0.5)
        // 4. if max < 50 (and total >=50), max = 50.
        // Let's stick to the prompt's direct change on the percentage line first.
        // The other parts of the adaptive logic are:
      } // End of the "maxAllowedWarmupDist < 0" check

      if (maxAllowedWarmupDist < 50 && totalDistanceYards >= 50) {
        maxAllowedWarmupDist = 50;
      }
      // Add a final guard if maxAllowedWarmupDist somehow ended up negative (e.g. if totalDistanceYards was < 50 but > 0)
      if (maxAllowedWarmupDist < 0) maxAllowedWarmupDist = 0;
      if (selectedWarmup.dist > maxAllowedWarmupDist) {
        var suitableWarmups = warmups.filter(function (wu) {
          return wu.dist <= maxAllowedWarmupDist && wu.dist > 0;
        });
        if (suitableWarmups.length > 0) {
          selectedWarmup = suitableWarmups[Math.floor(Math.random() * suitableWarmups.length)];
        } else {
          selectedWarmup = noWarmupOption;
        }
      }
    } else if (!selectedWarmup || selectedWarmup.dist === 0) {
      selectedWarmup = noWarmupOption;
    }
  }
  if (selectedWarmup) {
    workoutDetails.push("WU: ".concat(selectedWarmup.desc));
    currentDistanceCovered += selectedWarmup.dist;
  }

  // --- 2. Main Set Generation ---
  var mainSetDescription = "Main Set:";
  var sets = [];
  var mainSetTotalDist = 0;
  var targetPacePer100;
  var remainingDistanceForMainSet = totalDistanceYards - currentDistanceCovered;

  // Map energySystem to workoutType keys
  var energySystemToWorkoutType = {
    'EN1': 'ENDURANCE_BASE',
    'EN2': 'THRESHOLD_SUSTAINED',
    'EN3': 'THRESHOLD_DEVELOPMENT',
    'SP1': 'SPEED_ENDURANCE',
    'SP2': 'MAX_SPRINT'
    // Add other mappings if necessary, or a default
  };
  var internalWorkoutType = energySystemToWorkoutType[energySystem.toUpperCase()];
  if (!internalWorkoutType) {
    // console.warn(`Unknown energySystem: ${energySystem}. Defaulting to GENERAL_ENDURANCE if workoutType param is also not specific.`);
    // If the original workoutType parameter was provided and is valid, it could be used.
    // However, the new guidelines are driven by EN1, EN2 etc.
    // So, if energySystem doesn't map, we might default or rely on the generateMainSet's default.
    // For now, if energySystem doesn't map, internalWorkoutType will be undefined,
    // and generateMainSet will default to GENERAL_ENDURANCE.
    // The original 'workoutType' parameter from generateWorkout's signature is still available if needed as a fallback here.
    // Let's make it explicit: if energySystem mapping fails, use the passed 'workoutType' parameter.
    // If that is also undefined, generateMainSet handles the GENERAL_ENDURANCE default.
    if (workoutType) {
      // workoutType is the original parameter of generateWorkout
      internalWorkoutType = workoutType;
    }
    // If internalWorkoutType is still undefined, generateMainSet's default to GENERAL_ENDURANCE will occur.
  }

  // const mainSetResult = workoutComponents.generateMainSet(workoutType, energySystem, cssSecondsPer100, remainingDistanceForMainSet, mainSetFunctions);
  // Replace with:
  var mainSetResult = workoutFunctions.generateMainSet(internalWorkoutType, energySystem, cssSecondsPer100, remainingDistanceForMainSet, mainSetFunctions);
  sets = mainSetResult.sets;
  mainSetTotalDist = mainSetResult.mainSetTotalDist;
  targetPacePer100 = mainSetResult.targetPacePer100;
  if (mainSetResult.descriptiveMessage) {
    mainSetDescription += " ".concat(mainSetResult.descriptiveMessage);
  }
  workoutDetails.push(mainSetDescription);
  sets.forEach(function (set) {
    workoutDetails.push("  - ".concat(set));
  });
  currentDistanceCovered += mainSetTotalDist;

  // --- 3. Cool-down Selection ---
  var selectedCooldown;
  var noCooldownForShortOption = {
    desc: "No cooldown (short workout)",
    dist: 0,
    type: "none"
  };
  if (totalDistanceYards < VERY_SHORT_WORKOUT_THRESHOLD) {
    selectedCooldown = noCooldownForShortOption;
  } else {
    // Re-introducing adaptive cooldown logic with the specified modification
    var generalNoCooldownOption = {
      desc: "No cooldown",
      dist: 0,
      type: "none"
    }; // General purpose
    var distanceAfterMainSet = currentDistanceCovered;
    var distanceToTarget = totalDistanceYards - distanceAfterMainSet;
    if (distanceAfterMainSet >= totalDistanceYards - 50) {
      selectedCooldown = generalNoCooldownOption;
    } else {
      // Apply the more stringent buffer: 25 instead of 75
      var suitableCooldowns = cooldowns.filter(function (cd) {
        return cd.dist <= distanceToTarget + 25;
      });
      if (suitableCooldowns.length > 0) {
        selectedCooldown = suitableCooldowns[Math.floor(Math.random() * suitableCooldowns.length)];
      } else {
        selectedCooldown = generalNoCooldownOption;
      }
    }
  }
  if (selectedCooldown) {
    workoutDetails.push("CD: ".concat(selectedCooldown.desc));
    currentDistanceCovered += selectedCooldown.dist;
  }

  // --- 4. Final Details ---
  workoutDetails.push("\nTotal estimated distance: ".concat(currentDistanceCovered, " ").concat(mainSetUnits));
  workoutDetails.push("CSS: ".concat(cssTimeMmSs));
  workoutDetails.push("Workout Type: ".concat(workoutType)); // Added Workout Type
  workoutDetails.push("Energy System Focus: ".concat(energySystem.toUpperCase()));
  // A rough estimate of average pace, as true average depends on actual interval times and rest
  workoutDetails.push("Estimated AVG pace for main set: ".concat(formatSecondsToMmSs(targetPacePer100), " / 100 ").concat(mainSetUnits));
  return workoutDetails.join('\n');
}

// --- Example Usage ---
// console.log(generateWorkout(3000, 'EN3', '1:20'));
// console.log(generateWorkout(2000, 'SP1', '1:10'));
// console.log(generateWorkout(1500, 'SP2', '1:15'));
// console.log(generateWorkout(2500, 'EN2', '1:12'));
// console.log(generateWorkout(1800, 'EN1', '1:25'));

function getThingViaTimeLimit(key, secondsLeft, things) {
  var number = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
  var filteredThings = _.filter(things, function (thing) {
    return thing[key] * number <= secondsLeft;
  });
  return _.sample(filteredThings);
}

var swims = [
	{
		name: "HUHO",
		interval: 1,
		time: 25
	},
	{
		name: "HOHU",
		interval: 1,
		time: 25
	},
	{
		name: "FU",
		interval: 1,
		time: 30
	},
	{
		name: "Swim",
		interval: 1,
		time: 20
	},
	{
		name: "Kick",
		interval: 2,
		time: 45
	},
	{
		name: "OU",
		interval: 2,
		time: 50
	},
	{
		name: "UO",
		interval: 2,
		time: 50
	},
	{
		name: "OUO",
		interval: 3,
		time: 70
	},
	{
		name: "UOU",
		interval: 3,
		time: 75
	},
	{
		name: "TOFU",
		interval: 4,
		time: 100
	}
];

function repeatIntervals(secondsLeft, generatedPattern) {
  if (secondsLeft < 20) {
    // console.log(`weird amount of time left: ${secondsLeft}. returning original pattern`);
    return generatedPattern;
  }
  var seconds = 0;
  var selectedSwim = getThingViaTimeLimit("time", secondsLeft, swims);

  // console.log(`repeating interval of type ${selectedSwim.name}`)

  while (seconds + selectedSwim.time <= secondsLeft) {
    var timeLeft = secondsLeft - seconds;
    var maxRepetition = Math.floor(timeLeft / selectedSwim.time);

    // attempt to keep max length 200 or less
    maxRepetition = maxRepetition * selectedSwim.interval > 40 ? Math.floor(40 / selectedSwim.interval) : maxRepetition;
    var intervalLength = _.random(1, maxRepetition);
    var secondsToAdd = selectedSwim.time * intervalLength;

    // console.log('adding swim', selectedSwim);

    seconds += secondsToAdd;
    generatedPattern.seconds += secondsToAdd;
    generatedPattern.intervals.push({
      type: selectedSwim.name,
      length: selectedSwim.interval * 25 * intervalLength,
      number: 1,
      time: secondsToAdd
    });
  }
  return generatedPattern;
}

function getSwimByLength(secondsLeft, intervalLength, number) {
  if (secondsLeft < 20 * number) {
    // console.log(`weird amount of time left: ${secondsLeft}. returning null`);
    return null;
  }
  var selectSwim;
  var numThings = 0;
  var filteredSwims = _.cloneDeep(swims);
  while (!selectSwim) {
    numThings++;
    selectSwim = _.sample(filteredSwims);
    if (selectSwim.time * number > secondsLeft) {
      // console.log(`swim too long ${selectSwim.time} ${number} ${secondsLeft}`);
      filteredSwims = _.filter(filteredSwims, function (swim) {
        return swim.time < selectSwim.time;
      });
      selectSwim = null;
    } else if (selectSwim.interval > intervalLength || intervalLength % selectSwim.interval !== 0) {
      // console.log(`interval too long ${selectSwim.interval} ${intervalLength}`);
      filteredSwims = _.filter(filteredSwims, function (swim) {
        return swim.interval < selectSwim.interval;
      });
      selectSwim = null;
    }
    if (numThings > 20) {
      throw new Error("fuck ".concat(secondsLeft, " ").concat(intervalLength, " ").concat(number));
    }
  }
  return selectSwim;
}
function createSwimGroupCount(selectedPattern) {
  return _.reduce(selectedPattern.pattern, function (result, set) {
    var swimLength = set.interval[1];
    if (!result[set.group]) {
      result[set.group] = {
        number: 1,
        intervalLength: swimLength
      };
    } else {
      result[set.group].number += 1;
      result[set.group].intervalLength = _.min([result[set.group].intervalLength, swimLength]);
    }
    return result;
  }, {});
}
function mapSwimGroupsToSwims(secondsLeft, selectedPattern, groupsWithCount) {
  var groupsWithSwim = {};
  var sets = selectedPattern.pattern.length;

  // Find a swim which will fit the pattern and the time remaining
  _.forEach(groupsWithCount, function (groupSize, key) {
    var intervalSize = selectedPattern.intervalSize;
    var otherSetTimes = (sets - groupSize.number) * intervalSize * 20;
    var selectedSwim = getSwimByLength(secondsLeft - otherSetTimes, groupSize.intervalLength, groupSize.number * intervalSize);
    groupsWithSwim[key] = selectedSwim;
  });
  return groupsWithSwim;
}
function createSwimsFromPattern(secondsLeft, generatedPattern, selectedPattern) {
  if (secondsLeft < 20) {
    // console.log(`weird amount of time left: ${secondsLeft}. returning original pattern`);
    return generatedPattern;
  }
  var groupsWithCount = createSwimGroupCount(selectedPattern);
  var groupsWithSwim = mapSwimGroupsToSwims(secondsLeft, selectedPattern, groupsWithCount);

  // once we've figured out which swims go where, generate the intervals
  _.forEach(selectedPattern.pattern, function (pattern) {
    var selectedSwim = groupsWithSwim[pattern.group];
    var numIntervals = pattern.interval[0];
    var swimLength = pattern.interval[1];

    // Some swims are > 1 lap
    var intervalMultiplier = swimLength / selectedSwim.interval;
    var totalSwimTime = selectedSwim.time * numIntervals * intervalMultiplier;
    generatedPattern.seconds += totalSwimTime;
    generatedPattern.intervals.push({
      type: selectedSwim.name,
      length: swimLength * 25,
      number: numIntervals,
      time: selectedSwim.time * intervalMultiplier
    });
  });
  return generatedPattern;
}

function isSameType(intervalA, intervalB) {
  return intervalA.type === intervalB.type && intervalA.length === intervalB.length && intervalA.time === intervalB.time;
}
function doubleLengths(pattern) {
  // console.log('doubleLengths');
  pattern.seconds *= 2;
  _.forEach(pattern.intervals, function (interval) {
    interval.length *= 2;
    interval.time *= 2;
  });
}
function doubleIntervals(pattern) {
  // console.log('doubleIntervals');
  pattern.seconds *= 2;
  _.forEach(pattern.intervals, function (interval) {
    interval.number *= 2;
  });
}
function condenseWorkout(pattern) {
  pattern.intervals = pattern.intervals.reduce(function (memo, interval) {
    var intervalsLength = memo.length;
    if (intervalsLength === 0) {
      memo.push(interval);
      return memo;
    }
    if (isSameType(memo[intervalsLength - 1], interval)) {
      // console.log('condensing', memo[intervalsLength - 1], interval);
      memo[intervalsLength - 1].number += interval.number;
    } else {
      memo.push(interval);
    }
    return memo;
  }, []);

  // console.log(pattern);

  return pattern;
}
function generatePattern(seconds) {
  var generatedPattern = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    seconds: 0,
    intervals: []
  };
  if (seconds < 20) {
    // console.log(`weird amount of time left: ${seconds}. returning generated pattern`);
    return generatedPattern;
  }

  // console.log('generatePattern');

  var timeLeft = seconds - generatedPattern.seconds;
  var selectedPattern = getThingViaTimeLimit("minTime", timeLeft, patterns);

  // console.log(`attempting to generate ${selectedPattern.name} pattern, which needs ${selectedPattern.minTime}, and has ${timeLeft}`)

  if (selectedPattern.repeat === true) {
    return repeatIntervals(timeLeft, generatedPattern);
  } else {
    return createSwimsFromPattern(timeLeft, generatedPattern, selectedPattern);
  }
}
function generateWorkout(seconds) {
  if (!seconds) {
    throw new Error('Give me time!');
  }
  var pattern = generatePattern(seconds);
  while (pattern.seconds < seconds / 2 && pattern.seconds >= 20) {
    switch (_.random(1, 3)) {
      case 1:
        doubleLengths(pattern);
        break;
      case 2:
        doubleIntervals(pattern);
        break;
      case 3:
        // add new workout to pattern
        generatePattern(seconds, pattern);
        break;
    }
  }
  while (seconds - pattern.seconds >= 20) {
    generatePattern(seconds, pattern);
  }
  pattern = condenseWorkout(pattern);
  return pattern;
}

export { generateWorkout$1 as generateCssWorkout, generatePattern, generateWorkout };
//# sourceMappingURL=swim-generator.es6.js.map
