import _ from 'lodash';
import swims from './data/swims.json';
import patterns from './data/patterns.json';
import {getThingViaTimeLimit} from './getThingViaTimeLimit';
import {repeatIntervals} from './repeatIntervals';
import {createSwimsFromPattern} from './createPattern';

function doubleLengths(pattern) {
  console.log('doubleLengths');

  pattern.seconds *= 2;

  _.forEach(pattern.intervals, interval => {
    interval.length *= 2;
    interval.time *= 2;
  });
}

function doubleIntervals(pattern) {
  console.log('doubleIntervals');
  pattern.seconds *= 2;

  _.forEach(pattern.intervals, interval => {
    interval.number *= 2;
  });
}

export function generatePattern(seconds, generatedPattern = { seconds: 0, intervals: [] }) {
  if (seconds < 20) {
    console.log(`weird amount of time left: ${seconds}. returning generated pattern`);
    return generatedPattern;
  }

  console.log('generatePattern');

  let swimGroupKey = {};
  let timeLeft = seconds - generatedPattern.seconds;
  let selectedPattern = getThingViaTimeLimit("minTime", timeLeft, patterns);

  console.log(`attempting to generate ${selectedPattern.name} pattern, which needs ${selectedPattern.minTime}, and has ${timeLeft}`)

  if (selectedPattern.repeat === true) {
    return repeatIntervals(timeLeft, generatedPattern);
  } else {
    return createSwimsFromPattern(timeLeft, generatedPattern, selectedPattern);
  }
}

export function generateWorkout(seconds) {
  if (!seconds) { throw new Error('Give me time!'); }

  let pattern = generatePattern(seconds);

  while ((pattern.seconds < (seconds / 2)) && (pattern.seconds > 20)) {
    switch(_.random(1,3)) {
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

  console.log(pattern);

  while (seconds - pattern.seconds > 20) {
    generatePattern(seconds, pattern);
  }

  console.log(pattern);

  return pattern;
}
