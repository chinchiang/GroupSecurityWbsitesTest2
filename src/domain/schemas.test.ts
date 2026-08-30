import { describe, expect, it } from 'vitest';
import { actionCardSchema } from './schemas';
import { actionCards } from '../data/demo';

describe('action card data contract', () => {
  it('accepts every synthetic milestone card', () => {
    expect(actionCards.every((card) => actionCardSchema.safeParse(card).success)).toBe(true);
  });

  it('rejects unsafe source URLs and non-synthetic identifiers', () => {
    const candidate = {
      ...actionCards[0],
      id: 'INC-REAL-1',
      source: { ...actionCards[0]!.source, url: 'http://internal.example/report' },
    };
    expect(actionCardSchema.safeParse(candidate).success).toBe(false);
  });
});
