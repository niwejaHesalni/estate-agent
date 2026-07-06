/**
 * properties.test.js
 * Data integrity tests for the properties dataset.
 */

jest.mock('../utils/imgPath', () => ({
  imgPath: (path) => path,
}));

import properties from '../data/properties';

const VALID_TYPES = ['House', 'Flat'];
const VALID_TENURES = ['Freehold', 'Leasehold'];

// ---- Test 1: All properties have required fields ----
test('Each property has all required fields', () => {
  properties.forEach((p) => {
    expect(p).toHaveProperty('id');
    expect(p).toHaveProperty('type');
    expect(p).toHaveProperty('bedrooms');
    expect(p).toHaveProperty('price');
    expect(p).toHaveProperty('tenure');
    expect(p).toHaveProperty('description');
    expect(p).toHaveProperty('location');
    expect(p).toHaveProperty('picture');
    expect(p).toHaveProperty('pictures');
    expect(p).toHaveProperty('floorplan');
    expect(p).toHaveProperty('added');
  });
});

// ---- Test 2: All properties have valid types ----
test('Each property type is House or Flat', () => {
  properties.forEach((p) => {
    expect(VALID_TYPES).toContain(p.type);
  });
});

// ---- Test 3: All properties have valid tenures ----
test('Each property tenure is Freehold or Leasehold', () => {
  properties.forEach((p) => {
    expect(VALID_TENURES).toContain(p.tenure);
  });
});

// ---- Test 4: All prices are positive numbers ----
test('Each property has a positive price', () => {
  properties.forEach((p) => {
    expect(p.price).toBeGreaterThan(0);
    expect(typeof p.price).toBe('number');
  });
});

// ---- Test 5: All bedroom counts are positive integers ----
test('Each property has a positive bedroom count', () => {
  properties.forEach((p) => {
    expect(p.bedrooms).toBeGreaterThan(0);
    expect(Number.isInteger(p.bedrooms)).toBe(true);
  });
});

// ---- Test 6: All property IDs are unique ----
test('All property IDs are unique', () => {
  const ids = properties.map((p) => p.id);
  const uniqueIds = new Set(ids);
  expect(uniqueIds.size).toBe(ids.length);
});

// ---- Test 7: Each property has at least one picture ----
test('Each property has a non-empty pictures array', () => {
  properties.forEach((p) => {
    expect(Array.isArray(p.pictures)).toBe(true);
    expect(p.pictures.length).toBeGreaterThan(0);
  });
});

// ---- Test 8: Added dates have valid month, day, and year ----
test('Each property has a valid added date with month, day, and year', () => {
  const validMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  properties.forEach((p) => {
    expect(p.added).toHaveProperty('month');
    expect(p.added).toHaveProperty('day');
    expect(p.added).toHaveProperty('year');
    expect(validMonths).toContain(p.added.month);
    expect(p.added.day).toBeGreaterThanOrEqual(1);
    expect(p.added.day).toBeLessThanOrEqual(31);
    expect(p.added.year).toBeGreaterThan(2020);
    expect(p.added.year).toBeLessThanOrEqual(2025);
  });
});

// ---- Test 9: Houses are always Freehold, Flats can be either ----
test('All Houses are Freehold tenure', () => {
  properties
    .filter((p) => p.type === 'House')
    .forEach((p) => expect(p.tenure).toBe('Freehold'));
});

// ---- Test 10: Houses have more bedrooms on average than flats ----
test('Average bedrooms for Houses is >= average for Flats', () => {
  const houses = properties.filter((p) => p.type === 'House');
  const flats = properties.filter((p) => p.type === 'Flat');
  const houseAvg = houses.reduce((s, p) => s + p.bedrooms, 0) / houses.length;
  const flatAvg = flats.reduce((s, p) => s + p.bedrooms, 0) / flats.length;
  expect(houseAvg).toBeGreaterThanOrEqual(flatAvg);
});
