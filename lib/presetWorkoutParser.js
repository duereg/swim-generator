function normalizeText(text) {
  return text
    .replace(/\u00ad/g, '-')
    .replace(/\u2013/g, '-')
    .replace(/\u2014/g, '-')
    .replace(/\u00a0/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\u2028/g, '\n')
    .replace(/\u2029/g, '\n')
    // Docx extraction corruption: "3 ,zzz★x 100" → "3 x 100"
    .replace(/(\d+)\s*,?\s*zzz★?\s*[x×]\s+/gi, '$1 x ');
}

const INTERVAL_LINE_RE = /^[\u2022•\-\s]*(\d+)\s*[x×]\s*(\d+)\s*(.*?)\s*(?:@|on)\s*(\d*:?\d+(?:\.\d+)?)\s*(.*)$/i;
const SINGLE_INTERVAL_RE = /^[\u2022•\-\s]*(\d+)\s+(.+?)\s*(?:@|on)\s*(\d*:?\d+(?:\.\d+)?)\s*(.*)$/i;
const GOAL_SUFFIX_RE = /(?:\(Goal\s*)?<\s*(\d*:?\d+(?:\.\d+)?)\s*\)?\s*$/i;
const PROSE_GOAL_RE = /Goal Time If You(?:'|'|\u2019)re Fit:\s*Under\s*(\d*:?\d+)/i;
const PROSE_GOAL_NOT_RE = /Goal Time If You(?:'|'|\u2019)re Not:\s*Under\s*(\d*:?\d+)/i;

function stripGoalSuffix(text) {
  return text
    .replace(/\s*(?:\(Goal\s*)?<\s*\d*:?\d+(?:\.\d+)?\s*\)?\s*$/i, '')
    .replace(/\s*\([^)]*Descend[^)]*\)\s*$/i, '')
    .replace(/\s+Descending\s*$/i, '')
    .trim();
}

function classifyLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return { kind: 'blank' };
  if (/^warm[-\s]?up/i.test(trimmed)) return { kind: 'warmup', text: trimmed };
  if (/^cool\s?down/i.test(trimmed)) return { kind: 'cooldown', text: trimmed };
  if (/^if you need more|^to make harder|^for a bit extra|^add to the end|^add these|^for extra|^the original set was/i.test(trimmed)) {
    return { kind: 'extraStart', text: trimmed };
  }
  if (/^\*if this is too easy/i.test(trimmed)) return { kind: 'extraStart', text: trimmed };

  const intervalMatch = trimmed.match(INTERVAL_LINE_RE);
  if (intervalMatch) {
    const [, reps, distance, activity, sendOff, tail] = intervalMatch;
    const hasGoalTime = GOAL_SUFFIX_RE.test(tail) || GOAL_SUFFIX_RE.test(trimmed);
    return {
      kind: 'interval',
      reps: parseInt(reps, 10),
      distance: parseInt(distance, 10),
      activity: stripGoalSuffix(activity) || 'swim',
      hasSendOff: true,
      hasGoalTime,
      originalSendOff: sendOff.trim(),
    };
  }

  const singleMatch = trimmed.match(SINGLE_INTERVAL_RE);
  if (singleMatch && !/^[x×]/i.test(trimmed)) {
    const [, distance, activity, sendOff, tail] = singleMatch;
    const hasGoalTime = GOAL_SUFFIX_RE.test(tail) || GOAL_SUFFIX_RE.test(trimmed);
    return {
      kind: 'interval',
      reps: 1,
      distance: parseInt(distance, 10),
      activity: stripGoalSuffix(activity) || 'swim',
      hasSendOff: true,
      hasGoalTime,
      originalSendOff: sendOff.trim(),
    };
  }

  if (/\+\s*\d+\s*(?:seconds rest|sec|$)/i.test(trimmed) || (/\+\d+/.test(trimmed) && /v?kick|flutter|dolphin/i.test(trimmed))) {
    return { kind: 'fixedRest', text: trimmed };
  }
  if (/full recovery|^\d+\s*min rest|^\d+:\d+\s*rest/i.test(trimmed)) {
    return { kind: 'fixedRest', text: trimmed };
  }

  const fitGoal = trimmed.match(PROSE_GOAL_RE);
  if (fitGoal) {
    return { kind: 'proseGoal', text: trimmed, goalVariant: 'fit', goalDistance: 100 };
  }
  const notGoal = trimmed.match(PROSE_GOAL_NOT_RE);
  if (notGoal) {
    return { kind: 'proseGoal', text: trimmed, goalVariant: 'not', goalDistance: 100 };
  }

  if (/^repeat\s+\d+/i.test(trimmed) || /^\d+\s*sets?,/i.test(trimmed) || /^set:/i.test(trimmed)) {
    return { kind: 'note', text: trimmed };
  }

  if (/^total:/i.test(trimmed)) return { kind: 'note', text: trimmed };

  return { kind: 'note', text: trimmed };
}

