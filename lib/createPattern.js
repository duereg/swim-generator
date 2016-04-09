import _ from 'lodash';
import swims from './data/swims.json';

function getSwimByLength(secondsLeft, intervalLength, number) {
  if (secondsLeft < 20 * number) {
    console.log(`weird amount of time left: ${secondsLeft}. returning null`);
    return null;
  }

  let selectSwim;
  let numThings = 0;

  let filteredSwims = _.cloneDeep(swims);

  while (!selectSwim) {
    numThings++;
    selectSwim = _.sample(filteredSwims);

    if ((selectSwim.time * number) > secondsLeft) {
      console.log(`swim too long ${selectSwim.time} ${number} ${secondsLeft}`);
      filteredSwims = _.filter(filteredSwims, swim => swim.time < selectSwim.time);
      selectSwim = null;
    } else if ((selectSwim.interval > intervalLength) || (intervalLength % selectSwim.interval !== 0)) {
      console.log(`interval too long ${selectSwim.interval} ${intervalLength}`);
      filteredSwims = _.filter(filteredSwims, swim => swim.interval < selectSwim.interval);
      selectSwim = null;
    }

    if (numThings > 20) {throw new Error(`fuck ${secondsLeft} ${intervalLength} ${number}`);}
  }

  return selectSwim;
}

function createSwimGroupCount(selectedPattern) {
  return _.reduce(selectedPattern.pattern, (result, set) => {
    let swimLength = set.interval[1];

    if(!result[set.group]) {
      result[set.group] = { number: 1, intervalLength: swimLength}
    } else {
      result[set.group].number += 1;
      result[set.group].intervalLength = _.min([result[set.group].intervalLength, swimLength]);
    }

    return result;
  }, {});
}

function mapSwimGroupsToSwims(secondsLeft, selectedPattern, groupsWithCount) {
  let groupsWithSwim = {};

  let sets = selectedPattern.pattern.length;

  // Find a swim which will fit the pattern and the time remaining
  _.forEach(groupsWithCount, (groupSize, key) => {
    let intervalSize = selectedPattern.intervalSize;
    let otherSetTimes = (sets - groupSize.number) * intervalSize * 20;
    let selectedSwim = getSwimByLength(
      secondsLeft - otherSetTimes,
      groupSize.intervalLength,
      groupSize.number * intervalSize
    );

    groupsWithSwim[key] = selectedSwim;
  });

  return groupsWithSwim;
}

export function createSwimsFromPattern(secondsLeft, generatedPattern, selectedPattern) {
  if (secondsLeft < 20) {
    console.log(`weird amount of time left: ${secondsLeft}. returning original pattern`);
    return generatedPattern;
  }

  let groupsWithCount = createSwimGroupCount(selectedPattern);
  let groupsWithSwim = mapSwimGroupsToSwims(secondsLeft, selectedPattern, groupsWithCount);

  // once we've figured out which swims go where, generate the intervals
  _.forEach(selectedPattern.pattern, pattern => {
    let selectedSwim = groupsWithSwim[pattern.group];
    let numIntervals = pattern.interval[0];
    let swimLength = pattern.interval[1];

    // Some swims are > 1 lap
    let intervalMultiplier = swimLength / selectedSwim.interval;
    let totalSwimTime = selectedSwim.time * numIntervals * (intervalMultiplier);

    generatedPattern.seconds += totalSwimTime;
    generatedPattern.intervals.push(
      {
        type: selectedSwim.name,
        length: swimLength * 25,
        number: numIntervals,
        time: selectedSwim.time * intervalMultiplier
      }
    );
  });

  return generatedPattern;
}
