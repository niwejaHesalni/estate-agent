/**
 * search.test.js
 * Jest tests for core search/filter logic.
 * Tests are written as pure functions, independent of React rendering.
 */

jest.mock('../utils/imgPath', () => ({
  imgPath: (path) => path,
}));

import properties from '../data/properties';

// ---- Helper: replicate the filter logic from SearchPage ----
function filterProperties({ type, minPrice, maxPrice, minBedrooms, maxBedrooms, dateAfter, postcode } = {}) {
  let filtered = [...properties];

  if (type && type !== 'any') {
    filtered = filtered.filter((p) => p.type === type);
  }
  if (minPrice !== undefined && minPrice !== '' && minPrice !== null) {
    filtered = filtered.filter((p) => p.price >= Number(minPrice));
  }
  if (maxPrice !== undefined && maxPrice !== '' && maxPrice !== null) {
    filtered = filtered.filter((p) => p.price <= Number(maxPrice));
  }
  if (minBedrooms !== undefined && minBedrooms !== '' && minBedrooms !== null) {
    filtered = filtered.filter((p) => p.bedrooms >= Number(minBedrooms));
  }
  if (maxBedrooms !== undefined && maxBedrooms !== '' && maxBedrooms !== null) {
    filtered = filtered.filter((p) => p.bedrooms <= Number(maxBedrooms));
  }
  if (dateAfter) {
    const after = new Date(dateAfter);
    filtered = filtered.filter((p) => {
      const propDate = new Date(`${p.added.month} ${p.added.day}, ${p.added.year}`);
      return propDate >= after;
    });
  }
  if (postcode && postcode.trim() !== '') {
    const pc = postcode.trim().toUpperCase();
    filtered = filtered.filter((p) => p.location.toUpperCase().includes(pc));
  }

  return filtered;
}

// ---- Test 1: Data integrity ----
test('Properties data contains exactly 7 properties', () => {
  expect(properties).toHaveLength(7);
});

// ---- Test 2: Filter by type ----
test('Filtering by type "Flat" returns only flats', () => {
  const result = filterProperties({ type: 'Flat' });
  expect(result.length).toBeGreaterThan(0);
  result.forEach((p) => expect(p.type).toBe('Flat'));
});

// ---- Test 3: Filter by price range ----
test('Filtering by price range returns properties within range', () => {
  const result = filterProperties({ minPrice: 300000, maxPrice: 600000 });
  result.forEach((p) => {
    expect(p.price).toBeGreaterThanOrEqual(300000);
    expect(p.price).toBeLessThanOrEqual(600000);
  });
});

// ---- Test 4: Filter by bedrooms ----
test('Filtering by min 4 bedrooms returns correct properties', () => {
  const result = filterProperties({ minBedrooms: 4 });
  result.forEach((p) => expect(p.bedrooms).toBeGreaterThanOrEqual(4));
});

// ---- Test 5: Filter by postcode area ----
test('Filtering by postcode BR1 returns Bromley properties', () => {
  const result = filterProperties({ postcode: 'BR1' });
  expect(result.length).toBeGreaterThan(0);
  result.forEach((p) =>
    expect(p.location.toUpperCase()).toContain('BR1')
  );
});

// ---- Test 6: Combined criteria ----
test('Combined filter: House type + max price 1000000 returns correct results', () => {
  const result = filterProperties({ type: 'House', maxPrice: 1000000 });
  result.forEach((p) => {
    expect(p.type).toBe('House');
    expect(p.price).toBeLessThanOrEqual(1000000);
  });
});

// ---- Test 7: No results for impossible criteria ----
test('Impossible criteria returns empty array', () => {
  const result = filterProperties({ minBedrooms: 10 });
  expect(result).toHaveLength(0);
});

// ---- Test 8: Empty criteria returns all properties ----
test('Empty criteria returns all properties', () => {
  const result = filterProperties({});
  expect(result).toHaveLength(7);
});

// ---- Test 9: Undefined/empty params returns all properties ----
test('Calling filter with no arguments returns all properties', () => {
  const result = filterProperties();
  expect(result).toHaveLength(7);
});

// ---- Test 10: Filter by date - after specified date ----
test('Filtering by date returns properties added on or after that date', () => {
  const result = filterProperties({ dateAfter: '2023-06-01' });
  expect(result.length).toBeGreaterThan(0);
  result.forEach((p) => {
    const propDate = new Date(`${p.added.month} ${p.added.day}, ${p.added.year}`);
    expect(propDate.getTime()).toBeGreaterThanOrEqual(new Date('2023-06-01').getTime());
  });
});

// ---- Test 11: Filter by max bedrooms ----
test('Filtering by max 2 bedrooms returns properties with 2 or fewer', () => {
  const result = filterProperties({ maxBedrooms: 2 });
  result.forEach((p) => expect(p.bedrooms).toBeLessThanOrEqual(2));
});
