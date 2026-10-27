import { describe, expect, it } from 'vitest';
import { categories, services } from './data/content';

describe('content model',()=>{
  it('contains all approved categories',()=>expect(categories).toHaveLength(12));
  it('contains all approved subcategories',()=>expect(categories.flatMap(c=>c.subcategories)).toHaveLength(71));
  it('contains all five core services',()=>expect(services).toHaveLength(5));
  it('has stable unique slugs',()=>expect(new Set(categories.map(c=>c.slug)).size).toBe(12));
  it('has no duplicate subcategories in any language',()=>{
    for(const locale of ['en','zh','ar'] as const){
      const subcategories=categories.flatMap(c=>c.subcategories.map(s=>s[locale].toLocaleLowerCase()));
      expect(new Set(subcategories).size).toBe(subcategories.length);
    }
  });
});
