/**
 * searchLogic.test.js
 * Tests the real filterProperties function extracted from SearchPage.
 */

jest.mock('../utils/imgPath', () => ({
  imgPath: (path) => path,
}));

import properties from '../data/properties';
import { filterProperties } from '../utils/filterProperties';

test('search by single criterion: filtering by type "Flat" returns only flats', () => {
  const result = filterProperties(properties, { type: 'Flat' });
  expect(result.length).toBeGreaterThan(0);
  result.forEach((p) => expect(p.type).toBe('Flat'));
});

test('search by combined criteria: House-type properties priced at or under £1,000,000', () => {
  const result = filterProperties(properties, {
    type: 'House',
    maxPrice: 1000000,
  });
  expect(result.length).toBeGreaterThan(0);
  result.forEach((p) => {
    expect(p.type).toBe('House');
    expect(p.price).toBeLessThanOrEqual(1000000);
  });
});