function splitIntoWorkoutBlocks(sourceText) {
  const text = normalizeText(sourceText);

  if (/^workout\s+\d+/im.test(text)) {
    return text.split(/\f|\n(?=Workout\s+\d+)/i).map((part) => part.trim()).filter(Boolean);
  }

  const rawParts = text
    .split(/\f+/)
    .flatMap((part) => part.split(/\n(?=Warm[-\s]?up)/i))
    .map((part) => part.trim())
    .filter(Boolean);

  const merged = [];
  for (const part of rawParts) {
    const hasWarmup = /^warm[-\s]?up/im.test(part);
    if (!hasWarmup) {
      if (merged.length) {
        merged[merged.length - 1] += `\n${part}`;
      }
      continue;
    }
    merged.push(part);
  }

  return merged;
}

function parseWorkoutBlock(blockText) {
  const lines = blockText.split('\n').map((line) => line.trim()).filter((line) => line.length > 0);
  const titleMatch = lines[0]?.match(/^Workout\s+(\S+)/i);
  const title = titleMatch ? lines[0] : null;
  const contentLines = title ? lines.slice(1) : lines;

  const sections = [];
  let inExtra = false;
  let pendingInterval = null;

  for (const line of contentLines) {
    const classified = classifyLine(line);

    if (classified.kind === 'blank') continue;

    if (classified.kind === 'extraStart') {
      inExtra = true;
      sections.push({ type: 'extra', text: classified.text, isExtra: true });
      pendingInterval = null;
      continue;
    }

    if (inExtra) {
      if (classified.kind === 'interval') {
        sections.push({
          type: 'interval',
          reps: classified.reps,
          distance: classified.distance,
          activity: classified.activity,
          hasSendOff: classified.hasSendOff,
          hasGoalTime: classified.hasGoalTime,
          originalSendOff: classified.originalSendOff,
          isExtra: true,
        });
      } else {
        sections.push({ type: 'extra', text: classified.text, isExtra: true });
      }
      pendingInterval = null;
      continue;
    }

    if (classified.kind === 'interval') {
      pendingInterval = {
        type: 'interval',
        reps: classified.reps,
        distance: classified.distance,
        activity: classified.activity,
        hasSendOff: classified.hasSendOff,
        hasGoalTime: classified.hasGoalTime,
        originalSendOff: classified.originalSendOff,
        activityLines: [],
      };
      sections.push(pendingInterval);
      continue;
    }

    if (pendingInterval && classified.kind === 'note' && !/^total:/i.test(classified.text)) {
      if (/^[A-Z,[\]\s/]+$/i.test(classified.text) && classified.text.length < 80) {
        pendingInterval.activityLines.push(classified.text);
        continue;
      }
    }

    pendingInterval = null;

    if (classified.kind === 'warmup') {
      sections.push({ type: 'warmup', text: classified.text });
    } else if (classified.kind === 'cooldown') {
      sections.push({ type: 'cooldown', text: classified.text });
    } else if (classified.kind === 'fixedRest') {
      sections.push({ type: 'fixedRest', text: classified.text });
    } else if (classified.kind === 'proseGoal') {
      sections.push({
        type: 'proseGoal',
        text: classified.text,
        goalVariant: classified.goalVariant,
        goalDistance: classified.goalDistance,
      });
    } else {
      sections.push({ type: 'note', text: classified.text });
    }
  }

  return { title, sections };
}

export function parsePresetWorkoutText(sourceText) {
  const blocks = splitIntoWorkoutBlocks(sourceText);
  return blocks.map(parseWorkoutBlock);
}
