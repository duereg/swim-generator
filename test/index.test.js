import {expect} from 'chai';

import { generateWorkout, generatePattern } from '../lib/index';

describe('::generatePattern', () => {
  let pattern;

  before(() => {
    pattern = generatePattern(1800);
  });

  it('generates a pattern', () => {
    expect(pattern).to.be.ok;
  });
});

describe('::generateWorkout', () => {
  let pattern;

  before(() => {
    pattern = generateWorkout(1800);
  });

  it('generates a pattern', () => {
    expect(pattern).to.be.ok;
  });
});
