# EstateFind - Estate Agent SPA

A client-side React property search application built for the 5COSC026W Advanced Client-Side Web Development coursework.

## Features

- **Search** by type, price range, bedrooms, date added, and postcode area
- **Property page** with image gallery (6-8 images), React Tabs (description, floor plan, map)
- **Favourites** - add via drag-and-drop or button; remove individually or clear all
- **Responsive** design with hand-written media queries (grid layout for desktop, single column for mobile)
- **Security** - Content Security Policy meta tag + JSX HTML encoding
- **Tests** - 7 Jest tests covering search filter logic

## Getting Started

```bash
npm install
npm run dev       # Start dev server
npm test          # Run Jest tests
npm run build     # Production build
```

## Project Structure

```
src/
├── data/
│   └── properties.js        # All 7 property listings
├── components/
│   ├── Header.jsx
│   ├── PropertyCard.jsx
│   └── FavouritesSidebar.jsx
├── pages/
│   ├── SearchPage.jsx
│   └── PropertyPage.jsx
├── styles/
│   └── global.css
├── __tests__/
│   └── search.test.js
├── App.jsx
└── main.jsx
```

## Google Maps

To enable the Google Map tab on property pages, add your API key to `PropertyPage.jsx`:
```js
const mapSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_KEY&q=${mapQuery}`;
```
Then uncomment the `<iframe>` in the Map tab panel.

## Deployment

Deploy to GitHub Pages:
```bash
npm run build
# Push the dist/ folder contents to your gh-pages branch
```
