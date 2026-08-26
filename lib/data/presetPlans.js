import {
  FOUR_WEEK,
  NINE_WEEK,
  LIBRARY_24,
  TEN_WEEK_SPEED,
} from './presetSources.js';

export const PRESET_PLANS = {
  FOUR_WEEK_4X: {
    id: 'FOUR_WEEK_4X',
    name: '4-Week Plan (4 swims/week)',
    swimsPerWeek: 4,
    weeks: 4,
    sourceText: FOUR_WEEK,
  },
  NINE_WEEK_2X: {
    id: 'NINE_WEEK_2X',
    name: '9-Week Plan (2 swims/week)',
    swimsPerWeek: 2,
    weeks: 9,
    sourceText: NINE_WEEK,
  },
  TEN_WEEK_SPEED: {
    id: 'TEN_WEEK_SPEED',
    name: '10-Week Speed Development',
    kind: 'macro',
    weeks: 10,
    sourceText: TEN_WEEK_SPEED,
  },
  LIBRARY_24: {
    id: 'LIBRARY_24',
    name: '24 Swim Workouts',
    sourceText: LIBRARY_24,
  },
};

export function getPresetPlan(planId) {
  return PRESET_PLANS[planId] || null;
}
