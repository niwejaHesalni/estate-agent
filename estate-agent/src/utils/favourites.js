/**
 * favourites — Pure-function extraction of the favourite-list logic
 * used by App.jsx.
 *
 * addFav   — Adds a property unless it already exists (dedup by id).
 * removeFav — Removes a property by its id.
 * clearFav  — Returns an empty array.
 */

export function addFav(prev, property) {
  if (prev.find((p) => p.id === property.id)) return prev;
  return [...prev, property];
}

export function removeFav(prev, id) {
  return prev.filter((p) => p.id !== id);
}

export function clearFav() {
  return [];
}
