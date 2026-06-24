/**
 * search.test.js
 * Jest tests for core search/filter logic.
 * Tests are written as pure functions, independent of React rendering.
 */

import properties from '../data/properties';

// ---- Helper: replicate the filter logic from SearchPage ----
function filterProperties({ type, minPrice, maxPrice, minBedrooms, maxBedrooms, dateAfter, postcode }) {
  let filtered = [...properties];

  if (type && type !== 'any') {
    filtered = filtered.filter((p) => p.type === type);
  }
  if (minPrice !== undefined && minPrice !== '') {
    filtered = filtered.filter((p) => p.price >= Number(minPrice));
  }
  if (maxPrice !== undefined && maxPrice !== '') {
    filtered = filtered.filter((p) => p.price <= Number(maxPrice));
  }
  if (minBedrooms !== undefined && minBedrooms !== '') {
    filtered = filtered.filter((p) => p.bedrooms >= Number(minBedrooms));
  }
  if (maxBedrooms !== undefined && maxBedrooms !== '') {
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
