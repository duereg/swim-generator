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
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
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
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = true,
      o = false;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = true, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
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
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
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
  return null;
}
function formatSecondsToMmSs(totalSeconds) {
  var rounded = Math.ceil(totalSeconds);
  var minutes = Math.floor(rounded / 60);
  var seconds = rounded % 60;
  return "".concat(minutes, ":").concat(seconds.toString().padStart(2, '0'));
}

// --- Helper Functions ---

function applyPaceAdjustment(cssSecondsPer100, paceConfig) {
  var randomComponent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  if (!paceConfig || typeof cssSecondsPer100 !== 'number') {
    return cssSecondsPer100;
  }
  var offset = paceConfig.offset || 0;
  var totalAdjustment = offset + randomComponent;
  if (paceConfig.operator === '+') {
    return cssSecondsPer100 + totalAdjustment;
  }
  if (paceConfig.operator === '-') {
    return cssSecondsPer100 - totalAdjustment;
  }
  return cssSecondsPer100;
}
function formatPaceDescription(cssSecondsPer100, paceConfig) {
  if (typeof cssSecondsPer100 !== 'number' || !paceConfig) {
    return 'CSS';
  }
  var randomRange = paceConfig.randomRange || 0;
  var minPace = applyPaceAdjustment(cssSecondsPer100, paceConfig, 0);
  var maxPace = randomRange > 0 ? applyPaceAdjustment(cssSecondsPer100, paceConfig, randomRange) : minPace;
  if (randomRange > 0 && minPace !== maxPace) {
    var lowSeconds = Math.min(minPace, maxPace);
    var highSeconds = Math.max(minPace, maxPace);
    return "".concat(formatSecondsToMmSs(lowSeconds), "-").concat(formatSecondsToMmSs(highSeconds));
  }
  return formatSecondsToMmSs(minPace);
}
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
  var paceDescription = formatPaceDescription(cssSecondsPer100, strategyConfig.paceConfig);
  if (strategyResult && strategyResult.generatedSets && strategyResult.generatedSets.length > 0 && strategyResult.totalDistance > 0) {
    mainSetTotalDist = strategyResult.totalDistance;
    strategyResult.generatedSets.forEach(function (item) {
      item.paceDesc = paceDescription;
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
    success: "EN1: {setSummary} ({energySystem}), {paceDescription} pace guide, 60\" rest.",
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
    success: "SP1: Lactate Tolerance ({energySystem}), {paceDescription}. Total ~{totalDistance}yds.",
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
    success: "EN2: {setSummary} ({energySystem}) @ {paceDescription}.",
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
  workoutDetails.push("Workout Type: ".concat(internalWorkoutType || workoutType || 'GENERAL_ENDURANCE'));
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

// Auto-generated by scripts/embed-preset-sources.mjs — do not edit

var FOUR_WEEK = "Warm-up (300-500 yds)\u20286 x 50 Kick @ 0:45\u20283 x 100 Huho @ 1:30\u20283 x 100 HoHu @ 1:30\u20286 x 50 Kick @ 0:45\u2028Cooldown (300-500 yds)\n*If this is too easy, add the following intervals between the 100\u2032s:\u2028\u20282 x 150 Swim @ 2:15\u20281 x 300 Kick @ 5:00\u20282 x 150 Swim @ 2:15\nTotal: 1800-2200 Yds (2700-3100 w/ extras)\n\n\f\nWarm-up (300-500 yds) \u2028\u20284 x 100 Swim @ 1:30\u20281 min rest\u20284 x 100 Kick @ 1:30\u20281 min rest\u20284 x 100 Huho @ 1:30\nCooldown (300-500 yds)\nGoal Time If You\u2019re Fit: Under 1:03.\u2028Goal Time If You\u2019re Not: Under 1:10\nTo make harder:\n\t\u2022\tChange all the intervals to HUHO\u2019s\n\t\u2022\tAdd another 4 x 100 Huho @ 1:30 w/ 2 min rest as your second set. \n\t\u2022\tChange all the intervals to HUHO Kick (no arms) \nTotal: 1800-2200 yds (2200-3000 w/ extras) \n\n\f\nWarm-up (300-500 yds)\nSet: \n\t\u2022\t2\xD7100 Kick @ 1:30\n\t\u2022\t1\xD7150 Swim @ 2:15\n\t\u2022\t1\xD7100 UOUO @ 1:45\n3 Sets, No Rest between Sets\nCooldown (300-500 yds)\nAll hundred\u2019s should be swum at around the same speed.\nTo make harder:\n\t\u2022\tAdd 4th Set\n\t\u2022\tAdd 5th Set\n\t\u2022\tDrop the UOUO\u2019s to 1:30\nTotal: 1950-2350 yds (2400-3250 w/ extras)\n\n\f\nWarm-up (300-500 yds)\u20283\xD7100 Kick \xA0 @ 1:30\u20282\xD775 \xA0 Huho @ 1:10\u20283\xD7100 Kick \xA0 @ 1:30\u20282\xD775 \xA0 OUO \xA0 @ 1:10\u20283\xD7100 Kick \xA0 @ 1:30\u20282\xD775 \xA0 UOU \xA0 @ 1:10\u2028Cooldown (300-500 yds)\nIf you need more, add these two the end of the set:\n3\xD7100 Kick \xA0 @ 1:30\u20282\xD775 \xA0 FU \xA0 \xA0 \xA0@ 1:20\nIf you need more than that, do 4\xD775 instead of 2\xD775.\nTotal: 1950-2350 Yds (w/ extras 2400-3400 yds)\n\n\f\nWarm-up (300-500 yds)\n4\xD750 HUHO @ 0:45\u20282\xD7100 Kick @ 1:30\u20284\xD750 HUHO @ 0:45\u2028200 Swim @ 3:00\u20284\xD750 HOHU @ 0:45\u20282\xD7100 Kick @ 1:30\u20284\xD750 HOHU @ 0:45\nCooldown (300-500 yds)\nAdd to the end of the set for extra:\u2028\u2028200 Swim @ 3:00\u20284\xD750 HOHU @ 0:45\u20282\xD7100 Kick @ 1:30\u20284\xD750 HOHU @ 0:45\nTotal: 2000-2400 yds (2800-3200 w/ extras) \n\n\f\nWarm-up (300-500 yds)\n100 UOOO @ 1:30\u2028100 OUOO @ 1:30\u2028100 OOUO @ 1:30\u2028100 OOOU @ 1:30\n4\xD750 Swim @ :45\n100 UOUO @ 1:40\u2028100 OUOU @ 1:40\u2028100 UOOU @ 1:40\n4\xD750 Swim @ :45\n100 UUOO @ 1:45\u2028100 OUUO @ 1:45\u2028100 OOUU @ 1:45\n4\xD750 Swim @ :45\nCooldown (300-500 yds)\nFor a bit extra, add this to the end:\n\u2028100 UUUO @ 2:00\u2028100 UUOU @ 2:00\u2028100 UOUU @ 2:00\u2028100 OUUU @ 2:00\n4\xD750 Swim @ :45\n100 FU\n2100-2500 yds (2800-3200 yds w/ extras)\n\nWarm-up (300-500 yds)\n4\xD775 HUHO @ 1:15 (Descend Times)\u20284\xD725 FU Sprints (Full Recovery) (Goal Time: < 0:12)\n20\xD750 Swim Sprints @ 1:00\u2028\u2028Keep track of your times.\u2028Keep going until your time is more than 2 seconds off of the first sprint.\u2028Record how many you achieved, and your time range.\u2028\u2028Cooldown (300-500 yds)\n\n\f\nThis workout is more to stretch your legs out than kill them. Do it appropriately.\nWarm-up (300-500 yds) \n200 Flutter w/ kick board (Medium Pace) + 15 seconds rest\u20284\xD750 (HUHO, HOHU, OU, UO) @ :45\u2028200 dolphin w/ kick board (Medium Pace) + 15 seconds rest\u20284\xD750 (HUHO, HOHU, OU, UO) @ :45\u2028200 flutter on back (Medium Pace) + 15 seconds rest\u20284\xD750 (HUHO, HOHU, OU, UO) @ :45\u2028200 dolphin on back (Medium Pace) + 15 seconds rest\u20284\xD750 (HUHO, HOHU, OU, UO) @ :45\nCooldown (300-500 yds)\n\n\f\nWarm-up (300-500)\n6\xD750 @ 0:50 \nSwim, HUHO, HOHU, OU, UO, FU\n3\xD7100 @ 1:40\u2028Swim, HUHO\u2028HOHU, OU\u2028UO, FU\n2\xD7150 @ 2:30\u2028Swim, HUHO, HOHU\u2028OU, UO, FU\n3\xD7100 @ 1:40\u2028Swim, HUHO\u2028HOHU, OU\u2028UO, FU\n6\xD750 @ 0:50\u2028Swim, HUHO, HOHU, OU, UO, FU\nCooldown (300-500)\nIf you need more, add these intervals after the 150\u2032s:\n1\xD7300 @ 5:00\u2028swim, HUHO, HOHU, OU, UO, FU\n2\xD7150 @ 2:30\u2028swim, HUHO, HOHU\u2028OU, UO, FU\n\nWarm-up (300-500)\nSet: \n200 Swim @ 2:45 \n3\xD7100 Huho @ 1:30\n3\xD750 UO @ 0:45\nRepeat 4 Times\nCooldown (300-500)\u2028\u2028If you need more, add another set.\n\n\f\nWarm-up (300-500)\n4\xD7100 HUHO @ 1:30\u20284\xD7100 TOFU @ 1:40\u20284\xD7100 OUOU @ 1:50\u20284\xD7100 FU @ 2:00\nCooldown (300-500)\nIf you need more:\nThe original set was each interval x6. \nIf you need more, go to 5 or 6 for each type of swim.\n\n\f\nWarm-up (300-500)\n6\xD750 UO @ 0:40\n\u20283\xD7100 HUHO @ 1:20\n\u20281\xD7300 Swim @ 4:30 \nThis should be barely faster than 3x your best 100\n\u20283\xD7100 HOHU @ 1:30 \nMatch or descend your previous 100\u2032s\n\u20286\xD750 OU @ 0:45 \nTry to descend all 4, each one faster than half  your fastest 100\n\nCooldown (300-500)\n\nIf you need more, add to the end:\n3\xD7100 BOGDAT @ 1:50\u20286\xD750 FU @ 1:00\n\n\f\nWarm-up (300-500)\n200 HUHO @ 3:15 (Goal < 2:12)\u2028100 OUOU @ 2:00 (Goal < 1:03)\u2028200 HOHU @ 3:15 (Goal < 2:12)\u2028100 OUOU @ 2:00 (Goal < 1:01)\u2028200 TOFU @ 3:15 (Goal < 2:12)\u2028100 OUOU @ 1:15 (Goal < 1:00)\n3:00 Rest\n200 HUHO @ 3:15 (Goal < 2:10)\u2028100 FU @ 2:00 (Goal < 1:12)\u2028200 HOHU @ 3:15 (Goal < 2:10)\u2028100 FU @ 2:00 (Goal < 1:10)\u2028200 TOFU @ 3:15 (Goal < 2:10)\u2028100 FU @ 1:15 (Goal < 1:08)\nCooldown (300-500)\n\n\f\nWarm-up (300-500)\n3\xD7100 HUHO @ 1:30 Descending\u2028\n5\xD7200 @ 3:15\n[HUHO, Swim, OUOU, Kick, HUHO]\n\u20283\xD7100 BUBU @ 2:15 \nCooldown (300-500)\n\n\f\nWarm-up (300-500)\n4\xD775 OUO @ 1:15\u20283\xD7100 HUHO @ 1:45\u20284\xD775 UOU @ 1:15\u2028300 Swim @ 4:30\u20284\xD775 OUO @ 1:30\u20283\xD7100 HUHO @ 1:45\u20284\xD775 BUBU @ 1:30\nCooldown (300-500)\n\n\f\nWarm-up (300-500)\n1000 Kick\nFull Recovery\n50 UO @ 1:00\u202850 OU @ 1:00\u20282\xD725 ASAP @ 1:00\u20282\xD725 FU Sprint @ :45\n5\xD7100 FU @ 2:10\n\n\f\nWarm-up (300-500)\n200 Swim @ 2:45\u20284\xD750 OU @ :45\u2028200 Kick @ 3:00\u20284\xD750 UO @ :45\n400 Swim @ 6:00\n4\xD750 BUBU @ 1:00\u2028200 HUHO @ 3:00\u20284\xD750 FU @ 1:15\u2028200 HOHU @ 3:30\nCooldown (300-500)\n\n\f\nWarm-up (300-500)\n10\xD7100 HUHO @ 1:20\nFull Recovery\n50 UO @ 1:00\u202850 OU @ 1:00\u20282\xD725 ASAP @ 1:00\u20282\xD725 FU Sprint @ :45\n6\xD7100 FU @ 2:10\n";
var NINE_WEEK = "Warm-up (300-500 yds)\u20286 x 50 Kick @ 0:45\u20283 x 100 Huho @ 1:30\u20283 x 100 HoHu @ 1:30\u20286 x 50 Kick @ 0:45\u2028Cooldown (300-500 yds)\n*If this is too easy, add the following intervals between the 100\u2032s:\u2028\u20282 x 150 Swim @ 2:15\u20281 x 300 Kick @ 5:00\u20282 x 150 Swim @ 2:15\nTotal: 1800-2200 Yds (2700-3100 w/ extras)\n\n\f\nWarm-up (300-500 yds) \u2028\u20284 x 100 Swim @ 1:30\u20281 min rest\u20284 x 100 Kick @ 1:30\u20281 min rest\u20284 x 100 Huho @ 1:30\nCooldown (300-500 yds)\nGoal Time If You\u2019re Fit: Under 1:03.\u2028Goal Time If You\u2019re Not: Under 1:10\nTo make harder:\n\t\u2022\tChange all the intervals to HUHO\u2019s\n\t\u2022\tAdd another 4 x 100 Huho @ 1:30 w/ 2 min rest as your second set. \n\t\u2022\tChange all the intervals to HUHO Kick (no arms) \nTotal: 1800-2200 yds (2200-3000 w/ extras) \n\n\f\nWarm-up (300-500 yds)\nSet: \n\t\u2022\t2\xD7100 Kick @ 1:30\n\t\u2022\t1\xD7150 Swim @ 2:15\n\t\u2022\t1\xD7100 UOUO @ 1:45\n3 Sets, No Rest between Sets\nCooldown (300-500 yds)\nAll hundred\u2019s should be swum at around the same speed.\nTo make harder:\n\t\u2022\tAdd 4th Set\n\t\u2022\tAdd 5th Set\n\t\u2022\tDrop the UOUO\u2019s to 1:30\nTotal: 1950-2350 yds (2400-3250 w/ extras)\n\n\f\nWarm-up (300-500 yds)\u20283\xD7100 Kick \xA0 @ 1:30\u20282\xD775 \xA0 Huho @ 1:10\u20283\xD7100 Kick \xA0 @ 1:30\u20282\xD775 \xA0 OUO \xA0 @ 1:10\u20283\xD7100 Kick \xA0 @ 1:30\u20282\xD775 \xA0 UOU \xA0 @ 1:10\u2028Cooldown (300-500 yds)\nIf you need more, add these two the end of the set:\n3\xD7100 Kick \xA0 @ 1:30\u20282\xD775 \xA0 FU \xA0 \xA0 \xA0@ 1:20\nIf you need more than that, do 4\xD775 instead of 2\xD775.\nTotal: 1950-2350 Yds (w/ extras 2400-3400 yds)\n\n\f\nWarm-up (300-500 yds)\n4\xD750 HUHO @ 0:45\u20282\xD7100 Kick @ 1:30\u20284\xD750 HUHO @ 0:45\u2028200 Swim @ 3:00\u20284\xD750 HOHU @ 0:45\u20282\xD7100 Kick @ 1:30\u20284\xD750 HOHU @ 0:45\nCooldown (300-500 yds)\nAdd to the end of the set for extra:\u2028\u2028200 Swim @ 3:00\u20284\xD750 HOHU @ 0:45\u20282\xD7100 Kick @ 1:30\u20284\xD750 HOHU @ 0:45\nTotal: 2000-2400 yds (2800-3200 w/ extras) \n\n\f\nWarm-up (300-500 yds)\n100 UOOO @ 1:30\u2028100 OUOO @ 1:30\u2028100 OOUO @ 1:30\u2028100 OOOU @ 1:30\n4\xD750 Swim @ :45\n100 UOUO @ 1:40\u2028100 OUOU @ 1:40\u2028100 UOOU @ 1:40\n4\xD750 Swim @ :45\n100 UUOO @ 1:45\u2028100 OUUO @ 1:45\u2028100 OOUU @ 1:45\n4\xD750 Swim @ :45\nCooldown (300-500 yds)\nFor a bit extra, add this to the end:\n\u2028100 UUUO @ 2:00\u2028100 UUOU @ 2:00\u2028100 UOUU @ 2:00\u2028100 OUUU @ 2:00\n4\xD750 Swim @ :45\n100 FU\n2100-2500 yds (2800-3200 yds w/ extras)\n\nWarm-up (300-500 yds)\n4\xD775 HUHO @ 1:15 (Descend Times)\u20284\xD725 FU Sprints (Full Recovery) (Goal Time: < 0:12)\n20\xD750 Swim Sprints @ 1:00\u2028\u2028Keep track of your times.\u2028Keep going until your time is more than 2 seconds off of the first sprint.\u2028Record how many you achieved, and your time range.\u2028\u2028Cooldown (300-500 yds)\n\n\f\nThis workout is more to stretch your legs out than kill them. Do it appropriately.\nWarm-up (300-500 yds) \n200 Flutter w/ kick board (Medium Pace) + 15 seconds rest\u20284\xD750 (HUHO, HOHU, OU, UO) @ :45\u2028200 dolphin w/ kick board (Medium Pace) + 15 seconds rest\u20284\xD750 (HUHO, HOHU, OU, UO) @ :45\u2028200 flutter on back (Medium Pace) + 15 seconds rest\u20284\xD750 (HUHO, HOHU, OU, UO) @ :45\u2028200 dolphin on back (Medium Pace) + 15 seconds rest\u20284\xD750 (HUHO, HOHU, OU, UO) @ :45\nCooldown (300-500 yds)\n\n\f\nWarm-up (300-500)\n6\xD750 @ 0:50 \nSwim, HUHO, HOHU, OU, UO, FU\n3\xD7100 @ 1:40\u2028Swim, HUHO\u2028HOHU, OU\u2028UO, FU\n2\xD7150 @ 2:30\u2028Swim, HUHO, HOHU\u2028OU, UO, FU\n3\xD7100 @ 1:40\u2028Swim, HUHO\u2028HOHU, OU\u2028UO, FU\n6\xD750 @ 0:50\u2028Swim, HUHO, HOHU, OU, UO, FU\nCooldown (300-500)\nIf you need more, add these intervals after the 150\u2032s:\n1\xD7300 @ 5:00\u2028swim, HUHO, HOHU, OU, UO, FU\n2\xD7150 @ 2:30\u2028swim, HUHO, HOHU\u2028OU, UO, FU\n\nWarm-up (300-500)\nSet: \n200 Swim @ 2:45 \n3\xD7100 Huho @ 1:30\n3\xD750 UO @ 0:45\nRepeat 4 Times\nCooldown (300-500)\u2028\u2028If you need more, add another set.\n\n\f\nWarm-up (300-500)\n4\xD7100 HUHO @ 1:30\u20284\xD7100 TOFU @ 1:40\u20284\xD7100 OUOU @ 1:50\u20284\xD7100 FU @ 2:00\nCooldown (300-500)\nIf you need more:\nThe original set was each interval x6. \nIf you need more, go to 5 or 6 for each type of swim.\n\n\f\nWarm-up (300-500)\n6\xD750 UO @ 0:40\n\u20283\xD7100 HUHO @ 1:20\n\u20281\xD7300 Swim @ 4:30 \nThis should be barely faster than 3x your best 100\n\u20283\xD7100 HOHU @ 1:30 \nMatch or descend your previous 100\u2032s\n\u20286\xD750 OU @ 0:45 \nTry to descend all 4, each one faster than half  your fastest 100\n\nCooldown (300-500)\n\nIf you need more, add to the end:\n3\xD7100 BOGDAT @ 1:50\u20286\xD750 FU @ 1:00\n\n\f\nWarm-up (300-500)\n200 HUHO @ 3:15 (Goal < 2:12)\u2028100 OUOU @ 2:00 (Goal < 1:03)\u2028200 HOHU @ 3:15 (Goal < 2:12)\u2028100 OUOU @ 2:00 (Goal < 1:01)\u2028200 TOFU @ 3:15 (Goal < 2:12)\u2028100 OUOU @ 1:15 (Goal < 1:00)\n3:00 Rest\n200 HUHO @ 3:15 (Goal < 2:10)\u2028100 FU @ 2:00 (Goal < 1:12)\u2028200 HOHU @ 3:15 (Goal < 2:10)\u2028100 FU @ 2:00 (Goal < 1:10)\u2028200 TOFU @ 3:15 (Goal < 2:10)\u2028100 FU @ 1:15 (Goal < 1:08)\nCooldown (300-500)\n\n\f\nWarm-up (300-500)\n3\xD7100 HUHO @ 1:30 Descending\u2028\n5\xD7200 @ 3:15\n[HUHO, Swim, OUOU, Kick, HUHO]\n\u20283\xD7100 BUBU @ 2:15 \nCooldown (300-500)\n\n\f\nWarm-up (300-500)\n4\xD775 OUO @ 1:15\u20283\xD7100 HUHO @ 1:45\u20284\xD775 UOU @ 1:15\u2028300 Swim @ 4:30\u20284\xD775 OUO @ 1:30\u20283\xD7100 HUHO @ 1:45\u20284\xD775 BUBU @ 1:30\nCooldown (300-500)\n\n\f\nWarm-up (300-500)\n1000 Kick\nFull Recovery\n50 UO @ 1:00\u202850 OU @ 1:00\u20282\xD725 ASAP @ 1:00\u20282\xD725 FU Sprint @ :45\n5\xD7100 FU @ 2:10\n\n\f\nWarm-up (300-500)\n200 Swim @ 2:45\u20284\xD750 OU @ :45\u2028200 Kick @ 3:00\u20284\xD750 UO @ :45\n400 Swim @ 6:00\n4\xD750 BUBU @ 1:00\u2028200 HUHO @ 3:00\u20284\xD750 FU @ 1:15\u2028200 HOHU @ 3:30\nCooldown (300-500)\n\n\f\nWarm-up (300-500)\n10\xD7100 HUHO @ 1:20\nFull Recovery\n50 UO @ 1:00\u202850 OU @ 1:00\u20282\xD725 ASAP @ 1:00\u20282\xD725 FU Sprint @ :45\n6\xD7100 FU @ 2:10\n";
var LIBRARY_24 = "Workout 1b\nWarm\xADup (300-500 yds)\n\n2 x 150 HUHO @ 2:10\n100 VKick +30\n2 x 150 HOHU @ 2:10\n100 VKick +30\n2 x 150 HUHO @ 2:10\n100 VKick +30\n2 x 150 HOHU @ 2:10\n100 VKick +30\n\nCooldown (300-500 yds)\f\nWorkout 2b\nWarm\xADup (300-500 yds)\n\n200 Swim @ 2:40\n3 x 100 UOUO @ 1:30\n200 Kick @ 2:40\n3 x 100 UOUO @ 1:30\n200 HUHO @ 2:40\n3 x 100 UOUO @ 1:30\n200 TOFU @ 2:40\n3 x 100 UOUO @ 1:30\n\nCooldown (300-500 yds)\f\nWorkout 3b\nWarm\xADup (300-500 yds)\n\n1 x 400 HUHO @ 5:30 < 4:45\n2 x 200 HUHO @ 2:45 < 2:16\n4 x 100 HUHO @ 1:30 < 1:03\n8 x 50  HUHO @ 0:45 < 0:30\n\nCooldown (300-500 yds)\f\nWorkout 4b\nWarm\xADup (300-500 yds)\n\n1 x 400 OUOU @ 6:30 < 4:45\n2 x 200 OUOU @ 3:30 < 2:16\n4 x 100 OUOU @ 1:45 < 1:03\n8 x 50  OUOU @ 1:00 < 0:30\n\nCooldown (300-500 yds)\f\nWorkout 5b\nWarm\xADup (300-500 yds)\n\n400 HUHO @ 6:00 < 4:45\n4 x 100 Kick @ 1:30\n200 HUHO @ 3:00 < 2:16\n2 x 100 Kick @ 1:30\n200 HUHO @ 3:00 < 2:16\n2 x 100 Kick @ 1:30\n\nCooldown (300-500 yds)\f\nWorkout 6b\nWarm\xADup (300-500 yds)\n\n4 x 100 HUHO @ 1:30 < 1:10\n4 x 100 HUHO @ 1:25 < 1:10\n4 x 100 HUHO @ 1:20 < 1:10\n1 min rest\n4 x 100 HUHO @ 1:15 < 1:10\n\nCooldown (300-500 yds)\f\nWorkout 7b\nWarm\xADup (300-500 yds)\n\n2 x 300 Swim @ 4:00\n4 x 100 UOUK @ 1:30\n2 x 300 Swim @ 4:00\n4 x 100 UOUK @ 1:30\n\nCooldown (300-500 yds)\f\nWorkout 8b\nWarm-up (300-500)\n\n4\xD775 VKick +20 \u20283\xD7100 HUHO @ 1:30\u20284\xD775 VKick +20 \u2028300 Swim @ 4:30\u20284\xD775 VKick +20 \u20283\xD7100 HUHO @ 1:30\u20284\xD775 VKick +20 \n\u2028Cooldown (300-500)\n\f\nWorkout 9b\nWarm\xADup (300-500 yds)\n\n500 Kick @ 7:00 < 5:20\n500 Swim @ 7:00 < 5:20\n500 Kick @ 7:00 < 5:20\n500 Swim @ 7:00 < 5:20\n\nCooldown (300-500 yds)\f\nWorkout 10b\nWarm\xADup (300-500 yds)\n\n3 x 300 HUHO @ 4:30 < 3:10\n3 x 200 HUHO @ 3:00 < 2:06\n3 x 100 HUHO @ 1:45 < 1:00\n1 min rest\n3 x 100 FU @ 1:40 \n\nCooldown (300-500 yds)\f\nWorkout 11b\nWarm\xADup (300-500 yds)\n\n6 x 100 HUHO on 1:30 < 1:03\n6 x 100 TOFU on 1:40 < 1:03\n6 x 100 OUOU on 1:40 < 1:03\n6 x 100 FU on 2:00 < 1:05\n\nCooldown (300-500 yds)\f\nWorkout 12b\nWarm\xADup (300-500 yds)\n\n5 Sets:\n1x150 HUHO @ 2:00\n2x100 HOHU @ 1:30\n1x100 OUOU @ 1:45\n\nCooldown (300-500 yds)\f\nWorkout 13b\nWarm\xADup (300-500 yds)\n\n10x150 HUHO @ 2:15\n5x100 HOHU @ 1:30\n\nCooldown (300-500 yds)\f\nWorkout 14b\nWarm\xADup (300-500 yds)\n\n4x125 UOUOU @ 2:00\n5x100 UOUO @ 1:40\n4x100 HUHO @ 1:30\n3x100 HUHO @ 1:20\n2x100 HUHO @ 1:10\n1x100 HUHO @ sprint\n\nCooldown (300-500 yds)\f\nWorkout 15b\nWarm\xADup (300-500 yds)\n\n200 HUHO @ 3:10\n100 VKick +30\n200 HOHU @ 3:10\n100 VKick +30\n200 HUHO @ 3:10\n100 VKick +30\n200 HOHU @ 3:10\n100 VKick +30\n200 HUHO @ 3:10\n100 VKick +30\n5x100 UOUO @ 1:40\n\nCooldown (300-500 yds)\f\nWorkout 16b\nWarm\xADup (300-500 yds)\n\n250 Kick +45, 50 FU +15\n2 x 100 HUHO +20, 50 OU +15\n250 Kick +45, 50 FU +15\n2 x 100 HUHO +20, 50 OU +15\n250 Kick +45, 50 FU +15\n2 x 100 HUHO +20, 50 OU +15\n250 Kick +45, 50 FU+15\n2 x 100 HUHO +20, 50 OU +15\n\nCooldown (300-500 yds)\f\nWorkout 17b\nWarm\xADup (300-500 yds)\n\n5 Sets\n200 HUHO @ 3:00\n3x100 OUOU @ 1:40\n\nCooldown (300-500 yds)\f\nWorkout 18b\nWarm\xADup (300-500 yds)\n\n500 Swim +45\n5x100 HUHO @ 1:20\n500 KB +45\n5x100 HUHO @ 1:20\n\nCooldown (300-500 yds)\f\nWorkout 19b\nWarm\xADup (300-500 yds)\n\n4x100 UOUO @ 1:30\n2x200 TOFU @ 3:00\n1x400 HUHO @ 6:00\n2x200 TOFU @ 3:00\n4x100 OUOU @ 1:30\n\nCooldown (300-500 yds)\f\nWorkout 20b\nWarm\xADup (300-500 yds)\n\n7 Sets\n100 Swim @ 1:20\n100 VKick +20\n50 Swim @ 0:40\n50 VKick +15\n\nCooldown (300-500 yds)\f\nWorkout 21b\nWarm\xADup (300-500 yds)\n\n5 Sets\n2x100 HUHO @ 1:30\n100 OUOU @ 1:30\n100 BUBU @ 2:15\n\nCooldown (300-500 yds)\f\nWorkout 22b\nWarm\xADup (300-500 yds)\n\n10x100 @ 1:30 \nHUHO, HOHU, TOFU, OUOU, OUOU, TOFU, HOHU, HUHO, FU, FU\n2 min rest\n10x100 @ 1:30 \nHUHO, HOHU, TOFU, OUOU, OUOU, TOFU, HOHU, HUHO, FU, FU\n\nCooldown (300-500 yds)\f\nWorkout 23b\nWarm\xADup (300-500 yds)\n\n200 HUHO @ 2:45\u20284\xD750 VKick +20\u2028200 HOHU @ 2:45\u20284\xD750 VKick +20\n400 Swim @ 5:00\n4\xD750 VKick +20\n200 HUHO @ 2:45\u20284\xD750 VKick +20\n200 HOHU @ 2:45\n\nCooldown (300-500 yds)\nWorkout 24b\nWarm\xADup (300-500 yds)\n\n10x100 OUOU @ 1:40\n+30 Rest\n10x75 OUO @ 1:10\n+30 Rest\n10x50 OU @ :50\n+1:00 Rest\n10x25 FU @ :25\n\nCooldown (300-500 yds)\n";
var TEN_WEEK_SPEED = "10 weeks program for speed development\n\n\n\nWeek 1 :\n\n\n\nMonday\nTuesday\nWednesday\nThursday\nFriday\nSwim 1\n4000 EN1\n4700 EN2\n4500 EN1\n4300 EN2\n4200 EN1\nSwim 2\n2000 EN3\n\n3000 SP1\n\n2200 EN2\n\nSwimming :\nEN1 : Basic endurance training 65-75% MHR\nEN2 : Threshold endurance training 75-80% MHR\nEN3 : Overload endurance training 80-85% MHR\nSP1 : Lactate tolerance training 85-90% MHR\nSP2 : Lactate production training + 90% MHR\n\n\n\n\n\nWeek 2 :\n\n\n\nMonday\nTuesday\nWednesday\nThursday\nFriday\nSwim 1\n4000 EN1\n4700 EN2\n4500 EN1\n4300 EN2\n4200 EN1\nSwim 2\n2000 EN3\n\n3000 SP1\n\n2200 EN2\n\nSwimming :\nEN1 : Basic endurance training\nEN2 : Threshold endurance training\nEN3 : Overload endurance training\nSP1 : Lactate tolerance training\nSP2 : Lactate production training\n\n\n\n\n\n\nWeek 3 :\n\n\n\nMonday\nTuesday\nWednesday\nThursday\nFriday\nSwim 1\n3600 EN2\n4000 EN3\n4200 SP1\n3600 EN2\n4000 SP1\nSwim 2\n3200 EN3\n\n2200 SP1\n\n2200 SP2\n\nSwimming :\nEN1 : Basic endurance training\nEN2 : Threshold endurance training\nEN3 : Overload endurance training\nSP1 : Lactate tolerance training\nSP2 : Lactate production training\n\n\n\n\nWeek 4 :\n\n\n\nMonday\nTuesday\nWednesday\nThursday\nFriday\nSwim 1\n3600 EN2\n4000 EN3\n4200 SP1\n3600 EN2\n4000 SP1\nSwim 2\n3200 EN3\n\n2200 SP1\n\n2200 SP2\n\nSwimming :\nEN1 : Basic endurance training\nEN2 : Threshold endurance training\nEN3 : Overload endurance training\nSP1 : Lactate tolerance training\nSP2 : Lactate production training\n\n\n\n\n\n\n\n\nWeek 5 :\n\n\n\nMonday\nTuesday\nWednesday\nThursday\nFriday\nSwim 1\n3600 EN2\n4000 EN3\n4200 SP1\n3600 EN2\n4000 SP1\nSwim 2\n3200 EN3\n\n2200 SP1\n\n2200 SP2\n\nSwimming :\nEN1 : Basic endurance training\nEN2 : Threshold endurance training\nEN3 : Overload endurance training\nSP1 : Lactate tolerance training\nSP2 : Lactate production training\n\n\n\nWeek 6 :\n\n\n\nMonday\nTuesday\nWednesday\nThursday\nFriday\nSwim 1\n4000 EN2\n3400 EN3\n3800 SP1\n4000 EN3\n3800 SP1\n\n\nSwimming :\nEN1 : Basic endurance training\nEN2 : Threshold endurance training\nEN3 : Overload endurance training\nSP1 : Lactate tolerance training\nSP2 : Lactate production training\n\n\n\n\n\n\n\n\n\n\n\n\n\nWeek 7:\n\n\nMonday\nTuesday\nWednesday\nThursday\nFriday\nSwim 1\n4000 EN2\n3600 EN3\n3800 SP2\n4000 EN3\n3800 SP1\n\n\nSwimming :\nEN1 : Basic endurance training\nEN2 : Threshold endurance training\nEN3 : Overload endurance training\nSP1 : Lactate tolerance training\nSP2 : Lactate production training\n\n\nWeek 8:\n\n\nMonday\nTuesday\nWednesday\nThursday\nFriday\nSwim 1\n3600 EN3\n3500 SP1\n3200 SP2\n3800 EN3\n3400 SP2\n\n\nSwimming :\nEN1 : Basic endurance training\nEN2 : Threshold endurance training\nEN3 : Overload endurance training\nSP1 : Lactate tolerance training\nSP2 : Lactate production training\n\n\nWeek 9:\n\n\nMonday\nTuesday\nWednesday\nThursday\nFriday\nSwim 1\n3600 EN3\n3500 SP1\n3200 SP2\n3800 EN3\n3400 SP2\n\n\nSwimming :\nEN1 : Basic endurance training\nEN2 : Threshold endurance training\nEN3 : Overload endurance training\nSP1 : Lactate tolerance training\nSP2 : Lactate production training\n\n\nWeek 10:\n\n\nMonday\nTuesday\nWednesday\nThursday\nFriday\nSwim 1\n3000 EN2\n3000 EN3\nREST\nREST\nREST\n\nSwimming :\nEN1 : Basic endurance training\nEN2 : Threshold endurance training\nEN3 : Overload endurance training\nSP1 : Lactate tolerance training\nSP2 : Lactate production training\n\n\nDescription:\n\n\nEN1: Basic endurance training.\nLong swim sets, not too hard on the speed. Think about technique. Different strokes.\n8X500 with 60”R \n\nEN2: Threshold endurance training.\nCalculate CSS (critical swim speed).\nSets like:\n10X200 with 20”r at CSS\n5X400 with 40”r at CSS\n18X100 with 10”r at CSS\n3X600 with 60”r at CSS\n\nEN3: Overload endurance training.\n1” to 2” faster than CSS.\n4X500 with 60”r\n4X400 with 45”r\n\nSP1: Lactate tolerance training.\n3” to 5” faster than CSS.\nSet distances between 25 to 100yd with 15” to 2’ r between sets\nSet distances between 100 to 200yd with 3’ to 10’ r between sets\nSets of 400 to 800yd.\n\nSP2: Lactate production training.\nSpeed: Near max.\nSet distances between 25 to 50yd with 1’ to 3’ for 25yds set and 3’ to 5’ for 50yds set.\nSet length: 300 to 600yds\n\n\nCSS test: \nhttp://www.swimsmooth.com/training.html\n\n\n";

var PRESET_PLANS = {
  FOUR_WEEK_4X: {
    id: 'FOUR_WEEK_4X',
    name: '4-Week Plan (4 swims/week)',
    swimsPerWeek: 4,
    weeks: 4,
    sourceText: FOUR_WEEK
  },
  NINE_WEEK_2X: {
    id: 'NINE_WEEK_2X',
    name: '9-Week Plan (2 swims/week)',
    swimsPerWeek: 2,
    weeks: 9,
    sourceText: NINE_WEEK
  },
  TEN_WEEK_SPEED: {
    id: 'TEN_WEEK_SPEED',
    name: '10-Week Speed Development',
    kind: 'macro',
    weeks: 10,
    sourceText: TEN_WEEK_SPEED
  },
  LIBRARY_24: {
    id: 'LIBRARY_24',
    name: '24 Swim Workouts',
    sourceText: LIBRARY_24
  }
};
function getPresetPlan(planId) {
  return PRESET_PLANS[planId] || null;
}

function normalizeText(text) {
  return text.replace(/\u00ad/g, '-').replace(/\u2013/g, '-').replace(/\u2014/g, '-').replace(/\u00a0/g, ' ').replace(/\r\n/g, '\n').replace(/\u2028/g, '\n').replace(/\u2029/g, '\n')
  // Docx extraction corruption: "3 ,zzz★x 100" → "3 x 100"
  .replace(/(\d+)\s*,?\s*zzz★?\s*[x×]\s+/gi, '$1 x ');
}
var INTERVAL_LINE_RE = /^[\u2022•\-\s]*(\d+)\s*[x×]\s*(\d+)\s*(.*?)\s*(?:@|on)\s*(\d*:?\d+(?:\.\d+)?)\s*(.*)$/i;
var SINGLE_INTERVAL_RE = /^[\u2022•\-\s]*(\d+)\s+(.+?)\s*(?:@|on)\s*(\d*:?\d+(?:\.\d+)?)\s*(.*)$/i;
var GOAL_SUFFIX_RE = /(?:\(Goal\s*)?<\s*(\d*:?\d+(?:\.\d+)?)\s*\)?\s*$/i;
var PROSE_GOAL_RE = /Goal Time If You(?:'|'|\u2019)re Fit:\s*Under\s*(\d*:?\d+)/i;
var PROSE_GOAL_NOT_RE = /Goal Time If You(?:'|'|\u2019)re Not:\s*Under\s*(\d*:?\d+)/i;
function stripGoalSuffix(text) {
  return text.replace(/\s*(?:\(Goal\s*)?<\s*\d*:?\d+(?:\.\d+)?\s*\)?\s*$/i, '').replace(/\s*\([^)]*Descend[^)]*\)\s*$/i, '').replace(/\s+Descending\s*$/i, '').trim();
}
function classifyLine(line) {
  var trimmed = line.trim();
  if (!trimmed) return {
    kind: 'blank'
  };
  if (/^warm[-\s]?up/i.test(trimmed)) return {
    kind: 'warmup',
    text: trimmed
  };
  if (/^cool\s?down/i.test(trimmed)) return {
    kind: 'cooldown',
    text: trimmed
  };
  if (/^if you need more|^to make harder|^for a bit extra|^add to the end|^add these|^for extra|^the original set was/i.test(trimmed)) {
    return {
      kind: 'extraStart',
      text: trimmed
    };
  }
  if (/^\*if this is too easy/i.test(trimmed)) return {
    kind: 'extraStart',
    text: trimmed
  };
  var intervalMatch = trimmed.match(INTERVAL_LINE_RE);
  if (intervalMatch) {
    var _intervalMatch = _slicedToArray(intervalMatch, 6),
      reps = _intervalMatch[1],
      distance = _intervalMatch[2],
      activity = _intervalMatch[3],
      sendOff = _intervalMatch[4],
      tail = _intervalMatch[5];
    var hasGoalTime = GOAL_SUFFIX_RE.test(tail) || GOAL_SUFFIX_RE.test(trimmed);
    return {
      kind: 'interval',
      reps: parseInt(reps, 10),
      distance: parseInt(distance, 10),
      activity: stripGoalSuffix(activity) || 'swim',
      hasSendOff: true,
      hasGoalTime: hasGoalTime,
      originalSendOff: sendOff.trim()
    };
  }
  var singleMatch = trimmed.match(SINGLE_INTERVAL_RE);
  if (singleMatch && !/^[x×]/i.test(trimmed)) {
    var _singleMatch = _slicedToArray(singleMatch, 5),
      _distance = _singleMatch[1],
      _activity = _singleMatch[2],
      _sendOff = _singleMatch[3],
      _tail = _singleMatch[4];
    var _hasGoalTime = GOAL_SUFFIX_RE.test(_tail) || GOAL_SUFFIX_RE.test(trimmed);
    return {
      kind: 'interval',
      reps: 1,
      distance: parseInt(_distance, 10),
      activity: stripGoalSuffix(_activity) || 'swim',
      hasSendOff: true,
      hasGoalTime: _hasGoalTime,
      originalSendOff: _sendOff.trim()
    };
  }
  if (/\+\s*\d+\s*(?:seconds rest|sec|$)/i.test(trimmed) || /\+\d+/.test(trimmed) && /v?kick|flutter|dolphin/i.test(trimmed)) {
    return {
      kind: 'fixedRest',
      text: trimmed
    };
  }
  if (/full recovery|^\d+\s*min rest|^\d+:\d+\s*rest/i.test(trimmed)) {
    return {
      kind: 'fixedRest',
      text: trimmed
    };
  }
  var fitGoal = trimmed.match(PROSE_GOAL_RE);
  if (fitGoal) {
    return {
      kind: 'proseGoal',
      text: trimmed,
      goalVariant: 'fit',
      goalDistance: 100
    };
  }
  var notGoal = trimmed.match(PROSE_GOAL_NOT_RE);
  if (notGoal) {
    return {
      kind: 'proseGoal',
      text: trimmed,
      goalVariant: 'not',
      goalDistance: 100
    };
  }
  if (/^repeat\s+\d+/i.test(trimmed) || /^\d+\s*sets?,/i.test(trimmed) || /^set:/i.test(trimmed)) {
    return {
      kind: 'note',
      text: trimmed
    };
  }
  if (/^total:/i.test(trimmed)) return {
    kind: 'note',
    text: trimmed
  };
  return {
    kind: 'note',
    text: trimmed
  };
}
function splitIntoWorkoutBlocks(sourceText) {
  var text = normalizeText(sourceText);
  if (/^workout\s+\d+/im.test(text)) {
    return text.split(/\f|\n(?=Workout\s+\d+)/i).map(function (part) {
      return part.trim();
    }).filter(Boolean);
  }
  var rawParts = text.split(/\f+/).flatMap(function (part) {
    return part.split(/\n(?=Warm[-\s]?up)/i);
  }).map(function (part) {
    return part.trim();
  }).filter(Boolean);
  var merged = [];
  var _iterator = _createForOfIteratorHelper(rawParts),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var part = _step.value;
      var hasWarmup = /^warm[-\s]?up/im.test(part);
      if (!hasWarmup) {
        if (merged.length) {
          merged[merged.length - 1] += "\n".concat(part);
        }
        continue;
      }
      merged.push(part);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return merged;
}
function parseWorkoutBlock(blockText) {
  var _lines$;
  var lines = blockText.split('\n').map(function (line) {
    return line.trim();
  }).filter(function (line) {
    return line.length > 0;
  });
  var titleMatch = (_lines$ = lines[0]) === null || _lines$ === void 0 ? void 0 : _lines$.match(/^Workout\s+(\S+)/i);
  var title = titleMatch ? lines[0] : null;
  var contentLines = title ? lines.slice(1) : lines;
  var sections = [];
  var inExtra = false;
  var pendingInterval = null;
  var _iterator2 = _createForOfIteratorHelper(contentLines),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var line = _step2.value;
      var classified = classifyLine(line);
      if (classified.kind === 'blank') continue;
      if (classified.kind === 'extraStart') {
        inExtra = true;
        sections.push({
          type: 'extra',
          text: classified.text,
          isExtra: true
        });
        pendingInterval = null;
        continue;
      }
      if (inExtra) {
        if (classified.kind === 'interval') {
          sections.push({
            type: 'interval',
            reps: classified.reps,
            distance: classified.distance,
            activity: classified.activity,
            hasSendOff: classified.hasSendOff,
            hasGoalTime: classified.hasGoalTime,
            originalSendOff: classified.originalSendOff,
            isExtra: true
          });
        } else {
          sections.push({
            type: 'extra',
            text: classified.text,
            isExtra: true
          });
        }
        pendingInterval = null;
        continue;
      }
      if (classified.kind === 'interval') {
        pendingInterval = {
          type: 'interval',
          reps: classified.reps,
          distance: classified.distance,
          activity: classified.activity,
          hasSendOff: classified.hasSendOff,
          hasGoalTime: classified.hasGoalTime,
          originalSendOff: classified.originalSendOff,
          activityLines: []
        };
        sections.push(pendingInterval);
        continue;
      }
      if (pendingInterval && classified.kind === 'note' && !/^total:/i.test(classified.text)) {
        if (/^[A-Z,[\]\s/]+$/i.test(classified.text) && classified.text.length < 80) {
          pendingInterval.activityLines.push(classified.text);
          continue;
        }
      }
      pendingInterval = null;
      if (classified.kind === 'warmup') {
        sections.push({
          type: 'warmup',
          text: classified.text
        });
      } else if (classified.kind === 'cooldown') {
        sections.push({
          type: 'cooldown',
          text: classified.text
        });
      } else if (classified.kind === 'fixedRest') {
        sections.push({
          type: 'fixedRest',
          text: classified.text
        });
      } else if (classified.kind === 'proseGoal') {
        sections.push({
          type: 'proseGoal',
          text: classified.text,
          goalVariant: classified.goalVariant,
          goalDistance: classified.goalDistance
        });
      } else {
        sections.push({
          type: 'note',
          text: classified.text
        });
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return {
    title: title,
    sections: sections
  };
}
function parsePresetWorkoutText(sourceText) {
  var blocks = splitIntoWorkoutBlocks(sourceText);
  return blocks.map(parseWorkoutBlock);
}

var SHORT_INTERVAL_MAX_DISTANCE = 200;
function roundToNearest15(totalSeconds) {
  return Math.round(totalSeconds / 15) * 15;
}
function getConfigForDistance(distance) {
  return distance <= SHORT_INTERVAL_MAX_DISTANCE ? SPEED_ENDURANCE_CONFIG : THRESHOLD_SUSTAINED_CONFIG;
}
function getDeterministicPaceConfig(paceConfig) {
  if (!paceConfig) return null;
  var baseMetric = paceConfig.baseMetric,
    offset = paceConfig.offset,
    operator = paceConfig.operator;
  return {
    baseMetric: baseMetric,
    offset: offset || 0,
    operator: operator
  };
}
function getRestSecondsForDistance(distance, config) {
  var definitions = _toConsumableArray(config.setDefinitions).sort(function (a, b) {
    return a.distance - b.distance;
  });
  var match = definitions.filter(function (def) {
    return def.distance <= distance;
  }).pop();
  if (!match) {
    match = definitions[0];
  }
  return match.rest;
}
function calculateSwimSeconds(distance, cssSecondsPer100) {
  var config = getConfigForDistance(distance);
  var targetPacePer100 = calculateTargetPace(cssSecondsPer100, getDeterministicPaceConfig(config.paceConfig));
  return distance / 100 * targetPacePer100;
}
function calculateSendOffSeconds(distance, cssSecondsPer100) {
  var config = getConfigForDistance(distance);
  var swimSeconds = calculateSwimSeconds(distance, cssSecondsPer100);
  var restSeconds = getRestSecondsForDistance(distance, config);
  return roundToNearest15(swimSeconds + restSeconds);
}
function calculateGoalSeconds(distance, cssSecondsPer100) {
  return calculateSwimSeconds(distance, cssSecondsPer100);
}

function formatClockSeconds(totalSeconds) {
  var rounded = Math.round(totalSeconds);
  var minutes = Math.floor(rounded / 60);
  var seconds = rounded % 60;
  return "".concat(minutes, ":").concat(seconds.toString().padStart(2, '0'));
}
function formatGoalSeconds(totalSeconds) {
  var rounded = Math.ceil(totalSeconds);
  if (rounded < 60) {
    return ":".concat(rounded.toString().padStart(rounded < 10 ? 2 : 1, '0'));
  }
  var minutes = Math.floor(rounded / 60);
  var seconds = rounded % 60;
  return "".concat(minutes, ":").concat(seconds.toString().padStart(2, '0'));
}
function formatIntervalLine(section) {
  var repsPrefix = section.reps > 1 ? "".concat(section.reps, "x") : section.reps === 1 ? '1x' : '';
  var activity = section.activity || 'swim';
  var line = "".concat(repsPrefix).concat(section.distance, " ").concat(activity);
  if (section.hasSendOff && section.sendOffSeconds != null) {
    line += " @ ".concat(formatClockSeconds(section.sendOffSeconds));
  } else if (section.originalSendOff) {
    line += " @ ".concat(section.originalSendOff);
  }
  if (section.hasGoalTime && section.goalSeconds != null) {
    if (/\(Goal/i.test(section.originalText || '')) {
      line += " (Goal < ".concat(formatGoalSeconds(section.goalSeconds), ")");
    } else {
      line += " < ".concat(formatGoalSeconds(section.goalSeconds));
    }
  }
  if (section.activityLines && section.activityLines.length) {
    return [line].concat(_toConsumableArray(section.activityLines)).join('\n');
  }
  return line;
}
function formatProseGoal(section) {
  var goal = formatGoalSeconds(section.goalSeconds);
  if (section.goalVariant === 'not') {
    return "Goal Time If You're Not: Under ".concat(goal);
  }
  return "Goal Time If You're Fit: Under ".concat(goal);
}
function applyCssToWorkout(workout, cssSecondsPer100) {
  var sections = workout.sections.map(function (section) {
    if (section.type === 'interval') {
      var updated = _objectSpread2({}, section);
      if (section.hasSendOff) {
        updated.sendOffSeconds = calculateSendOffSeconds(section.distance, cssSecondsPer100);
      }
      if (section.hasGoalTime) {
        updated.goalSeconds = calculateGoalSeconds(section.distance, cssSecondsPer100);
      }
      return updated;
    }
    if (section.type === 'proseGoal') {
      var distance = section.goalDistance || 100;
      return _objectSpread2(_objectSpread2({}, section), {}, {
        goalSeconds: calculateGoalSeconds(distance, cssSecondsPer100)
      });
    }
    return section;
  });
  return _objectSpread2(_objectSpread2({}, workout), {}, {
    sections: sections
  });
}
function formatPresetWorkout(workout) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$includeExtra = options.includeExtras,
    includeExtras = _options$includeExtra === void 0 ? true : _options$includeExtra;
  var lines = [];
  if (workout.title) {
    lines.push(workout.title);
    lines.push('');
  }
  var _iterator = _createForOfIteratorHelper(workout.sections),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var section = _step.value;
      if (section.isExtra && !includeExtras) {
        continue;
      }
      if (section.type === 'interval') {
        lines.push(formatIntervalLine(section));
      } else if (section.type === 'proseGoal') {
        lines.push(formatProseGoal(section));
      } else if (section.text) {
        lines.push(section.text);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return lines.join('\n');
}
function applyCssAndFormat(workout, cssTimeMmSs) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var cssSecondsPer100 = parseCssTimeToSeconds(cssTimeMmSs);
  if (cssSecondsPer100 === null) {
    return "Error: Invalid CSS time format. Please use MM:SS (e.g., '1:20').";
  }
  var adjusted = applyCssToWorkout(workout, cssSecondsPer100);
  return formatPresetWorkout(adjusted, options);
}

var DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
var SWIM2_DAY_INDICES = [0, 2, 4];
var SESSION_RE = /^(\d+)\s+(EN[123]|SP[12])$/i;
var REST_RE = /^REST$/i;
function parseSessionToken(token) {
  var match = token.match(SESSION_RE);
  if (!match) return null;
  return {
    yards: parseInt(match[1], 10),
    energySystem: match[2].toUpperCase()
  };
}
function parseWeekBlock(weekNumber, blockText) {
  var body = blockText.split(/\n(?:Swimming\s*:|Description:)/i, 1)[0];
  var lines = body.split('\n').map(function (line) {
    return line.trim();
  }).filter(Boolean);
  var mondayIndex = lines.indexOf('Monday');
  if (mondayIndex === -1 || lines[mondayIndex + 4] !== 'Friday') {
    return [];
  }
  var swim1Index = lines.indexOf('Swim 1', mondayIndex);
  if (swim1Index === -1) {
    return [];
  }
  var swim1Tokens = [];
  var swim2Tokens = [];
  var mode = 'swim1';
  for (var i = swim1Index + 1; i < lines.length; i += 1) {
    var line = lines[i];
    if (line === 'Swim 2') {
      mode = 'swim2';
      continue;
    }
    if (SESSION_RE.test(line) || REST_RE.test(line)) {
      (mode === 'swim2' ? swim2Tokens : swim1Tokens).push(line);
    }
  }
  var sessions = [];
  swim1Tokens.forEach(function (token, index) {
    if (REST_RE.test(token)) return;
    var parsed = parseSessionToken(token);
    if (!parsed) return;
    sessions.push({
      week: weekNumber,
      day: DAYS[index],
      slot: 1,
      yards: parsed.yards,
      energySystem: parsed.energySystem
    });
  });
  swim2Tokens.forEach(function (token, index) {
    if (REST_RE.test(token)) return;
    var parsed = parseSessionToken(token);
    if (!parsed) return;
    sessions.push({
      week: weekNumber,
      day: DAYS[SWIM2_DAY_INDICES[index]],
      slot: 2,
      yards: parsed.yards,
      energySystem: parsed.energySystem
    });
  });
  return sessions;
}
function parseTenWeekSpeedPlan(sourceText) {
  var parts = sourceText.split(/Week\s+(\d+)\s*:/i);
  var sessions = [];
  for (var i = 1; i < parts.length; i += 2) {
    var weekNumber = parseInt(parts[i], 10);
    var blockText = parts[i + 1] || '';
    sessions.push.apply(sessions, _toConsumableArray(parseWeekBlock(weekNumber, blockText)));
  }
  return sessions;
}
function formatSessionHeader(session) {
  return "Week ".concat(session.week, ", ").concat(session.day, " (Swim ").concat(session.slot, ") \u2014 ").concat(session.yards, " ").concat(session.energySystem);
}

var parsedCache = new Map();
var macroSessionCache = new Map();
function getParsedWorkouts(planId) {
  if (parsedCache.has(planId)) {
    return parsedCache.get(planId);
  }
  var plan = getPresetPlan(planId);
  if (!plan) {
    return null;
  }
  var workouts = parsePresetWorkoutText(plan.sourceText);
  parsedCache.set(planId, workouts);
  return workouts;
}
function getMacroSessions(planId) {
  if (macroSessionCache.has(planId)) {
    return macroSessionCache.get(planId);
  }
  var plan = getPresetPlan(planId);
  if (!plan) {
    return null;
  }
  var sessions = parseTenWeekSpeedPlan(plan.sourceText);
  macroSessionCache.set(planId, sessions);
  return sessions;
}
function getWorkoutHeader(plan, workoutIndex) {
  if (plan.swimsPerWeek) {
    var week = Math.floor(workoutIndex / plan.swimsPerWeek) + 1;
    var swim = workoutIndex % plan.swimsPerWeek + 1;
    return "Week ".concat(week, ", Swim ").concat(swim);
  }
  return null;
}
function generateMacroPlan(plan, cssTimeMmSs) {
  var sessions = getMacroSessions(plan.id);
  if (!sessions || sessions.length === 0) {
    return "Error: No workouts found for plan \"".concat(plan.id, "\".");
  }
  var parts = sessions.map(function (session) {
    var header = formatSessionHeader(session);
    var body = generateWorkout$1(session.yards, session.energySystem, cssTimeMmSs);
    return "".concat(header, "\n").concat(body);
  });
  return parts.join('\n\n');
}
function listPresetPlans() {
  return Object.values(PRESET_PLANS).map(function (_ref) {
    var id = _ref.id,
      name = _ref.name;
    return {
      id: id,
      name: name
    };
  });
}
function generatePresetPlan(planId, cssTimeMmSs) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var plan = getPresetPlan(planId);
  if (!plan) {
    return "Error: Unknown preset plan \"".concat(planId, "\".");
  }
  if (parseCssTimeToSeconds(cssTimeMmSs) === null) {
    return "Error: Invalid CSS time format. Please use MM:SS (e.g., '1:20').";
  }
  if (plan.kind === 'macro') {
    return generateMacroPlan(plan, cssTimeMmSs);
  }
  var workouts = getParsedWorkouts(planId);
  if (!workouts || workouts.length === 0) {
    return "Error: No workouts found for plan \"".concat(planId, "\".");
  }
  var parts = workouts.map(function (workout, index) {
    var header = getWorkoutHeader(plan, index);
    var body = applyCssAndFormat(workout, cssTimeMmSs, options);
    if (header) {
      return "".concat(header, "\n").concat(body);
    }
    return body;
  });
  return parts.join('\n\n');
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

export { generateWorkout$1 as generateCssWorkout, generatePattern, generatePresetPlan, generateWorkout, listPresetPlans };
//# sourceMappingURL=swim-generator.es6.js.map
