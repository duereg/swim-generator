import {
  SPEED_ENDURANCE_CONFIG,
  THRESHOLD_SUSTAINED_CONFIG,
} from './data/mainSetConfigs.js';
import { calculateTargetPace } from './workoutGenerator.js';

const SHORT_INTERVAL_MAX_DISTANCE = 200;

export function roundToNearest15(totalSeconds) {
  return Math.round(totalSeconds / 15) * 15;
}

export function getConfigForDistance(distance) {
  return distance <= SHORT_INTERVAL_MAX_DISTANCE
    ? SPEED_ENDURANCE_CONFIG
    : THRESHOLD_SUSTAINED_CONFIG;
}

export function getDeterministicPaceConfig(paceConfig) {
  if (!paceConfig) return null;
  const { baseMetric, offset, operator } = paceConfig;
  return { baseMetric, offset: offset || 0, operator };
}

export function getRestSecondsForDistance(distance, config) {
  const definitions = [...config.setDefinitions].sort((a, b) => a.distance - b.distance);
  let match = definitions.filter((def) => def.distance <= distance).pop();
  if (!match) {
    match = definitions[0];
  }
  return match.rest;
}

export function calculateSwimSeconds(distance, cssSecondsPer100) {
  const config = getConfigForDistance(distance);
  const targetPacePer100 = calculateTargetPace(
    cssSecondsPer100,
    getDeterministicPaceConfig(config.paceConfig)
  );
  return (distance / 100) * targetPacePer100;
}

export function calculateSendOffSeconds(distance, cssSecondsPer100) {
  const config = getConfigForDistance(distance);
  const swimSeconds = calculateSwimSeconds(distance, cssSecondsPer100);
  const restSeconds = getRestSecondsForDistance(distance, config);
  return roundToNearest15(swimSeconds + restSeconds);
}

export function calculateGoalSeconds(distance, cssSecondsPer100) {
  return calculateSwimSeconds(distance, cssSecondsPer100);
}
