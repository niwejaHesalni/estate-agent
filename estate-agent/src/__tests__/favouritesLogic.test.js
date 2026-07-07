/**
 * favouritesLogic.test.js
 * Tests the real addFav / removeFav / clearFav functions from App.jsx.
 */

jest.mock('../utils/imgPath', () => ({
  imgPath: (path) => path,
}));

import properties from '../data/properties';
import { addFav, removeFav, clearFav } from '../utils/favourites';

const [prop1, prop2] = properties;

test('adding a property to favourites appends it and returns a new array', () => {
  const result = addFav([], prop1);
  expect(result).toHaveLength(1);
  expect(result[0].id).toBe(prop1.id);
});

test('adding the same property twice does not create duplicates', () => {
  const afterFirst = addFav([], prop1);
  const afterSecond = addFav(afterFirst, prop1);
  expect(afterSecond).toHaveLength(1);
  expect(afterSecond[0].id).toBe(prop1.id);
});

test('removing a favourite by id removes the correct property while keeping others', () => {
  const withTwo = addFav(addFav([], prop1), prop2);
  expect(withTwo).toHaveLength(2);

  const afterRemove = removeFav(withTwo, prop1.id);
  expect(afterRemove).toHaveLength(1);
  expect(afterRemove[0].id).toBe(prop2.id);
});

test('clearing all favourites returns an empty array regardless of previous content', () => {
  const withItems = addFav(addFav([], prop1), prop2);
  expect(withItems.length).toBeGreaterThan(0);

  const result = clearFav();
  expect(result).toEqual([]);
});
