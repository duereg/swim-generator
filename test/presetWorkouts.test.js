import { expect } from 'chai';
import { parsePresetWorkoutText } from '../lib/presetWorkoutParser.js';
import {
  roundToNearest15,
  calculateSendOffSeconds,
  calculateGoalSeconds,
} from '../lib/presetIntervalTiming.js';
import {
  listPresetPlans,
  generatePresetPlan,
} from '../lib/presetWorkouts.js';

describe('presetIntervalTiming', () => {
  const css = 80; // 1:20 per 100

  describe('roundToNearest15', () => {
    it('should round 214s to 210s (3:30)', () => {
      expect(roundToNearest15(214)).to.equal(210);
    });

    it('should round 220s to 225s (3:45)', () => {
      expect(roundToNearest15(220)).to.equal(225);
    });

    it('should leave 360s unchanged', () => {
      expect(roundToNearest15(360)).to.equal(360);
    });
  });

  describe('CSS 1:20 calculations', () => {
    it('should compute 100y SP1 send-off on 15s boundary', () => {
      expect(calculateSendOffSeconds(100, css)).to.equal(120);
    });

    it('should compute 200y SP1 send-off on 15s boundary', () => {
      expect(calculateSendOffSeconds(200, css)).to.equal(210);
    });

    it('should compute 400y EN2 send-off on 15s boundary', () => {
      expect(calculateSendOffSeconds(400, css)).to.equal(360);
    });

    it('should compute exact 100y goal without rounding', () => {
      expect(Math.round(calculateGoalSeconds(100, css))).to.equal(77);
    });

    it('should compute exact 200y goal without rounding', () => {
      expect(Math.round(calculateGoalSeconds(200, css))).to.equal(154);
    });
  });
});

describe('presetWorkoutParser', () => {
  it('should parse a simple interval line', () => {
    const [workout] = parsePresetWorkoutText('Warm-up (300-500 yds)\n10x100 HUHO @ 1:30\nCooldown (300-500 yds)');
    const interval = workout.sections.find((s) => s.type === 'interval');
    expect(interval.reps).to.equal(10);
    expect(interval.distance).to.equal(100);
    expect(interval.activity).to.equal('HUHO');
    expect(interval.hasGoalTime).to.be.false;
  });

  it('should parse inline goal times', () => {
    const [workout] = parsePresetWorkoutText('Warm-up\n2 x 200 HUHO @ 2:45 < 2:16\nCooldown');
    const interval = workout.sections.find((s) => s.type === 'interval');
    expect(interval.hasGoalTime).to.be.true;
  });

  it('should parse parenthetical goal times', () => {
    const [workout] = parsePresetWorkoutText('Warm-up\n200 HUHO @ 3:15 (Goal < 2:12)\nCooldown');
    const interval = workout.sections.find((s) => s.type === 'interval');
    expect(interval.hasGoalTime).to.be.true;
  });

  it('should pass through VKick fixed rest lines', () => {
    const [workout] = parsePresetWorkoutText('Warm-up\n100 VKick +30\nCooldown');
    expect(workout.sections.some((s) => s.type === 'fixedRest')).to.be.true;
  });

  it('should parse library workout titles', () => {
    const workouts = parsePresetWorkoutText('Workout 1b\nWarm-up\n2 x 150 HUHO @ 2:10\nCooldown');
    expect(workouts[0].title).to.match(/Workout 1b/i);
  });

  it('should parse docx-corrupted rep scheme as 3x100', () => {
    const [workout] = parsePresetWorkoutText('Warm-up\n3 ,zzz★x 100 Huho @ 1:30\nCooldown');
    const interval = workout.sections.find((s) => s.type === 'interval');
    expect(interval.reps).to.equal(3);
    expect(interval.distance).to.equal(100);
    expect(interval.activity).to.match(/Huho/i);
  });
});

describe('presetWorkouts API', () => {
  it('should list all preset plans', () => {
    expect(listPresetPlans()).to.have.length(5);
  });

  it('should generate full 9-week plan with week/swim headers', () => {
    const result = generatePresetPlan('NINE_WEEK_2X', '1:20');
    expect(result).to.include('Week 1, Swim 1');
    expect(result).to.include('Week 9, Swim 2');
    expect(result).to.include('Warm-up');
    expect(result).to.include('@ 2:00');
    expect(result).to.not.match(/Error:/);
  });

  it('should generate full 23-workout library with CSS-adjusted intervals', () => {
    const result = generatePresetPlan('LIBRARY_23', '1:20');
    expect(result).to.include('Workout 1b');
    expect(result).to.include('Workout 23b');
    expect(result).to.include('@ 3:30');
    expect(result).to.include('< 2:34');
    expect(result).to.not.match(/<\s*[\d:]+\.\d/);
    expect(result).to.include('8x50 HUHO @ 1:15 < :39');
  });

  it('should return error for invalid CSS', () => {
    const result = generatePresetPlan('LIBRARY_23', 'invalid');
    expect(result).to.match(/Error: Invalid CSS/);
  });
});
