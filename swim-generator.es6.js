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

// Sample distances based on comments in original css.js
var en1Distances = [200, 300, 400, 500];
var en2Distances = [100, 200, 300, 400];
var en3Distances = [50, 100, 150, 200];
var en3SecondaryDistances = [200, 300, 400];
var sp1Distances = [25, 50, 75, 100];
var sp1Drills = ["swim", "kb", "FU", "HUHO"];
var sp2Distances = [25, 50];
var sp2RepsMapping = {
  25: 24,
  50: 16
};

// Functions now keyed by workoutType, but still accept energySystem for potential future differentiation
var mainSetDefinitions = {
  'ENDURANCE_BASE': function ENDURANCE_BASE(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
    // Was EN1
    var sets = [];
    var mainSetTotalDist = 0;
    var targetPacePer100 = cssSecondsPer100 + Math.random() * 5;
    var numEn1Reps = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
    var en1RepDist = en1Distances[Math.floor(Math.random() * en1Distances.length)];
    if (numEn1Reps * en1RepDist > remainingDistanceForMainSet * 1.2) {
      numEn1Reps = Math.floor(remainingDistanceForMainSet * 1.2 / en1RepDist) || 1;
    }
    var en1Rest = "r".concat(Math.floor(Math.random() * (60 - 30 + 1)) + 30, "\"");
    sets.push("".concat(numEn1Reps, "x").concat(en1RepDist, " ").concat(energySystem, " focus swim/kick ").concat(en1Rest)); // Added energySystem to set desc for now
    mainSetTotalDist += numEn1Reps * en1RepDist;
    return {
      sets: sets,
      mainSetTotalDist: mainSetTotalDist,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: "Endurance Base (".concat(energySystem, ") set.")
    };
  },
  'THRESHOLD_SUSTAINED': function THRESHOLD_SUSTAINED(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
    // Was EN2
    var sets = [];
    var mainSetTotalDist = 0;
    var targetPacePer100 = cssSecondsPer100 + (Math.random() * 3 - 1.5);
    var numEn2Reps = Math.floor(Math.random() * (10 - 4 + 1)) + 4;
    var en2RepDist = en2Distances[Math.floor(Math.random() * en2Distances.length)];
    if (numEn2Reps * en2RepDist > remainingDistanceForMainSet * 1.2) {
      numEn2Reps = Math.floor(remainingDistanceForMainSet * 1.2 / en2RepDist) || 1;
    }
    var en2Rest = "r".concat(Math.floor(Math.random() * (30 - 20 + 1)) + 20, "\"");
    sets.push("".concat(numEn2Reps, "x").concat(en2RepDist, " ").concat(energySystem, " focus swim ").concat(en2Rest));
    mainSetTotalDist += numEn2Reps * en2RepDist;
    return {
      sets: sets,
      mainSetTotalDist: mainSetTotalDist,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: "Threshold Sustained (".concat(energySystem, ") set.")
    };
  },
  'THRESHOLD_DEVELOPMENT': function THRESHOLD_DEVELOPMENT(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
    // Was EN3
    var sets = [];
    var mainSetTotalDist = 0;
    var targetPacePer100 = cssSecondsPer100 - Math.random() * 3;
    var numEn3Reps = Math.floor(Math.random() * (5 - 2 + 1)) + 2;
    var en3RepDist = en3Distances[Math.floor(Math.random() * en3Distances.length)];
    if (numEn3Reps * en3RepDist > remainingDistanceForMainSet * 0.8 && remainingDistanceForMainSet > 800) {
      numEn3Reps = Math.floor(remainingDistanceForMainSet * 0.7 / en3RepDist) || 1;
    } else if (numEn3Reps * en3RepDist > remainingDistanceForMainSet * 1.1) {
      numEn3Reps = Math.floor(remainingDistanceForMainSet * 1.1 / en3RepDist) || 1;
    }
    var en3Rest = "r".concat(Math.floor(Math.random() * (90 - 40 + 1)) + 40, "\"");
    sets.push("".concat(numEn3Reps, "x").concat(en3RepDist, " ").concat(energySystem, " focus swim/kb ").concat(en3Rest));
    mainSetTotalDist += numEn3Reps * en3RepDist;
    if (remainingDistanceForMainSet - mainSetTotalDist > 500 && Math.random() < 0.5) {
      var secondaryReps = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
      var secondaryDist = en3SecondaryDistances[Math.floor(Math.random() * en3SecondaryDistances.length)];
      if (secondaryReps * secondaryDist > (remainingDistanceForMainSet - mainSetTotalDist) * 1.1) {
        secondaryReps = Math.floor((remainingDistanceForMainSet - mainSetTotalDist) * 1.1 / secondaryDist) || 1;
      }
      if (secondaryReps > 0) {
        sets.push("".concat(secondaryReps, "x").concat(secondaryDist, " ").concat(energySystem, " focus swim ").concat(en3Rest));
        mainSetTotalDist += secondaryReps * secondaryDist;
      }
    }
    return {
      sets: sets,
      mainSetTotalDist: mainSetTotalDist,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: "Threshold Development (".concat(energySystem, ") set.")
    };
  },
  'SPEED_ENDURANCE': function SPEED_ENDURANCE(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
    // Was SP1
    var sets = [];
    var mainSetTotalDist = 0;
    var targetPacePer100 = cssSecondsPer100 - (5 + Math.random() * 5);
    var numBlocks = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
    var blockDistRemaining = remainingDistanceForMainSet;
    for (var i = 0; i < numBlocks; i++) {
      var numReps = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
      var repDist = sp1Distances[Math.floor(Math.random() * sp1Distances.length)];
      var maxDistForBlock = blockDistRemaining / (numBlocks - i);
      if (numReps * repDist > maxDistForBlock * 1.2) {
        numReps = Math.floor(maxDistForBlock * 1.2 / repDist) || 1;
      }
      if (numReps === 0 && mainSetTotalDist === 0) numReps = 1;
      if (numReps > 0) {
        var rest = "r".concat(Math.floor(Math.random() * (40 - 30 + 1)) + 30, "\"");
        var drillType = sp1Drills[Math.floor(Math.random() * sp1Drills.length)];
        sets.push("".concat(numReps, "x").concat(repDist, " ").concat(drillType, " (").concat(energySystem, " focus) ").concat(rest));
        var currentBlockDist = numReps * repDist;
        mainSetTotalDist += currentBlockDist;
        blockDistRemaining -= currentBlockDist;
        if (i < numBlocks - 1 && blockDistRemaining > 50) {
          var easyBreak = Math.random() > 0.5 ? "2min rest" : "50 ez + wait for top";
          sets.push(easyBreak);
          if (easyBreak.includes("ez")) {
            mainSetTotalDist += 50;
            blockDistRemaining -= 50;
          }
        }
      }
    }
    if (sets.length === 0) {
      var _repDist = sp1Distances[1];
      var _numReps = Math.floor(remainingDistanceForMainSet / _repDist / 2) || 2;
      if (_numReps * _repDist > remainingDistanceForMainSet) _numReps = Math.floor(remainingDistanceForMainSet / _repDist) || 1;
      sets.push("".concat(_numReps, "x").concat(_repDist, " swim (").concat(energySystem, " focus) r30\""));
      mainSetTotalDist = _numReps * _repDist;
    }
    return {
      sets: sets,
      mainSetTotalDist: mainSetTotalDist,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: "Speed Endurance (".concat(energySystem, ") set.")
    };
  },
  'MAX_SPRINT': function MAX_SPRINT(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
    // Was SP2
    var sets = [];
    var mainSetTotalDist = 0;
    var targetPacePer100 = cssSecondsPer100 - (10 + Math.random() * 15);
    var repDist = sp2Distances[Math.floor(Math.random() * sp2Distances.length)];
    var numReps = sp2RepsMapping[repDist] || 10;
    if (numReps * repDist > remainingDistanceForMainSet * 0.9) {
      numReps = Math.floor(remainingDistanceForMainSet * 0.9 / repDist);
    }
    if (numReps < 8 && repDist === 50) numReps = 8;
    if (numReps < 12 && repDist === 25) numReps = 12;
    if (numReps === 0) numReps = 1;
    var sp2Rest = "1'r";
    sets.push("".concat(numReps, "x").concat(repDist, " UW sprint (").concat(energySystem, " focus, breath at wall) @ ").concat(sp2Rest));
    mainSetTotalDist += numReps * repDist;
    return {
      sets: sets,
      mainSetTotalDist: mainSetTotalDist,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: "Max Sprint (".concat(energySystem, ") set.")
    };
  },
  'GENERAL_ENDURANCE': function GENERAL_ENDURANCE(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
    // Was DEFAULT
    var sets = [];
    var mainSetTotalDist = 0;
    var targetPacePer100 = cssSecondsPer100;
    var numReps = Math.floor(remainingDistanceForMainSet / 400);
    if (numReps === 0 && remainingDistanceForMainSet > 200) numReps = 1;else if (numReps === 0) {
      numReps = Math.floor(remainingDistanceForMainSet / 200) || 1;
      sets.push("".concat(numReps, "x200 swim (").concat(energySystem, " focus) r30\""));
      mainSetTotalDist += numReps * 200;
      return {
        sets: sets,
        mainSetTotalDist: mainSetTotalDist,
        targetPacePer100: targetPacePer100,
        descriptiveMessage: "General Endurance (".concat(energySystem, ") default set.")
      };
    }
    sets.push("".concat(numReps, "x400 swim (").concat(energySystem, " focus) r45\""));
    mainSetTotalDist += numReps * 400;
    return {
      sets: sets,
      mainSetTotalDist: mainSetTotalDist,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: "General Endurance (".concat(energySystem, ") default set.")
    };
  }
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
  var cssSecondsPer100 = parseCssTimeToSeconds(cssTimeMmSs);
  if (cssSecondsPer100 === null) {
    return "Error: Invalid CSS time format. Please use MM:SS (e.g., '1:10').";
  }
  var workoutDetails = [];
  var currentDistanceCovered = 0;
  var mainSetUnits = "yards"; // Assuming SCY based on sources unless specified otherwise [7, 9, 16]

  // --- 1. Warmup Selection ---
  var selectedWarmup = workoutFunctions.selectWarmup(warmups, noWarmupOption);
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
  var mainSetResult = workoutFunctions.generateMainSet(workoutType, energySystem, cssSecondsPer100, remainingDistanceForMainSet, mainSetDefinitions);
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
  var selectedCooldown = workoutFunctions.selectCooldown(cooldowns);
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
		name: "BOGDAT",
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

  // console.log('repeatIntervals');

  var seconds = 0;
  var selectedSwim = getThingViaTimeLimit("time", secondsLeft, swims);

  // console.log(`repeating interval of type ${selectedSwim.name}`)

  while (seconds + selectedSwim.time <= secondsLeft) {
    var timeLeft = secondsLeft - seconds;
    var maxRepetition = Math.floor(timeLeft / selectedSwim.time);

    // attempt to keep max length 200 or less
    maxRepetition = maxRepetition * selectedSwim.interval > 8 ? Math.floor(8 / selectedSwim.interval) : maxRepetition;
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
