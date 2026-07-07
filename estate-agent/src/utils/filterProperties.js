/**
 * filterProperties — Pure-function extraction of the search/filter logic
 * used by SearchPage.handleSearch().
 *
 * Filters an array of property objects against the supplied criteria.
 * All criteria are optional; only non-empty criteria are applied (AND logic).
 */

function propDate(p) {
  return new Date(`${p.added.month} ${p.added.day}, ${p.added.year}`);
}

export function filterProperties(properties, filters = {}) {
  const { type, minPrice, maxPrice, minBedrooms, maxBedrooms, dateAfter, postcode } = filters;
  let filtered = [...properties];

  if (type !== undefined && type !== null && type !== 'any') {
    filtered = filtered.filter((p) => p.type === type);
  }
  if (minPrice !== undefined && minPrice !== null && minPrice !== '') {
    filtered = filtered.filter((p) => p.price >= Number(minPrice));
  }
  if (maxPrice !== undefined && maxPrice !== null && maxPrice !== '') {
    filtered = filtered.filter((p) => p.price <= Number(maxPrice));
  }
  if (minBedrooms !== undefined && minBedrooms !== null && minBedrooms !== '') {
    filtered = filtered.filter((p) => p.bedrooms >= Number(minBedrooms));
  }
  if (maxBedrooms !== undefined && maxBedrooms !== null && maxBedrooms !== '') {
    filtered = filtered.filter((p) => p.bedrooms <= Number(maxBedrooms));
  }
  if (dateAfter !== undefined && dateAfter !== null && dateAfter !== '') {
    const after = new Date(dateAfter);
    filtered = filtered.filter((p) => propDate(p) >= after);
  }
  if (postcode !== undefined && postcode !== null && postcode.trim() !== '') {
    const pc = postcode.trim().toUpperCase();
    filtered = filtered.filter((p) => p.location.toUpperCase().includes(pc));
  }

  return filtered;
}
