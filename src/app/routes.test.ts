import { describe, expect, it } from 'vitest';
import { modules } from './routes';

describe('module route manifest', () => {
  it('contains 11 unique bilingual domain routes plus Home', () => {
    expect(modules).toHaveLength(11);
    expect(new Set(modules.map((module) => module.path)).size).toBe(11);
    for (const module of modules) {
      expect(module.path).toMatch(/^\/[a-z0-9-]+$/);
      expect(module.title['zh-TW']).not.toHaveLength(0);
      expect(module.title.en).not.toHaveLength(0);
      expect(module.highlights['zh-TW']).toHaveLength(3);
      expect(module.highlights.en).toHaveLength(3);
    }
  });
});
