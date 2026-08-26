import { PRESET_PLANS, getPresetPlan } from './data/presetPlans.js';
import { parsePresetWorkoutText } from './presetWorkoutParser.js';
import { applyCssAndFormat } from './presetWorkoutFormat.js';
import { parseCssTimeToSeconds } from './css.js';

const parsedCache = new Map();

function getParsedWorkouts(planId) {
  if (parsedCache.has(planId)) {
    return parsedCache.get(planId);
  }

  const plan = getPresetPlan(planId);
  if (!plan) {
    return null;
  }

  const workouts = parsePresetWorkoutText(plan.sourceText);
  parsedCache.set(planId, workouts);
  return workouts;
}

function getWorkoutHeader(plan, workoutIndex) {
  if (plan.swimsPerWeek) {
    const week = Math.floor(workoutIndex / plan.swimsPerWeek) + 1;
    const swim = (workoutIndex % plan.swimsPerWeek) + 1;
    return `Week ${week}, Swim ${swim}`;
  }
  return null;
}

export function listPresetPlans() {
  return Object.values(PRESET_PLANS).map(({ id, name }) => ({
    id,
    name,
  }));
}

export function generatePresetPlan(planId, cssTimeMmSs, options = {}) {
  const plan = getPresetPlan(planId);
  if (!plan) {
    return `Error: Unknown preset plan "${planId}".`;
  }

  if (parseCssTimeToSeconds(cssTimeMmSs) === null) {
    return "Error: Invalid CSS time format. Please use MM:SS (e.g., '1:20').";
  }

  const workouts = getParsedWorkouts(planId);
  if (!workouts || workouts.length === 0) {
    return `Error: No workouts found for plan "${planId}".`;
  }

  const parts = workouts.map((workout, index) => {
    const header = getWorkoutHeader(plan, index);
    const body = applyCssAndFormat(workout, cssTimeMmSs, options);

    if (header) {
      return `${header}\n${body}`;
    }
    return body;
  });

  return parts.join('\n\n');
}
