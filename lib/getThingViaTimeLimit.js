import _ from 'lodash';

export function getThingViaTimeLimit(key, secondsLeft, things, number = 1) {
  let filteredThings = _.filter(things, thing => (thing[key] * number) <= secondsLeft);
  return _.sample(filteredThings);
}
