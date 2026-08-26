import { expect } from 'chai';
import { parseTenWeekSpeedPlan, formatSessionHeader } from '../lib/tenWeekSpeedParser.js';
import { TEN_WEEK_SPEED } from '../lib/data/presetSources.js';
import { generatePresetPlan, listPresetPlans } from '../lib/presetWorkouts.js';

describe('tenWeekSpeedParser', () => {
  const sessions = parseTenWeekSpeedPlan(TEN_WEEK_SPEED);

  it('should parse week 1 with 8 sessions', () => {
    const week1 = sessions.filter((session) => session.week === 1);
    expect(week1).to.have.length(8);
  });

  it('should map week 1 swim 1 to Mon–Fri', () => {
    const swim1 = sessions.filter((session) => session.week === 1 && session.slot === 1);
    expect(swim1.map((session) => session.day)).to.deep.equal([
      'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
    ]);
    expect(swim1[0]).to.deep.include({ yards: 4000, energySystem: 'EN1' });
    expect(swim1[4]).to.deep.include({ yards: 4200, energySystem: 'EN1' });
  });

  it('should map week 1 swim 2 to Mon, Wed, Fri', () => {
    const swim2 = sessions.filter((session) => session.week === 1 && session.slot === 2);
    expect(swim2.map((session) => session.day)).to.deep.equal([
      'Monday', 'Wednesday', 'Friday',
    ]);
    expect(swim2[0]).to.deep.include({ yards: 2000, energySystem: 'EN3' });
    expect(swim2[1]).to.deep.include({ yards: 3000, energySystem: 'SP1' });
    expect(swim2[2]).to.deep.include({ yards: 2200, energySystem: 'EN2' });
  });

  it('should parse week 10 with 2 sessions and skip REST days', () => {
    const week10 = sessions.filter((session) => session.week === 10);
    expect(week10).to.have.length(2);
    expect(week10[0]).to.deep.include({ day: 'Monday', yards: 3000, energySystem: 'EN2' });
    expect(week10[1]).to.deep.include({ day: 'Tuesday', yards: 3000, energySystem: 'EN3' });
  });

  it('should fix week 7 Friday typo to 3800 SP1', () => {
    const friday = sessions.find((session) => session.week === 7 && session.day === 'Friday');
    expect(friday).to.deep.include({ yards: 3800, energySystem: 'SP1' });
  });

  it('should format session headers', () => {
    expect(formatSessionHeader({
      week: 3,
      day: 'Wednesday',
      slot: 2,
      yards: 3000,
      energySystem: 'SP1',
    })).to.equal('Week 3, Wednesday (Swim 2) — 3000 SP1');
  });
});

describe('TEN_WEEK_SPEED preset', () => {
  it('should list the 10-week speed plan', () => {
    const plans = listPresetPlans();
    expect(plans).to.have.length(4);
    expect(plans.find((plan) => plan.id === 'TEN_WEEK_SPEED')).to.deep.include({
      name: '10-Week Speed Development',
    });
  });

  it('should generate full 10-week macro plan', () => {
    const result = generatePresetPlan('TEN_WEEK_SPEED', '1:20');
    expect(result).to.include('Week 1, Monday (Swim 1) — 4000 EN1');
    expect(result).to.include('Week 10, Tuesday (Swim 1) — 3000 EN3');
    expect(result).to.match(/warmup/i);
    expect(result).to.include('Energy System Focus: EN1');
    expect(result).to.include('Workout Type: ENDURANCE_BASE');
    expect(result).to.include('Workout Type: THRESHOLD_SUSTAINED');
    expect(result).to.not.match(/Workout Type: undefined/);
    expect(result).to.not.match(/Estimated AVG pace for main set: \d+:\d+\.\d/);
    expect(result).to.not.match(/@ CSS/);
    expect(result).to.match(/@ 1:20/);
    expect(result).to.not.match(/Error:/);
  });

  it('should return error for invalid CSS', () => {
    const result = generatePresetPlan('TEN_WEEK_SPEED', 'invalid');
    expect(result).to.match(/Error: Invalid CSS/);
  });
});
