const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const SWIM2_DAY_INDICES = [0, 2, 4];
const SESSION_RE = /^(\d+)\s+(EN[123]|SP[12])$/i;
const REST_RE = /^REST$/i;

function parseSessionToken(token) {
  const match = token.match(SESSION_RE);
  if (!match) return null;
  return {
    yards: parseInt(match[1], 10),
    energySystem: match[2].toUpperCase(),
  };
}

function parseWeekBlock(weekNumber, blockText) {
  const body = blockText.split(/\n(?:Swimming\s*:|Description:)/i, 1)[0];
  const lines = body.split('\n').map((line) => line.trim()).filter(Boolean);

  const mondayIndex = lines.indexOf('Monday');
  if (mondayIndex === -1 || lines[mondayIndex + 4] !== 'Friday') {
    return [];
  }

  const swim1Index = lines.indexOf('Swim 1', mondayIndex);
  if (swim1Index === -1) {
    return [];
  }

  const swim1Tokens = [];
  const swim2Tokens = [];
  let mode = 'swim1';

  for (let i = swim1Index + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (line === 'Swim 2') {
      mode = 'swim2';
      continue;
    }
    if (SESSION_RE.test(line) || REST_RE.test(line)) {
      (mode === 'swim2' ? swim2Tokens : swim1Tokens).push(line);
    }
  }

  const sessions = [];

  swim1Tokens.forEach((token, index) => {
    if (REST_RE.test(token)) return;
    const parsed = parseSessionToken(token);
    if (!parsed) return;
    sessions.push({
      week: weekNumber,
      day: DAYS[index],
      slot: 1,
      yards: parsed.yards,
      energySystem: parsed.energySystem,
    });
  });

  swim2Tokens.forEach((token, index) => {
    if (REST_RE.test(token)) return;
    const parsed = parseSessionToken(token);
    if (!parsed) return;
    sessions.push({
      week: weekNumber,
      day: DAYS[SWIM2_DAY_INDICES[index]],
      slot: 2,
      yards: parsed.yards,
      energySystem: parsed.energySystem,
    });
  });

  return sessions;
}

export function parseTenWeekSpeedPlan(sourceText) {
  const parts = sourceText.split(/Week\s+(\d+)\s*:/i);
  const sessions = [];

  for (let i = 1; i < parts.length; i += 2) {
    const weekNumber = parseInt(parts[i], 10);
    const blockText = parts[i + 1] || '';
    sessions.push(...parseWeekBlock(weekNumber, blockText));
  }

  return sessions;
}

export function formatSessionHeader(session) {
  return `Week ${session.week}, ${session.day} (Swim ${session.slot}) — ${session.yards} ${session.energySystem}`;
}
