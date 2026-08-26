import {
  calculateGoalSeconds,
  calculateSendOffSeconds,
} from './presetIntervalTiming.js';
import { parseCssTimeToSeconds } from './swimTime.js';

function formatClockSeconds(totalSeconds) {
  const rounded = Math.round(totalSeconds);
  const minutes = Math.floor(rounded / 60);
  const seconds = rounded % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatGoalSeconds(totalSeconds) {
  const rounded = Math.ceil(totalSeconds);
  if (rounded < 60) {
    return `:${rounded.toString().padStart(rounded < 10 ? 2 : 1, '0')}`;
  }
  const minutes = Math.floor(rounded / 60);
  const seconds = rounded % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function formatIntervalLine(section) {
  const repsPrefix = section.reps > 1 ? `${section.reps}x` : section.reps === 1 ? '1x' : '';
  const activity = section.activity || 'swim';
  let line = `${repsPrefix}${section.distance} ${activity}`;

  if (section.hasSendOff && section.sendOffSeconds != null) {
    line += ` @ ${formatClockSeconds(section.sendOffSeconds)}`;
  } else if (section.originalSendOff) {
    line += ` @ ${section.originalSendOff}`;
  }

  if (section.hasGoalTime && section.goalSeconds != null) {
    if (/\(Goal/i.test(section.originalText || '')) {
      line += ` (Goal < ${formatGoalSeconds(section.goalSeconds)})`;
    } else {
      line += ` < ${formatGoalSeconds(section.goalSeconds)}`;
    }
  }

  if (section.activityLines && section.activityLines.length) {
    return [line, ...section.activityLines].join('\n');
  }

  return line;
}

function formatProseGoal(section) {
  const goal = formatGoalSeconds(section.goalSeconds);
  if (section.goalVariant === 'not') {
    return `Goal Time If You're Not: Under ${goal}`;
  }
  return `Goal Time If You're Fit: Under ${goal}`;
}

export function applyCssToWorkout(workout, cssSecondsPer100) {
  const sections = workout.sections.map((section) => {
    if (section.type === 'interval') {
      const updated = { ...section };
      if (section.hasSendOff) {
        updated.sendOffSeconds = calculateSendOffSeconds(section.distance, cssSecondsPer100);
      }
      if (section.hasGoalTime) {
        updated.goalSeconds = calculateGoalSeconds(section.distance, cssSecondsPer100);
      }
      return updated;
    }

    if (section.type === 'proseGoal') {
      const distance = section.goalDistance || 100;
      return {
        ...section,
        goalSeconds: calculateGoalSeconds(distance, cssSecondsPer100),
      };
    }

    return section;
  });

  return { ...workout, sections };
}

export function formatPresetWorkout(workout, options = {}) {
  const { includeExtras = true } = options;
  const lines = [];

  if (workout.title) {
    lines.push(workout.title);
    lines.push('');
  }

  for (const section of workout.sections) {
    if (section.isExtra && !includeExtras) {
      continue;
    }

    if (section.type === 'interval') {
      lines.push(formatIntervalLine(section));
    } else if (section.type === 'proseGoal') {
      lines.push(formatProseGoal(section));
    } else if (section.text) {
      lines.push(section.text);
    }
  }

  return lines.join('\n');
}

export function applyCssAndFormat(workout, cssTimeMmSs, options = {}) {
  const cssSecondsPer100 = parseCssTimeToSeconds(cssTimeMmSs);
  if (cssSecondsPer100 === null) {
    return "Error: Invalid CSS time format. Please use MM:SS (e.g., '1:20').";
  }

  const adjusted = applyCssToWorkout(workout, cssSecondsPer100);
  return formatPresetWorkout(adjusted, options);
}
