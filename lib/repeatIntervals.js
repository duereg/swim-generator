import _ from 'lodash';
import {getThingViaTimeLimit} from './getThingViaTimeLimit';
import swims from './data/swims.json';

export function repeatIntervals(secondsLeft, generatedPattern) {
  if (secondsLeft < 20) {
    console.log(`weird amount of time left: ${secondsLeft}. returning original pattern`);
    return generatedPattern;
  }

  console.log('repeatIntervals');

  let seconds = 0;
  let selectedSwim = getThingViaTimeLimit("time", secondsLeft, swims);

  console.log(`repeating interval of type ${selectedSwim.name}`)

  while (seconds + selectedSwim.time <= secondsLeft) {
    let timeLeft = secondsLeft - seconds;
    let maxRepetition = Math.floor(timeLeft / selectedSwim.time);

    // attempt to keep max length 200 or less
    maxRepetition = (maxRepetition * selectedSwim.interval) > 8 ?
      Math.floor(8 / selectedSwim.interval) :
      maxRepetition;

    let intervalLength = _.random(1, maxRepetition);
    let secondsToAdd = selectedSwim.time * intervalLength;

    console.log('adding swim', selectedSwim);

    seconds += secondsToAdd;
    generatedPattern.seconds += secondsToAdd;
    generatedPattern.intervals.push(
      {
        type: selectedSwim.name,
        length: selectedSwim.interval * 25 * intervalLength,
        number: 1,
        time: secondsToAdd
      }
    );
  }

  return generatedPattern;
}
