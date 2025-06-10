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

  exports.generatePattern = generatePattern;
  exports.generateWorkout = generateWorkout;

}));
//# sourceMappingURL=swim-generator.umd.js.map
