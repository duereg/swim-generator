(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('lodash')) :
  typeof define === 'function' && define.amd ? define(['exports', 'lodash'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.swimGenerator = {}, global._));
})(this, (function (exports, _) { 'use strict';

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

  // Content of lib/data/mainSets/ENDURANCE_BASE.js to be updated:

  var ENDURANCE_BASE = function ENDURANCE_BASE(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
    var sets = [];
    var mainSetTotalDist = 0;
    // New pace: CSS + 5-15 seconds
    var targetPacePer100 = cssSecondsPer100 + 5 + Math.random() * 10;
    if (remainingDistanceForMainSet < 500) {
      return {
        sets: sets,
        mainSetTotalDist: 0,
        targetPacePer100: targetPacePer100,
        descriptiveMessage: "EN1: Too short. Min rep distance 500, available: ".concat(remainingDistanceForMainSet, ".")
      };
    }
    var allPossibleRepDistances = [500, 600, 700, 800, 900, 1000];
    var bestOption = {
      dist: 0,
      reps: 0,
      totalYardage: 0,
      is500: false
    };
    for (var _i = 0, _allPossibleRepDistan = allPossibleRepDistances; _i < _allPossibleRepDistan.length; _i++) {
      var currentDist = _allPossibleRepDistan[_i];
      if (remainingDistanceForMainSet >= currentDist) {
        var currentReps = Math.floor(remainingDistanceForMainSet / currentDist);
        if (currentReps === 0) continue;
        var maxRepsForCurrentDist = void 0;
        if (currentDist === 500) maxRepsForCurrentDist = 12; // e.g. 12x500 is 6000
        else if (currentDist === 600) maxRepsForCurrentDist = 10; // e.g. 10x600 is 6000
        else if (currentDist === 700) maxRepsForCurrentDist = 8; // e.g. 8x700 is 5600
        else if (currentDist === 800) maxRepsForCurrentDist = 7; // e.g. 7x800 is 5600
        else if (currentDist === 900) maxRepsForCurrentDist = 6; // e.g. 6x900 is 5400
        else if (currentDist === 1000) maxRepsForCurrentDist = 6; // e.g. 6x1000 is 6000
        else maxRepsForCurrentDist = 1; // Should not happen with the defined list

        currentReps = Math.min(currentReps, maxRepsForCurrentDist);
        if (currentReps > 0) {
          var currentTotalYardage = currentReps * currentDist;
          var isCurrentDist500 = currentDist === 500;
          if (currentTotalYardage > bestOption.totalYardage) {
            bestOption = {
              dist: currentDist,
              reps: currentReps,
              totalYardage: currentTotalYardage,
              is500: isCurrentDist500
            };
          } else if (currentTotalYardage === bestOption.totalYardage) {
            if (!bestOption.is500 && isCurrentDist500) {
              // Prefer 500s if yardage is same
              bestOption = {
                dist: currentDist,
                reps: currentReps,
                totalYardage: currentTotalYardage,
                is500: isCurrentDist500
              };
            } else if (bestOption.is500 == isCurrentDist500 && currentReps > bestOption.reps) {
              // If 500-status is same, prefer more reps
              bestOption = {
                dist: currentDist,
                reps: currentReps,
                totalYardage: currentTotalYardage,
                is500: isCurrentDist500
              };
            }
          }
        }
      }
    }
    var en1RepDist = bestOption.dist;
    var numEn1Reps = bestOption.reps;
    if (numEn1Reps > 0 && en1RepDist > 0) {
      // Fixed rest
      var en1Rest = 'r60"';
      sets.push("".concat(numEn1Reps, "x").concat(en1RepDist, " ").concat(energySystem, " focus swim/kick ").concat(en1Rest));
      mainSetTotalDist = numEn1Reps * en1RepDist;
    } else {
      // This case should ideally be minimal if remainingDistanceForMainSet >= 500
      mainSetTotalDist = 0;
    }
    var descriptiveMessage;
    if (mainSetTotalDist > 0) {
      descriptiveMessage = "EN1: ".concat(numEn1Reps, "x").concat(en1RepDist, " (").concat(energySystem, "), CSS +5-15s/100m pace guide, 60\" rest.");
    } else if (remainingDistanceForMainSet < 500) {
      // Should be caught at the top
      descriptiveMessage = "EN1: Too short. Min rep distance 500, available: ".concat(remainingDistanceForMainSet, ".");
    } else {
      // remainingDistanceForMainSet >= 500 but no suitable sets found (highly unlikely with the logic)
      descriptiveMessage = "EN1: Could not fit EN1 reps for ".concat(energySystem, ". Available: ").concat(remainingDistanceForMainSet, ".");
    }
    return {
      sets: sets,
      mainSetTotalDist: mainSetTotalDist,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: descriptiveMessage
    };
  };

  var THRESHOLD_SUSTAINED = function THRESHOLD_SUSTAINED(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
    var sets = [];
    var mainSetTotalDist = 0;
    // New pace: At CSS
    var targetPacePer100 = cssSecondsPer100;
    var en2SetPatterns = [
    // Ordered by a rough preference or commonality, can be adjusted
    {
      id: '18x100',
      reps: 18,
      dist: 100,
      rest: 'r10"',
      requiredDist: 18 * 100,
      paceDesc: 'CSS'
    }, {
      id: '10x200',
      reps: 10,
      dist: 200,
      rest: 'r20"',
      requiredDist: 10 * 200,
      paceDesc: 'CSS'
    },
    // For longer intervals, allow variable reps
    {
      id: 'Nx400',
      baseDist: 400,
      rest: 'r40"',
      maxReps: 18,
      paceDesc: 'CSS'
    }, {
      id: 'Nx500',
      baseDist: 500,
      rest: 'r50"',
      maxReps: 14,
      paceDesc: 'CSS'
    }, {
      id: 'Nx600',
      baseDist: 600,
      rest: 'r60"',
      maxReps: 12,
      paceDesc: 'CSS'
    }, {
      id: 'Nx800',
      baseDist: 800,
      rest: 'r90"',
      maxReps: 8,
      paceDesc: 'CSS'
    }, {
      id: 'Nx1000',
      baseDist: 1000,
      rest: 'r90"',
      maxReps: 6,
      paceDesc: 'CSS'
    }];
    var bestFitSet = null;
    var maxAchievedDistance = 0;
    for (var _i = 0, _en2SetPatterns = en2SetPatterns; _i < _en2SetPatterns.length; _i++) {
      var pattern = _en2SetPatterns[_i];
      if (pattern.baseDist) {
        // For NxDist patterns (800, 1000)
        if (remainingDistanceForMainSet >= pattern.baseDist) {
          var numReps = Math.floor(remainingDistanceForMainSet / pattern.baseDist);
          numReps = Math.min(numReps, pattern.maxReps);
          if (numReps > 0) {
            var currentSetTotalDist = numReps * pattern.baseDist;
            if (currentSetTotalDist > maxAchievedDistance) {
              maxAchievedDistance = currentSetTotalDist;
              bestFitSet = {
                reps: numReps,
                dist: pattern.baseDist,
                rest: pattern.rest,
                totalDist: currentSetTotalDist,
                paceDesc: pattern.paceDesc,
                id: "".concat(numReps, "x").concat(pattern.baseDist)
              };
            }
          }
        }
      } else {
        // For fixed rep x dist patterns
        if (remainingDistanceForMainSet >= pattern.requiredDist) {
          // If it fits, it's a candidate. Prefer sets that use more of the available distance.
          if (pattern.requiredDist > maxAchievedDistance) {
            maxAchievedDistance = pattern.requiredDist;
            bestFitSet = {
              reps: pattern.reps,
              dist: pattern.dist,
              rest: pattern.rest,
              totalDist: pattern.requiredDist,
              paceDesc: pattern.paceDesc,
              id: pattern.id
            };
          }
        }
      }
    }

    // Fallback: if no specific pattern fits, try to construct a simpler set.
    // E.g., if remaining is 1200, 18x100 (1800) is too much.
    // Perhaps multiple shorter sets or a smaller version of one.
    // The guidelines are specific about the set structures.
    // If remainingDistanceForMainSet is too small for any of these, it produces no set.
    // Let's try a simpler fallback: if less than the smallest full set (1800), try to do multiples of 100s or 200s at CSS.
    if (!bestFitSet && remainingDistanceForMainSet >= 100) {
      var fallbackDist = 0,
        fallbackReps = 0,
        fallbackRest = '',
        fallbackTotal = 0;
      if (remainingDistanceForMainSet >= 200) {
        // Try 200s first
        fallbackDist = 200;
        fallbackReps = Math.min(Math.floor(remainingDistanceForMainSet / 200), 40);
        fallbackRest = 'r20"';
      } else {
        // Must be 100s
        fallbackDist = 100;
        fallbackReps = Math.min(Math.floor(remainingDistanceForMainSet / 100), 60);
        fallbackRest = 'r10"';
      }
      if (fallbackReps > 0) {
        fallbackTotal = fallbackReps * fallbackDist;
        if (fallbackTotal > 0) {
          // Ensure it's a meaningful set
          bestFitSet = {
            reps: fallbackReps,
            dist: fallbackDist,
            rest: fallbackRest,
            totalDist: fallbackTotal,
            paceDesc: 'CSS',
            id: "".concat(fallbackReps, "x").concat(fallbackDist, " (fallback)")
          };
        }
      }
    }
    var descriptiveMessage;
    if (bestFitSet) {
      sets.push("".concat(bestFitSet.reps, "x").concat(bestFitSet.dist, " ").concat(energySystem, " focus swim @ ").concat(bestFitSet.paceDesc, " ").concat(bestFitSet.rest));
      mainSetTotalDist = bestFitSet.totalDist;
      descriptiveMessage = "EN2: ".concat(bestFitSet.id, " (").concat(energySystem, ") @ CSS.");
    } else {
      mainSetTotalDist = 0;
      if (remainingDistanceForMainSet < 100) {
        descriptiveMessage = "EN2: Too short for EN2 sets. Available: ".concat(remainingDistanceForMainSet, ".");
      } else {
        descriptiveMessage = "EN2: Could not fit standard EN2 set for ".concat(energySystem, ". Available: ").concat(remainingDistanceForMainSet, ".");
      }
    }
    return {
      sets: sets,
      mainSetTotalDist: mainSetTotalDist,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: descriptiveMessage
    };
  };

  var THRESHOLD_DEVELOPMENT = function THRESHOLD_DEVELOPMENT(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
    var sets = [];
    var mainSetTotalDist = 0;
    // New pace: CSS - 1 to 2 seconds
    var targetPacePer100 = cssSecondsPer100 - 1 - Math.random(); // Results in css - 1.0 to css - 1.999...

    var en3SetPatterns = [
    // New Nx patterns for longer distancess
    {
      idFormat: 'Nx400',
      baseDist: 400,
      rest: 'r50"',
      maxReps: 18,
      paceDesc: 'CSS'
    }, {
      idFormat: 'Nx500',
      baseDist: 500,
      rest: 'r60"',
      maxReps: 14,
      paceDesc: 'CSS'
    }, {
      idFormat: 'Nx600',
      baseDist: 600,
      rest: 'r90"',
      maxReps: 12,
      paceDesc: 'CSS'
    }];
    var bestFitSet = null;
    var maxAchievedDistance = 0;
    for (var _i = 0, _en3SetPatterns = en3SetPatterns; _i < _en3SetPatterns.length; _i++) {
      var pattern = _en3SetPatterns[_i];
      if (pattern.baseDist) {
        // For NxDist patterns (800, 1000)
        if (remainingDistanceForMainSet >= pattern.baseDist) {
          var numReps = Math.floor(remainingDistanceForMainSet / pattern.baseDist);
          numReps = Math.min(numReps, pattern.maxReps);
          if (numReps > 0) {
            var currentSetTotalDist = numReps * pattern.baseDist;
            if (currentSetTotalDist > maxAchievedDistance) {
              maxAchievedDistance = currentSetTotalDist;
              bestFitSet = {
                reps: numReps,
                dist: pattern.baseDist,
                rest: pattern.rest,
                totalDist: currentSetTotalDist,
                paceDesc: pattern.paceDesc,
                id: "".concat(numReps, "x").concat(pattern.baseDist) // Dynamic ID
              };
            }
          }
        }
      } else {
        // For fixed rep x dist patterns (4x600, 4x500, 4x400)
        if (remainingDistanceForMainSet >= pattern.requiredDist) {
          // If it fits and is larger than any previously found NxDist set
          if (pattern.requiredDist > maxAchievedDistance) {
            maxAchievedDistance = pattern.requiredDist;
            bestFitSet = {
              reps: pattern.reps,
              dist: pattern.dist,
              rest: pattern.rest,
              totalDist: pattern.requiredDist,
              paceDesc: pattern.paceDesc,
              id: pattern.id // Fixed ID
            };
          }
        }
      }
    }

    // Fallback logic: if remaining distance is less than the smallest fixed set (4x400=1600)
    // but larger than the smallest single rep (400), try to make a smaller set.
    // This prioritizes fitting any of the defined patterns first, even if they are large.
    // If no pattern fits (e.g. remainingDistanceForMainSet is 1200), this fallback kicks in.
    if (!bestFitSet && remainingDistanceForMainSet >= 400) {
      var singleRepOptions = [
      // Keep baseReps for fallback scaling, but try to fill remaining
      {
        dist: 600,
        rest: 'r90"',
        paceDesc: 'CSS -1-2s',
        baseReps: 4
      }, {
        dist: 500,
        rest: 'r60"',
        paceDesc: 'CSS -1-2s',
        baseReps: 4
      }, {
        dist: 400,
        rest: 'r45"',
        paceDesc: 'CSS -1-2s',
        baseReps: 4
      }];
      var bestFallbackOption = null;
      var maxFallbackYardage = 0;
      for (var _i2 = 0, _singleRepOptions = singleRepOptions; _i2 < _singleRepOptions.length; _i2++) {
        var option = _singleRepOptions[_i2];
        if (remainingDistanceForMainSet >= option.dist) {
          // Must be able to do at least one rep
          var _numReps = Math.floor(remainingDistanceForMainSet / option.dist);
          // For fallback, don't necessarily cap at baseReps, try to use up the distance
          // but still keep it reasonable, e.g. not more than maxReps of new patterns if applicable
          // For simplicity here, let's cap at a slightly higher number like 6-8 for fallback
          _numReps = Math.min(_numReps, 6); // Example cap for fallback reps

          if (_numReps > 0) {
            var currentYardage = _numReps * option.dist;
            if (currentYardage > maxFallbackYardage) {
              maxFallbackYardage = currentYardage;
              bestFallbackOption = {
                reps: _numReps,
                dist: option.dist,
                rest: option.rest,
                totalDist: currentYardage,
                paceDesc: option.paceDesc,
                id: "".concat(_numReps, "x").concat(option.dist, " (fallback)")
              };
            }
          }
        }
      }
      if (bestFallbackOption) {
        bestFitSet = bestFallbackOption; // Use this fallback set
      }
    }
    var descriptiveMessage;
    if (bestFitSet) {
      sets.push("".concat(bestFitSet.reps, "x").concat(bestFitSet.dist, " ").concat(energySystem, " focus swim @ ").concat(bestFitSet.paceDesc, " ").concat(bestFitSet.rest));
      mainSetTotalDist = bestFitSet.totalDist; // Use totalDist from the chosen set object
      descriptiveMessage = "EN3: ".concat(bestFitSet.id, " (").concat(energySystem, ") @ ").concat(bestFitSet.paceDesc, ".");
    } else {
      mainSetTotalDist = 0;
      var minReq = 400; // Smallest single rep distance for any consideration
      if (remainingDistanceForMainSet < minReq) {
        descriptiveMessage = "EN3: Too short for EN3 sets (min rep 400). Available: ".concat(remainingDistanceForMainSet, ".");
      } else {
        descriptiveMessage = "EN3: Could not fit standard or fallback EN3 set for ".concat(energySystem, ". Available: ").concat(remainingDistanceForMainSet, ".");
      }
    }
    return {
      sets: sets,
      mainSetTotalDist: mainSetTotalDist,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: descriptiveMessage
    };
  };

  // Content of lib/data/mainSets/SPEED_ENDURANCE.js to be updated:

  var sp1RepDistances = [25, 50, 75, 100]; // Valid rep distances for SP1
  var sp1Drills = ["swim", "kb", "FU", "HUHO"]; // FU = Fast Underwater, HUHO = Hypoxic Hips Out

  // Helper function to get SP1 rest based on rep distance
  var getSp1Rest = function getSp1Rest(repDist) {
    var baseRestSeconds;
    if (repDist === 100) baseRestSeconds = 10; // EN2 rest for 100s
    else if (repDist === 75) baseRestSeconds = 7.5; // Proportional
    else if (repDist === 50) baseRestSeconds = 5; // Proportional
    else if (repDist === 25) baseRestSeconds = 2.5; // Proportional
    else baseRestSeconds = 5; // Default small rest

    // Double or triple EN2 equivalent rest
    var multiplier = 2 + Math.random(); // Randomly between 2x and 3x
    var restSeconds = Math.round(baseRestSeconds * multiplier / 5) * 5; // Round to nearest 5s
    restSeconds = Math.max(restSeconds, 5); // Minimum 5s
    if (repDist === 100) restSeconds = Math.max(restSeconds, 20); // Ensure 100s get at least 20s

    return "r".concat(restSeconds, "\"");
  };
  var SPEED_ENDURANCE = function SPEED_ENDURANCE(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
    var sets = [];
    var mainSetTotalDist = 0;
    // New pace: CSS - 3 to 5 seconds
    var targetPacePer100 = cssSecondsPer100 - 3 - Math.random() * 2;

    // SP1 overall set length: 400 to 800yd.
    // We'll use remainingDistanceForMainSet, but cap it effectively for SP1's typical range.
    var targetSp1TotalYardage = Math.max(400, Math.min(remainingDistanceForMainSet, 4500));
    if (remainingDistanceForMainSet < sp1RepDistances[0]) {
      // Smallest rep is 25
      return {
        sets: sets,
        mainSetTotalDist: 0,
        targetPacePer100: targetPacePer100,
        descriptiveMessage: "SP1: Too short. Min rep 25. Available: ".concat(remainingDistanceForMainSet, ".")
      };
    }
    if (targetSp1TotalYardage < sp1RepDistances[0]) {
      return {
        sets: sets,
        mainSetTotalDist: 0,
        targetPacePer100: targetPacePer100,
        descriptiveMessage: "SP1: Target yardage too low. Available: ".concat(remainingDistanceForMainSet, ".")
      };
    }
    var numBlocks = Math.max(1, Math.ceil(targetSp1TotalYardage / 800)); // Dynamic blocks, avg ~800yd per block

    var accumulatedDistInSp1Set = 0;
    var actualRemainingForSp1Blocks = targetSp1TotalYardage;
    var _loop = function _loop() {
        if (actualRemainingForSp1Blocks < sp1RepDistances[0]) return 0; // break
        var distForCurrentBlock = Math.floor(actualRemainingForSp1Blocks / (numBlocks - i));
        if (distForCurrentBlock < sp1RepDistances[0]) return 1; // continue

        // Select rep distance for the block - try to use a mix, or pick one that fits well
        var repDist = sp1RepDistances[Math.floor(Math.random() * sp1RepDistances.length)];

        // Ensure repDist is not too large for distForCurrentBlock
        if (repDist > distForCurrentBlock) {
          var possibleDists = sp1RepDistances.filter(function (d) {
            return d <= distForCurrentBlock;
          });
          if (possibleDists.length > 0) {
            repDist = possibleDists[possibleDists.length - 1]; // Largest possible that fits
          } else {
            return 1; // continue
            // No suitable repDist for this block's target distance
          }
        }
        if (repDist === 0) return 1; // continue
        var numReps = Math.floor(distForCurrentBlock / repDist);
        numReps = Math.min(numReps, 16); // Cap reps per block (e.g. 16x25=400, 8x50=400, 4x100=400)
        numReps = Math.max(numReps, 1); // Ensure at least one rep

        if (numReps * repDist > distForCurrentBlock) {
          // Adjust if overshoot (should be rare)
          numReps = Math.floor(distForCurrentBlock / repDist);
        }
        if (numReps > 0) {
          var currentBlockActualYardage = numReps * repDist;
          var sp1Rest = getSp1Rest(repDist);
          var drillType = sp1Drills[Math.floor(Math.random() * sp1Drills.length)];
          sets.push("".concat(numReps, "x").concat(repDist, " ").concat(drillType, " (").concat(energySystem, " focus) ").concat(sp1Rest));
          accumulatedDistInSp1Set += currentBlockActualYardage;
          actualRemainingForSp1Blocks -= currentBlockActualYardage;
          if (i < numBlocks - 1 && actualRemainingForSp1Blocks >= sp1RepDistances[0]) {
            // Rest between blocks: 1-2 minutes
            var blockRestSeconds = 60 + Math.floor(Math.random() * 61); // 60 to 120 seconds
            if (blockRestSeconds >= 60) {
              var minutes = Math.floor(blockRestSeconds / 60);
              var seconds = blockRestSeconds % 60;
              if (seconds === 0) sets.push("".concat(minutes, "min rest between SP1 blocks"));else sets.push("".concat(minutes, "min ").concat(seconds, "s rest between SP1 blocks"));
            } else {
              // Should not happen with current logic
              sets.push("".concat(blockRestSeconds, "s rest between SP1 blocks"));
            }
          }
        }
      },
      _ret;
    for (var i = 0; i < numBlocks; i++) {
      _ret = _loop();
      if (_ret === 0) break;
      if (_ret === 1) continue;
    }
    mainSetTotalDist = accumulatedDistInSp1Set;
    var descriptiveMessage;
    if (mainSetTotalDist > 0) {
      descriptiveMessage = "SP1: Lactate Tolerance (".concat(energySystem, "), CSS -3-5s. Total ~").concat(mainSetTotalDist, "yds.");
    } else {
      descriptiveMessage = "SP1: Could not fit SP1 set. Available: ".concat(remainingDistanceForMainSet, ", Target SP1 range: 400-800.");
    }

    // If mainSetTotalDist is very low compared to what was available (e.g. targetSp1TotalYardage was 400, but we only made 100)
    // This might indicate the block division or rep selection was suboptimal.
    // The current logic tries to fill targetSp1TotalYardage.

    return {
      sets: sets,
      mainSetTotalDist: mainSetTotalDist,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: descriptiveMessage
    };
  };

  // Content of lib/data/mainSets/MAX_SPRINT.js to be updated:

  var sp2RepDistances = [25, 50];

  // Helper function to get SP2 rest string (e.g., "1'30"r" or "3'r")
  var getSp2RestString = function getSp2RestString(repDist) {
    var minSec, maxSec;
    if (repDist === 25) {
      minSec = 60; // 1 min
      maxSec = 180; // 3 min
    } else if (repDist === 50) {
      minSec = 180; // 3 min
      maxSec = 300; // 5 min
    } else {
      // Should not happen
      minSec = 60;
      maxSec = 120;
    }
    var totalSeconds = minSec + Math.floor(Math.random() * (maxSec - minSec + 1));
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = totalSeconds % 60;
    var restString = "";
    if (minutes > 0) {
      restString += "".concat(minutes, "'");
    }
    if (seconds > 0) {
      // If there are minutes, and seconds, add a space or separator if needed,
      // but standard notation often just concatenates e.g. 1'30"
      restString += "".concat(seconds, "\"");
    } else if (minutes === 0 && seconds === 0) {
      // Unlikely to be 0 total rest
      restString = '10"'; // Default small rest if somehow 0
    }
    return "r".concat(restString);
  };
  var MAX_SPRINT = function MAX_SPRINT(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
    var sets = [];
    var mainSetTotalDist = 0;
    // New pace: CSS -10 to -15s (near max)
    var targetPacePer100 = cssSecondsPer100 - 10 - Math.random() * 5;

    // SP2 overall set length: 300 to 600yds.
    var targetSp2TotalYardage = Math.max(300, Math.min(remainingDistanceForMainSet, 4500));
    if (remainingDistanceForMainSet < sp2RepDistances[0]) {
      // Smallest rep is 25
      return {
        sets: sets,
        mainSetTotalDist: 0,
        targetPacePer100: targetPacePer100,
        descriptiveMessage: "SP2: Too short. Min rep 25. Available: ".concat(remainingDistanceForMainSet, ".")
      };
    }
    if (targetSp2TotalYardage < sp2RepDistances[0]) {
      return {
        sets: sets,
        mainSetTotalDist: 0,
        targetPacePer100: targetPacePer100,
        descriptiveMessage: "SP2: Target yardage ".concat(targetSp2TotalYardage, " too low. Min rep 25.")
      };
    }
    var repDist = 0;
    var numReps = 0;

    // Decide on rep distance: 25s or 50s.
    // If targetSp2TotalYardage is small (e.g., < 150 for 50s), prefer 25s.
    // Or, if it allows significantly more reps for 25s.
    // Let's try to pick one and stick to it for the set.
    // Prioritize 50s if enough yardage (e.g. >= 150-200), otherwise 25s.

    var canDo50s = targetSp2TotalYardage >= 50; // Min 1 rep of 50
    var canDo25s = targetSp2TotalYardage >= 25; // Min 1 rep of 25

    if (canDo50s && targetSp2TotalYardage >= 150) {
      // Prefer 50s if total yardage is decent
      repDist = 50;
    } else if (canDo25s) {
      repDist = 25;
    } else {
      // Not enough for even a single 25
      return {
        sets: sets,
        mainSetTotalDist: 0,
        targetPacePer100: targetPacePer100,
        descriptiveMessage: "SP2: Not enough yardage for a single rep. Target: ".concat(targetSp2TotalYardage, ".")
      };
    }
    numReps = Math.floor(targetSp2TotalYardage / repDist);
    numReps = Math.max(numReps, 1); // Ensure at least 1 rep if we decided on a repDist

    var actualSetTotalYardage = numReps * repDist;
    if (actualSetTotalYardage > 0) {
      var sp2Rest = getSp2RestString(repDist);
      // Original set string: `${numReps}x${repDist} UW sprint (${energySystem} focus, breath at wall) @ ${sp2Rest}`
      // Keeping similar style. "UW sprint" and "breath at wall" are good specifiers for max effort.
      sets.push("".concat(numReps, "x").concat(repDist, " UW sprint (").concat(energySystem, " focus, breath at wall) ").concat(sp2Rest));
      mainSetTotalDist = actualSetTotalYardage;
    } else {
      // This path should be less likely given the checks.
      mainSetTotalDist = 0;
    }
    var descriptiveMessage;
    if (mainSetTotalDist > 0) {
      descriptiveMessage = "SP2: Lactate Production (".concat(energySystem, "), Near Max Effort. Set: ").concat(numReps, "x").concat(repDist, ". Total ~").concat(mainSetTotalDist, "yds.");
    } else {
      descriptiveMessage = "SP2: Could not fit SP2 set. Available: ".concat(remainingDistanceForMainSet, ", Target SP2 range: 300-600.");
    }
    return {
      sets: sets,
      mainSetTotalDist: mainSetTotalDist,
      targetPacePer100: targetPacePer100,
      descriptiveMessage: descriptiveMessage
    };
  };

  var GENERAL_ENDURANCE = function GENERAL_ENDURANCE(energySystem, cssSecondsPer100, remainingDistanceForMainSet) {
    var sets = [];
    var mainSetTotalDist = 0;
    var targetPacePer100 = cssSecondsPer100;
    var generalDistances = [500, 400, 300, 200, 100, 50];
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
      if (bestRepDist >= 300) restTime = 45;else if (bestRepDist >= 200) restTime = 30;else if (bestRepDist >= 100) restTime = 20;else restTime = 15;
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
      console.warn("Unknown energySystem: ".concat(energySystem, ". Defaulting to GENERAL_ENDURANCE if workoutType param is also not specific."));
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

    // const mainSetResult = workoutComponents.generateMainSet(workoutType, energySystem, cssSecondsPer100, remainingDistanceForMainSet, mainSetDefinitions);
    // Replace with:
    var mainSetResult = workoutFunctions.generateMainSet(internalWorkoutType, energySystem, cssSecondsPer100, remainingDistanceForMainSet, mainSetDefinitions);
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

  exports.generateCssWorkout = generateWorkout$1;
  exports.generatePattern = generatePattern;
  exports.generateWorkout = generateWorkout;

}));
//# sourceMappingURL=swim-generator.umd.js.map
