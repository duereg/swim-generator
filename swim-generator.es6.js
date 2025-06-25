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
var NO_WARM_UP_BITCHES = {
  desc: "No warmup bitches",
  dist: 0,
  type: "none"
}; //[1]

/**
 * Selects a warmup routine.
 * There's a 90% chance of selecting a warmup from the availableWarmups array,
 * and a 10% chance of selecting the noWarmupOption.
 *
 * @param {Array<Object>} availableWarmups - An array of warmup objects. Each object should have at least 'desc' and 'dist' properties.
 * @param {Object} noWarmupOption - An object representing the option of no warmup. Should have 'desc' and 'dist'.
 * @returns {Object} The selected warmup object.
 */
function selectWarmup() {
  var useWarmup = Math.random() > 0.1; // 90% chance of including a warmup

  if (useWarmup) {
    return warmups[Math.floor(Math.random() * warmups.length)];
  } else {
    return NO_WARM_UP_BITCHES;
  }
}
function generateWarmup(totalDistanceYards, shortWorkoutThreshold) {
  var selectedWarmup;
  if (totalDistanceYards < shortWorkoutThreshold) {
    selectedWarmup = _objectSpread2(_objectSpread2({}, NO_WARM_UP_BITCHES), {}, {
      desc: "No warmup (short workout)"
    });
  } else {
    selectedWarmup = selectWarmup();
    if (selectedWarmup && selectedWarmup.dist > 0) {
      var minMainSetThreshold = 200;
      var maxAllowedWarmupDist = totalDistanceYards - minMainSetThreshold;

      // Apply the more stringent percentage cap: 0.4 (40%) instead of 0.6
      maxAllowedWarmupDist = Math.min(maxAllowedWarmupDist, totalDistanceYards * 0.4);
      if (maxAllowedWarmupDist < 0 && totalDistanceYards > 0) {
        maxAllowedWarmupDist = totalDistanceYards * 0.4; // Fallback for small total distances if threshold makes it negative
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
          selectedWarmup = NO_WARM_UP_BITCHES;
        }
      }
    } else if (!selectedWarmup || selectedWarmup.dist === 0) {
      selectedWarmup = NO_WARM_UP_BITCHES;
    }
  }
  return selectedWarmup;
}

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
  structure = structure.trim().replace(/\s\s+/g, ' ').replace(/\s\(@/g, ' @').replace(/\s\(\s*,/g, ' (').replace(/,\s*\)/g, ')').replace(/\(\s*\)/g, ''); // Clean up
  if (setInfo.setRest === "rest 0 seconds") {
    return structure;
  } else {
    return structure + "\n  - " + setInfo.setRest;
  }
}

