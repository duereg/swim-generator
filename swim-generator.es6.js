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

var en1Distances = [200, 300, 400, 500];
var ENDURANCE_BASE = function ENDURANCE_BASE(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
  var sets = [];
  var mainSetTotalDist = 0;
  var targetPacePer100 = cssSecondsPer100 + Math.random() * 5;
  if (remainingDistanceForMainSet < 25) {
    return {
      sets: sets,
      mainSetTotalDist: 0,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: "Endurance Base (".concat(energySystem, ") set - too short.")
    };
  }
  var en1RepDist = 0;
  var numEn1Reps = 0;
  if (remainingDistanceForMainSet < 200) {
    // Path for 25-199 yards
    var shortEn1Dists = [150, 125, 100, 75, 50, 25]; // Largest to smallest
    for (var _i = 0, _shortEn1Dists = shortEn1Dists; _i < _shortEn1Dists.length; _i++) {
      var dist = _shortEn1Dists[_i];
      if (remainingDistanceForMainSet >= dist) {
        en1RepDist = dist;
        numEn1Reps = Math.floor(remainingDistanceForMainSet / en1RepDist);
        break; // Found the largest fitting repDist from short list
      }
    }
  } else if (remainingDistanceForMainSet <= 600) {
    // Path for 200-600 yards
    var midEn1Dists = [300, 250, 200, 150, 100, 75, 50]; // Ordered to try larger ones first
    var bestCurrentRepDist = 0;
    var bestCurrentNumReps = 0;
    var smallestRemainderSoFar = Infinity;
    for (var _i2 = 0, _midEn1Dists = midEn1Dists; _i2 < _midEn1Dists.length; _i2++) {
      var _dist = _midEn1Dists[_i2];
      if (remainingDistanceForMainSet >= _dist) {
        var currentNumReps = Math.floor(remainingDistanceForMainSet / _dist);
        // Apply a cap on reps for this mid-range to avoid too many short reps
        var maxRepsForDist = 5; // Default cap
        if (_dist >= 200) maxRepsForDist = 3;else if (_dist >= 150) maxRepsForDist = 4;
        currentNumReps = Math.min(currentNumReps, maxRepsForDist);
        if (currentNumReps === 0) continue;
        var currentRemainder = remainingDistanceForMainSet - currentNumReps * _dist;
        if (currentRemainder < smallestRemainderSoFar) {
          smallestRemainderSoFar = currentRemainder;
          bestCurrentRepDist = _dist;
          bestCurrentNumReps = currentNumReps;
        } else if (currentRemainder === smallestRemainderSoFar) {
          if (_dist > bestCurrentRepDist) {
            // Prefer larger repDist if remainder is same
            bestCurrentRepDist = _dist;
            bestCurrentNumReps = currentNumReps;
          }
        }
      }
    }
    en1RepDist = bestCurrentRepDist;
    numEn1Reps = bestCurrentNumReps;
  } else {
    // Path for > 600 yards
    var selectedDist = en1Distances[Math.floor(Math.random() * en1Distances.length)]; // [200,300,400,500]
    if (selectedDist > remainingDistanceForMainSet) {
      // Should be rare if remaining > 600
      for (var j = en1Distances.length - 1; j >= 0; j--) {
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
    if (numEn1Reps > 0) {
      // Check again after potential adjustment
      var en1Rest = "r".concat(Math.floor(Math.random() * (60 - 30 + 1)) + 30, "\"");
      sets.push("".concat(numEn1Reps, "x").concat(en1RepDist, " ").concat(energySystem, " focus swim/kick ").concat(en1Rest));
      mainSetTotalDist = numEn1Reps * en1RepDist;
    } else {
      mainSetTotalDist = 0;
    }
  } else {
    mainSetTotalDist = 0;
  }
  return {
    sets: sets,
    mainSetTotalDist: mainSetTotalDist,
    targetPacePer100: targetPacePer100,
    descriptiveMessage: "Endurance Base (".concat(energySystem, ") set.")
  };
};

var en2Distances = [100, 200, 300, 400];
var THRESHOLD_SUSTAINED = function THRESHOLD_SUSTAINED(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
  var sets = [];
  var mainSetTotalDist = 0;
  var targetPacePer100 = cssSecondsPer100 + (Math.random() * 3 - 1.5);
  if (remainingDistanceForMainSet < 25) {
    return {
      sets: sets,
      mainSetTotalDist: 0,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: "Threshold Sustained (".concat(energySystem, ") set - too short.")
    };
  }
  var en2RepDist = en2Distances[Math.floor(Math.random() * en2Distances.length)];
  if (remainingDistanceForMainSet < en2RepDist) {
    var possibleDists = en2Distances.filter(function (d) {
      return d <= remainingDistanceForMainSet;
    });
    if (possibleDists.length > 0) {
      en2RepDist = possibleDists[possibleDists.length - 1];
    } else {
      if (remainingDistanceForMainSet >= 50) {
        en2RepDist = Math.floor(remainingDistanceForMainSet / 50) * 50;
        if (en2RepDist === 0) en2RepDist = 50;
      } else if (remainingDistanceForMainSet >= 25) {
        en2RepDist = 25;
      } else {
        return {
          sets: sets,
          mainSetTotalDist: 0,
          targetPacePer100: targetPacePer100,
          descriptiveMessage: "Threshold Sustained (".concat(energySystem, ") set - too short.")
        };
      }
    }
  }
  var numEn2Reps = en2RepDist > 0 ? Math.floor(remainingDistanceForMainSet / en2RepDist) : 0;
  numEn2Reps = Math.min(numEn2Reps, 25); // Changed cap from 20 to 25
  numEn2Reps = Math.max(numEn2Reps, 1);
  if (numEn2Reps * en2RepDist > remainingDistanceForMainSet) {
    numEn2Reps = 0;
  }
  if (numEn2Reps > 0) {
    var en2Rest = "r".concat(Math.floor(Math.random() * (30 - 20 + 1)) + 20, "\"");
    sets.push("".concat(numEn2Reps, "x").concat(en2RepDist, " ").concat(energySystem, " focus swim ").concat(en2Rest));
    mainSetTotalDist = numEn2Reps * en2RepDist;
  } else {
    mainSetTotalDist = 0;
  }
  return {
    sets: sets,
    mainSetTotalDist: mainSetTotalDist,
    targetPacePer100: targetPacePer100,
    descriptiveMessage: "Threshold Sustained (".concat(energySystem, ") set.")
  };
};

var en3Distances = [50, 100, 150, 200];
var en3SecondaryDistances = [200, 300, 400];
var THRESHOLD_DEVELOPMENT = function THRESHOLD_DEVELOPMENT(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
  var sets = [];
  var mainSetTotalDist = 0;
  var targetPacePer100 = cssSecondsPer100 - Math.random() * 3;
  var en3Rest = "r".concat(Math.floor(Math.random() * (90 - 40 + 1)) + 40, "\"");
  if (remainingDistanceForMainSet < 50) {
    // Minimum for EN3 is typically 50
    return {
      sets: sets,
      mainSetTotalDist: 0,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: "Threshold Development (".concat(energySystem, ") set - too short.")
    };
  }
  var en3RepDist = en3Distances[Math.floor(Math.random() * en3Distances.length)];
  if (remainingDistanceForMainSet < en3RepDist) {
    var possibleDists = en3Distances.filter(function (d) {
      return d <= remainingDistanceForMainSet;
    });
    if (possibleDists.length > 0) {
      en3RepDist = possibleDists[possibleDists.length - 1];
    } else {
      // Should not happen if remainingDistanceForMainSet >= 50 and en3Distances includes 50
      en3RepDist = 0; // will result in numEn3Reps = 0
    }
  }
  var numEn3Reps = en3RepDist > 0 ? Math.floor(remainingDistanceForMainSet / en3RepDist) : 0;
  numEn3Reps = Math.min(numEn3Reps, 20);
  // No Math.max(numEn3Reps, 0) needed as floor will be >=0. If en3RepDist is 0, numEn3Reps is 0.

  if (numEn3Reps > 0) {
    sets.push("".concat(numEn3Reps, "x").concat(en3RepDist, " ").concat(energySystem, " focus swim/kb ").concat(en3Rest));
    mainSetTotalDist = numEn3Reps * en3RepDist;
  }
  var newRemainingDistance = remainingDistanceForMainSet - mainSetTotalDist;
  if (newRemainingDistance > 400) {
    var secondaryDist = en3SecondaryDistances[Math.floor(Math.random() * en3SecondaryDistances.length)];
    if (newRemainingDistance < secondaryDist) {
      // try to pick a smaller secondary dist
      var possibleSecDists = en3SecondaryDistances.filter(function (d) {
        return d <= newRemainingDistance;
      });
      if (possibleSecDists.length > 0) {
        secondaryDist = possibleSecDists[possibleSecDists.length - 1];
      } else {
        secondaryDist = 0; // Cannot fit any secondary
      }
    }
    var secondaryReps = 0;
    if (secondaryDist > 0) {
      secondaryReps = Math.floor(newRemainingDistance / secondaryDist);
    }
    secondaryReps = Math.min(secondaryReps, 10);
    if (secondaryReps > 0) {
      sets.push("".concat(secondaryReps, "x").concat(secondaryDist, " ").concat(energySystem, " focus swim ").concat(en3Rest));
      mainSetTotalDist += secondaryReps * secondaryDist;
    }
  }
  if (mainSetTotalDist === 0 && remainingDistanceForMainSet >= 50) {
    var fallbackDist = en3Distances[0]; // Smallest standard EN3 distance (50)
    if (remainingDistanceForMainSet < fallbackDist) fallbackDist = 0; // Should not happen if initial check is >=50

    if (fallbackDist > 0) {
      var fallbackReps = Math.floor(remainingDistanceForMainSet / fallbackDist);
      fallbackReps = Math.min(fallbackReps, 5); // Cap fallback reps
      if (fallbackReps > 0) {
        sets.push("".concat(fallbackReps, "x").concat(fallbackDist, " ").concat(energySystem, " focus swim ").concat(en3Rest));
        mainSetTotalDist = fallbackReps * fallbackDist;
      }
    }
  }
  return {
    sets: sets,
    mainSetTotalDist: mainSetTotalDist,
    targetPacePer100: targetPacePer100,
    descriptiveMessage: "Threshold Development (".concat(energySystem, ") set.")
  };
};

var sp1Distances = [25, 50, 75, 100];
var sp1Drills = ["swim", "kb", "FU", "HUHO"]; // FU = Fast Underwater, HUHO = Hypoxic Hips Out

var SPEED_ENDURANCE = function SPEED_ENDURANCE(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
  var sets = [];
  var mainSetTotalDist = 0;
  var targetPacePer100 = cssSecondsPer100 - (5 + Math.random() * 5);
  if (remainingDistanceForMainSet < sp1Distances[0]) {
    // sp1Distances[0] is typically 25
    return {
      sets: sets,
      mainSetTotalDist: 0,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: "Speed Endurance (".concat(energySystem, ") set - too short.")
    };
  }
  var numBlocks;
  if (remainingDistanceForMainSet < 600) numBlocks = 1;else if (remainingDistanceForMainSet < 1200) numBlocks = 2;else numBlocks = 3;
  var blockDistRemainingForReps = remainingDistanceForMainSet;
  var accumulatedDist = 0;
  for (var i = 0; i < numBlocks; i++) {
    if (blockDistRemainingForReps < sp1Distances[0]) break;
    var targetDistForCurrentBlock = Math.floor(blockDistRemainingForReps / (numBlocks - i));
    var easyBreakDist = 0;
    var addEasyBreakString = false;
    if (i < numBlocks - 1 && blockDistRemainingForReps - targetDistForCurrentBlock > 100) {
      // Check if there's room for break AND next block
      if (Math.random() > 0.5) {
        if (targetDistForCurrentBlock > 150 && blockDistRemainingForReps - (targetDistForCurrentBlock - 50) >= 50) {
          // Ensure rep part & overall remaining is substantial
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
    var repDist = sp1Distances[Math.floor(Math.random() * sp1Distances.length)];
    if (repDist > targetDistForCurrentBlock && targetDistForCurrentBlock >= sp1Distances[0]) {
      for (var j = sp1Distances.length - 1; j >= 0; j--) {
        if (sp1Distances[j] <= targetDistForCurrentBlock) {
          repDist = sp1Distances[j];
          break;
        }
      }
      if (repDist > targetDistForCurrentBlock && sp1Distances.length > 0 && sp1Distances[0] <= targetDistForCurrentBlock) {
        repDist = sp1Distances[0];
      } else if (repDist > targetDistForCurrentBlock) {
        // Target too small even for smallest sp1Distance
        continue;
      }
    } else if (repDist > targetDistForCurrentBlock) {
      // Initial random was too large, and target is smaller than smallest
      continue;
    }
    if (repDist === 0 && sp1Distances.length > 0) repDist = sp1Distances[0];
    if (repDist === 0) continue; // Should not happen if sp1Distances is not empty

    var numReps = repDist > 0 ? Math.floor(targetDistForCurrentBlock / repDist) : 0;
    numReps = Math.min(numReps, 10); // Changed cap from 12 to 10

    if (numReps > 0) {
      var currentBlockActualRepDist = numReps * repDist;
      var rest = "r".concat(Math.floor(Math.random() * (40 - 30 + 1)) + 30, "\"");
      var drillType = sp1Drills[Math.floor(Math.random() * sp1Drills.length)];
      sets.push("".concat(numReps, "x").concat(repDist, " ").concat(drillType, " (").concat(energySystem, " focus) ").concat(rest));
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
        sets.push("".concat(easyBreakDist, " ez swim"));
        accumulatedDist += easyBreakDist;
        blockDistRemainingForReps -= easyBreakDist;
      }
    }
  }
  mainSetTotalDist = accumulatedDist;
  if (mainSetTotalDist < remainingDistanceForMainSet * 0.75 && remainingDistanceForMainSet > 200) {
    sets.length = 0;
    mainSetTotalDist = 0; // Reset for fallback calculation
    var fallbackRepDist = remainingDistanceForMainSet > 400 && sp1Distances.includes(100) ? 100 : sp1Distances[1];
    if (remainingDistanceForMainSet < fallbackRepDist && sp1Distances.length > 0) fallbackRepDist = sp1Distances[0];
    if (fallbackRepDist > 0) {
      var fallbackNumReps = Math.floor(remainingDistanceForMainSet / fallbackRepDist);
      fallbackNumReps = Math.min(fallbackNumReps, 16);
      if (fallbackNumReps > 0) {
        sets.push("".concat(fallbackNumReps, "x").concat(fallbackRepDist, " swim (").concat(energySystem, " focus) r30\""));
        mainSetTotalDist = fallbackNumReps * fallbackRepDist;
      }
    }
  }
  if (mainSetTotalDist === 0 && remainingDistanceForMainSet >= sp1Distances[0]) {
    var fDist = remainingDistanceForMainSet >= 50 && sp1Distances.includes(50) ? 50 : sp1Distances[0];
    if (remainingDistanceForMainSet < fDist) {
      return {
        sets: sets,
        mainSetTotalDist: 0,
        targetPacePer100: targetPacePer100,
        descriptiveMessage: "Speed Endurance (".concat(energySystem, ") set - too short for fallback.")
      };
    }
    var fReps = Math.floor(remainingDistanceForMainSet / fDist);
    fReps = Math.min(fReps, fDist === 50 ? 8 : 12);
    if (fReps > 0) {
      sets.push("".concat(fReps, "x").concat(fDist, " swim (").concat(energySystem, " focus) r30\""));
      mainSetTotalDist = fReps * fDist;
    }
  }
  return {
    sets: sets,
    mainSetTotalDist: mainSetTotalDist,
    targetPacePer100: targetPacePer100,
    descriptiveMessage: "Speed Endurance (".concat(energySystem, ") set.")
  };
};

var sp2Distances = [25, 50];
var MAX_SPRINT = function MAX_SPRINT(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
  var sets = [];
  var mainSetTotalDist = 0;
  var targetPacePer100 = cssSecondsPer100 - (10 + Math.random() * 15);
  var numReps = 0;
  var repDist = 0;
  var has50 = sp2Distances.includes(50);
  var has25 = sp2Distances.includes(25);
  if (remainingDistanceForMainSet < (has25 ? 25 : has50 ? 50 : Infinity)) {
    return {
      sets: sets,
      mainSetTotalDist: 0,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: "Max Sprint (".concat(energySystem, ") set - too short.")
    };
  }
  var initialRepDist;
  if (has50 && remainingDistanceForMainSet >= 750) {
    initialRepDist = 50;
  } else if (has25) {
    initialRepDist = 25;
  } else if (has50) {
    initialRepDist = 50;
  } else {
    return {
      sets: sets,
      mainSetTotalDist: 0,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: "Max Sprint (".concat(energySystem, ") set - no valid distances.")
    };
  }
  var initialAbsoluteMaxReps = initialRepDist === 50 ? 24 : 32; // Changed from 30:40
  var numRepsForInitialDist = 0;
  if (initialRepDist > 0) {
    numRepsForInitialDist = Math.min(Math.floor(remainingDistanceForMainSet / initialRepDist), initialAbsoluteMaxReps);
  }
  var currentCalcDist = numRepsForInitialDist * initialRepDist;
  repDist = initialRepDist;
  numReps = numRepsForInitialDist;
  if (initialRepDist === 25 && has50) {
    var potentialReps50 = Math.min(Math.floor(remainingDistanceForMainSet / 50), 24); // Changed cap from 30 to 24
    var potentialDist50 = potentialReps50 * 50;
    var isSignificantUndershootWith25s = currentCalcDist < remainingDistanceForMainSet * 0.85;
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
    var sp2Rest = "1'r";
    sets.push("".concat(numReps, "x").concat(repDist, " UW sprint (").concat(energySystem, " focus, breath at wall) @ ").concat(sp2Rest));
  } else {
    mainSetTotalDist = 0;
    sets = [];
  }
  return {
    sets: sets,
    mainSetTotalDist: mainSetTotalDist,
    targetPacePer100: targetPacePer100,
    descriptiveMessage: "Max Sprint (".concat(energySystem, ") set.")
  };
};

var GENERAL_ENDURANCE = function GENERAL_ENDURANCE(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
  var sets = [];
  var mainSetTotalDist = 0;
  var targetPacePer100 = cssSecondsPer100;
  var generalDistances = [400, 300, 200, 100, 50];
  var bestRepDist = 0;
  var bestNumReps = 0;
  var smallestRemainder = Infinity;
  if (remainingDistanceForMainSet < 25) {
    // Smallest possible rep distance
    return {
      sets: sets,
      mainSetTotalDist: 0,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: "General Endurance (".concat(energySystem, ") set - too short.")
    };
  }
  for (var _i = 0, _generalDistances = generalDistances; _i < _generalDistances.length; _i++) {
    var dist = _generalDistances[_i];
    if (remainingDistanceForMainSet >= dist) {
      var currentNumReps = Math.floor(remainingDistanceForMainSet / dist);
      var currentRemainder = remainingDistanceForMainSet - currentNumReps * dist;
      if (currentNumReps > 0) {
        // Only consider if at least one rep is possible
        if (currentRemainder < smallestRemainder) {
          smallestRemainder = currentRemainder;
          bestRepDist = dist;
          bestNumReps = currentNumReps;
        } else if (currentRemainder === smallestRemainder) {
          if (dist > bestRepDist) {
            // Prefer larger rep distance for same remainder
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
      if (bestRepDist === 0) bestRepDist = 50; // if remaining is e.g. 70, floor(70/50)*50 = 50
    } else {
      // remaining is 25 to 49
      bestRepDist = 25;
    }
    if (bestRepDist > 0) bestNumReps = Math.floor(remainingDistanceForMainSet / bestRepDist);
    if (bestNumReps * bestRepDist > remainingDistanceForMainSet) bestNumReps = 0; // safety
  }

  // --- Start of new conservative adjustment logic ---
  if (bestNumReps > 0 && bestRepDist > 0) {
    var calculatedDist = bestNumReps * bestRepDist;
    if (calculatedDist > remainingDistanceForMainSet * 0.80 && bestRepDist >= 200 && bestNumReps > 2) {
      console.log("DEBUG GENERAL_ENDURANCE: Conservative adjustment. Original reps: ".concat(bestNumReps, "x").concat(bestRepDist, ". Reducing reps by 1."));
      bestNumReps--;
    }
  }
  // --- End of new conservative adjustment logic ---

  if (bestNumReps > 0 && bestRepDist > 0) {
    // Ensure still valid after potential decrement
    var restTime = 30;
    if (bestRepDist >= 400) restTime = 45;else if (bestRepDist >= 200) restTime = 30;else if (bestRepDist >= 100) restTime = 20;else restTime = 15;
    sets.push("".concat(bestNumReps, "x").concat(bestRepDist, " swim (").concat(energySystem, " focus) r").concat(restTime, "\""));
    mainSetTotalDist = bestNumReps * bestRepDist;
  } else {
    mainSetTotalDist = 0;
  }
  return {
    sets: sets,
    mainSetTotalDist: mainSetTotalDist,
    targetPacePer100: targetPacePer100,
    descriptiveMessage: "General Endurance (".concat(energySystem, ") default set.")
  };
};

var mainSetDefinitions = {
  'ENDURANCE_BASE': ENDURANCE_BASE,
  'THRESHOLD_SUSTAINED': THRESHOLD_SUSTAINED,
  'THRESHOLD_DEVELOPMENT': THRESHOLD_DEVELOPMENT,
  'SPEED_ENDURANCE': SPEED_ENDURANCE,
  'MAX_SPRINT': MAX_SPRINT,
  'GENERAL_ENDURANCE': GENERAL_ENDURANCE
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
