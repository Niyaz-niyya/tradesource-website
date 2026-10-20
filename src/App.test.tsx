import { describe, expect, it } from 'vitest';
import { categories, services } from './data/content';

describe('content model',()=>{
  it('contains all approved categories',()=>expect(categories).toHaveLength(12));
  it('contains all five core services',()=>expect(services).toHaveLength(5));
  it('has stable unique slugs',()=>expect(new Set(categories.map(c=>c.slug)).size).toBe(12));
});