// --- Main Generator Function ---
function generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, strategyConfig) {
  var sets = [];
  var mainSetTotalDist = 0;
  var targetPacePer100 = 0;
  var descriptiveMessage = "";
  if (!strategyConfig) {
    return {
      sets: sets,
      mainSetTotalDist: mainSetTotalDist,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: "Error: Workout configuration not provided."
    };
  }
  targetPacePer100 = calculateTargetPace(cssSecondsPer100, strategyConfig.paceConfig);
  var strategyResult = generateSet(strategyConfig, remainingDistanceForMainSet);
  var paceDescription = generatePaceSummary(strategyConfig);
  if (strategyResult && strategyResult.generatedSets && strategyResult.generatedSets.length > 0 && strategyResult.totalDistance > 0) {
    mainSetTotalDist = strategyResult.totalDistance;
    strategyResult.generatedSets.forEach(function (item) {
      sets.push(formatSetString(item, energySystem, strategyConfig.setFormatting));
    });
    descriptiveMessage = formatDescriptiveMessage(strategyConfig.descriptiveMessages.success, {
      workoutTypeName: strategyConfig.workoutTypeName,
      setSummary: strategyResult.strategySpecificSummary || "Set generated",
      energySystem: energySystem,
      totalDistance: String(mainSetTotalDist),
      paceDescription: paceDescription
    });
  } else {
    mainSetTotalDist = 0;
    descriptiveMessage = formatDescriptiveMessage(strategyConfig.descriptiveMessages.fail, {
      workoutTypeName: strategyConfig.workoutTypeName,
      energySystem: energySystem,
      totalDistance: String(remainingDistanceForMainSet),
      setSummary: (strategyResult === null || strategyResult === void 0 ? void 0 : strategyResult.strategySpecificSummary) || "No sets generated by strategy.",
      paceDescription: paceDescription
    });
  }
  return {
    sets: sets,
    mainSetTotalDist: mainSetTotalDist,
    targetPacePer100: targetPacePer100,
    descriptiveMessage: descriptiveMessage
  };
}
function generatePaceSummary(strategyConfig) {
  var paceSummaryText = "CSS";
  if (strategyConfig && strategyConfig.paceConfig) {
    var pc = strategyConfig.paceConfig;
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
  return paceSummaryText;
}
function generateSet(strategyConfig, setDistance) {
  var remainingDistance = setDistance;
  var setDefinitions = strategyConfig.setDefinitions;
  var shuffledSetDefinitions = _.shuffle(setDefinitions);
  var output = {
    generatedSets: [],
    totalDistance: 0,
    //bestOption.totalYardage,
    strategySpecificSummary: "" //`${bestOption.reps}x${chosenSetDef.distance}` 
  };
  var _iterator = _createForOfIteratorHelper(shuffledSetDefinitions),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var setDef = _step.value;
      // Iterate over shuffledSetDefinitions
      var currentDist = setDef.distance;
      if (setDef.repScheme.type === "dynamic" && remainingDistance >= currentDist) {
        var currentReps = Math.floor(remainingDistance / currentDist);
        if (currentReps === 0) continue;
        var maxReps = setDef.repScheme.maxReps || Infinity;
        currentReps = Math.min(currentReps, maxReps);
        if (currentReps > 0) {
          var currentTotalYardage = currentReps * currentDist;
          remainingDistance -= currentTotalYardage;
          var rest = "r".concat(setDef.rest);
          var setInfo = {
            reps: currentReps,
            dist: setDef.distance,
            restString: rest,
            activity: setDef.activity || strategyConfig.setFormatting.defaultActivity || "kick",
            setRest: "rest ".concat(strategyConfig.setRest, " seconds"),
            rest: rest
          };
          output.generatedSets.push(setInfo);
          output.totalDistance += currentTotalYardage;
          output.strategySpecificSummary += "".concat(currentReps, "x").concat(setDef.distance, "\n");
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (output.generatedSets.length) {
    return output;
  }
  return {
    generatedSets: [],
    totalDistance: 0,
    strategySpecificSummary: "No suitable reps found."
  };
}

var ENDURANCE_BASE_CONFIG = {
  workoutTypeName: "EN1",
  minTotalDistanceForSet: 500,
  paceConfig: {
    baseMetric: "css",
    offset: 5,
    randomRange: 10,
    operator: "+"
  },
  setDefinitions: [{
    distance: 500,
    repScheme: {
      type: "dynamic",
      maxReps: 8
    },
    activity: "swim/kick",
    rest: 60
  }, {
    distance: 600,
    repScheme: {
      type: "dynamic",
      maxReps: 6
    },
    activity: "swim/kick",
    rest: 60
  }, {
    distance: 700,
    repScheme: {
      type: "dynamic",
      maxReps: 5
    },
    activity: "swim/kick",
    rest: 60
  }, {
    distance: 800,
    repScheme: {
      type: "dynamic",
      maxReps: 4
    },
    activity: "swim/kick",
    rest: 60
  }, {
    distance: 900,
    repScheme: {
      type: "dynamic",
      maxReps: 3
    },
    activity: "swim/kick",
    rest: 60
  }, {
    distance: 1000,
    repScheme: {
      type: "dynamic",
      maxReps: 2
    },
    activity: "swim/kick",
    rest: 60
  }],
  setRest: 0,
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
  paceConfig: {
    baseMetric: "css",
    offset: 0,
    operator: "+"
  },
  setDefinitions: [{
    distance: 500,
    repScheme: {
      type: "dynamic",
      maxReps: Infinity
    },
    rest: 60
  }, {
    distance: 400,
    repScheme: {
      type: "dynamic",
      maxReps: Infinity
    },
    rest: 60
  }, {
    distance: 300,
    repScheme: {
      type: "dynamic",
      maxReps: Infinity
    },
    rest: 45
  }, {
    distance: 200,
    repScheme: {
      type: "dynamic",
      maxReps: Infinity
    },
    rest: 30
  }, {
    distance: 100,
    repScheme: {
      type: "dynamic",
      maxReps: Infinity
    },
    rest: 20
  }, {
    distance: 50,
    repScheme: {
      type: "dynamic",
      maxReps: Infinity
    },
    rest: 15
  }],
  setRest: 0,
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
  paceConfig: {
    baseMetric: "css",
    offset: 10,
    randomRange: 5,
    operator: "-"
  },
  setDefinitions: [{
    distance: 25,
    repScheme: {
      type: "dynamic",
      maxReps: 20
    },
    activity: "UW sprint",
    notes: "breath at wall",
    rest: 60
  }, {
    distance: 50,
    repScheme: {
      type: "dynamic",
      maxReps: 10
    },
    activity: "UW sprint",
    notes: "breath at wall",
    rest: 120
  }],
  setRest: 60 * 5,
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
  paceConfig: {
    baseMetric: "css",
    offset: 3,
    randomRange: 2,
    operator: "-"
  },
  setDefinitions: [{
    distance: 25,
    repScheme: {
      type: "dynamic",
      maxReps: 32
    },
    rest: 20
  }, {
    distance: 50,
    repScheme: {
      type: "dynamic",
      maxReps: 16
    },
    rest: 30
  }, {
    distance: 75,
    repScheme: {
      type: "dynamic",
      maxReps: 12
    },
    rest: 40
  }, {
    distance: 100,
    repScheme: {
      type: "dynamic",
      maxReps: 8
    },
    rest: 45
  }, {
    distance: 200,
    repScheme: {
      type: "dynamic",
      maxReps: 4
    },
    rest: 60
  }],
  setRest: 90,
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
  paceConfig: {
    baseMetric: "css",
    offset: 1,
    randomRange: 1,
    operator: "-"
  },
  setDefinitions: [{
    id: 'Nx400_css_r50',
    distance: 400,
    repScheme: {
      type: "dynamic",
      maxReps: 18
    },
    rest: 50
  }, {
    id: 'Nx500_css_r60',
    distance: 500,
    repScheme: {
      type: "dynamic",
      maxReps: 14
    },
    rest: 60
  }, {
    id: 'Nx600_css_r90',
    distance: 600,
    repScheme: {
      type: "dynamic",
      maxReps: 12
    },
    rest: 90
  }],
  setRest: 0,
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
  paceConfig: {
    baseMetric: "css",
    offset: 0,
    operator: "+"
  },
  setDefinitions: [{
    id: '18x100_css_r10',
    distance: 100,
    repScheme: {
      type: 'dynamic',
      maxReps: 18
    },
    rest: 10
  }, {
    id: '10x200_css_r20',
    distance: 200,
    repScheme: {
      type: 'dynamic',
      maxReps: 10
    },
    rest: 20
  }, {
    id: 'Nx400_css_r40',
    distance: 400,
    repScheme: {
      type: 'dynamic',
      maxReps: 18
    },
    rest: 40
  }, {
    id: 'Nx500_css_r50',
    distance: 500,
    repScheme: {
      type: 'dynamic',
      maxReps: 14
    },
    rest: 50
  }, {
    id: 'Nx600_css_r60',
    distance: 600,
    repScheme: {
      type: 'dynamic',
      maxReps: 12
    },
    rest: 60
  }, {
    id: 'Nx800_css_r90',
    distance: 800,
    repScheme: {
      type: 'dynamic',
      maxReps: 8
    },
    rest: 90
  }, {
    id: 'Nx1000_css_r90',
    distance: 1000,
    repScheme: {
      type: 'dynamic',
      maxReps: 6
    },
    rest: 90
  }],
  setRest: 150,
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

var NO_COOLDOWN = {
  desc: "No cooldown (short workout)",
  dist: 0,
  type: "none"
};

/**
 * Selects a cooldown routine randomly from the available options.
 *
 * @param {Array<Object>} availableCooldowns - An array of cooldown objects. Each object should have at least 'desc' and 'dist' properties.
 * @returns {Object|null} The selected cooldown object, or null if no cooldowns are available or an error occurs.
 */
function generateCooldown() {
  if (cooldowns && cooldowns.length > 0) {
    return cooldowns[Math.floor(Math.random() * cooldowns.length)];
  }
  return NO_COOLDOWN; // Or return a default cooldown if preferred
}

/**
 * Generates the main set for a workout based on the energy system.
 *
 * @param {string} energySystem - The energy system focus (e.g., 'EN1', 'EN2').
 * @param {number} cssSecondsPer100 - Critical Swim Speed in seconds per 100 units.
 * @param {number} remainingDistanceForMainSet - The distance available for the main set.
 * @param {string} workoutType - The type of workout (e.g., 'THRESHOLD_SUSTAINED').
 * @returns {{ sets: string[], mainSetTotalDist: number, targetPacePer100: number, descriptiveMessage?: string }}
 *           An object containing the sets, total distance of the main set, target pace,
 *           and an optional descriptive message for unknown or default systems.
 */
function generateMainSet(workoutType, energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
  var config = ALL_WORKOUT_CONFIGS[workoutType];
  var messageFromOuterScope;
  if (!config) {
    messageFromOuterScope = "Unknown workout type: ".concat(workoutType, ". Defaulting to general endurance.");
    config = ALL_WORKOUT_CONFIGS['GENERAL_ENDURANCE'];
  }

  // The generator function now expects energySystem as its first param.
  var mainSetOutput = generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, config);

  // Fallback condition: if the selected generator (not GENERAL_ENDURANCE) produced a very small set
  if (mainSetOutput.mainSetTotalDist < 100 && remainingDistanceForMainSet > 100 && workoutType !== 'GENERAL_ENDURANCE') {
    var fallbackMessage = "(Fallback to general endurance due to low generated distance for selected workout type).";
    var originalMessage = mainSetOutput.descriptiveMessage; // Message from the original, tiny set
    mainSetOutput = generateMainSetFromConfig(energySystem, cssSecondsPer100, remainingDistanceForMainSet, ALL_WORKOUT_CONFIGS['GENERAL_ENDURANCE']); // Rerun with GENERAL_ENDURANCE

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
  generateCooldown: generateCooldown,
  generateMainSet: generateMainSet
};

var VERY_SHORT_WORKOUT_THRESHOLD = 600; // yards
var MAIN_SET_UNITS = "yards"; // Assuming SCY based on sources unless specified otherwise

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
  var cssSecondsPer100 = parseCssTimeToSeconds(cssTimeMmSs);
  if (cssSecondsPer100 === null) {
    return "Error: Invalid CSS time format. Please use MM:SS (e.g., '1:10').";
  }
  var workoutDetails = [];
  var currentDistanceCovered = 0;

  // --- 1. Warmup Selection ---
  var warmup = generateWarmup(totalDistanceYards, VERY_SHORT_WORKOUT_THRESHOLD);
  workoutDetails.push(warmup.desc);
  currentDistanceCovered += warmup.dist;

  // --- 3. cooldown selection
  var cooldown = workoutFunctions.generateCooldown();
  currentDistanceCovered += cooldown.dist;

  // --- 2. Main Set Generation ---
  var mainSetDescription = "Main Set:";
  var sets = [];
  var mainSetTotalDist = 0;
  var targetPacePer100;
  var remainingDistanceForMainSet = totalDistanceYards - currentDistanceCovered;

  // Map energySystem to workoutType keys
  var internalWorkoutType = generateWorkoutType(energySystem, workoutType);
  var mainSetResult = workoutFunctions.generateMainSet(internalWorkoutType, energySystem, cssSecondsPer100, remainingDistanceForMainSet);
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

  workoutDetails.push("CD: ".concat(cooldown.desc));

  // --- 4. Final Details ---
  workoutDetails.push("\nTotal estimated distance: ".concat(currentDistanceCovered, " ").concat(MAIN_SET_UNITS));
  workoutDetails.push("CSS: ".concat(cssTimeMmSs));
  workoutDetails.push("Workout Type: ".concat(workoutType)); // Added Workout Type
  workoutDetails.push("Energy System Focus: ".concat(energySystem.toUpperCase()));
  // A rough estimate of average pace, as true average depends on actual interval times and rest
  workoutDetails.push("Estimated AVG pace for main set: ".concat(formatSecondsToMmSs(targetPacePer100), " / 100 ").concat(MAIN_SET_UNITS));
  return workoutDetails.join('\n');
}

function generateWorkoutType(energySystem, workoutType) {
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
  return internalWorkoutType;
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
