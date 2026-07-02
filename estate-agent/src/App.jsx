import React, { useState, useCallback } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

/* ── XSS Protection ──
 * React automatically escapes all JSX expressions, preventing HTML/script
 * injection in rendered output. No dangerouslySetInnerHTML is used anywhere.
 * User input in URLs is explicitly encoded via sanitize.js utilities.
 * CSP meta tag in index.html provides additional defence-in-depth.          */
import Header from './components/Header';
import Hero from './components/Hero';
import HomeCards from './components/HomeCards';
import FeaturedCarousel from './components/FeaturedCarousel';
import SplashScreen from './components/SplashScreen';
import FavouritesSidebar from './components/FavouritesSidebar';
import Footer from './components/Footer';
import PropertyPage from './pages/PropertyPage';
import BuyPage from './pages/BuyPage';
import RentPage from './pages/RentPage';
import SellPage from './pages/SellPage';
import FindAgentPage from './pages/FindAgentPage';
import FeedPage from './pages/FeedPage';
import FavouritesPage from './pages/FavouritesPage';
import properties from './data/properties';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [favourites, setFavourites] = useState([]);

  const handleSplashDone = useCallback(() => setShowSplash(false), []);

  const addFavourite = (property) => {
    setFavourites((prev) => {
      if (prev.find((p) => p.id === property.id)) return prev;
      return [...prev, property];
    });
  };

  const removeFavourite = (id) => setFavourites((prev) => prev.filter((p) => p.id !== id));
  const clearFavourites = () => setFavourites([]);

  const sidebarProps = {
    favourites,
    allProperties: properties,
    onAddFavourite: addFavourite,
    onRemoveFavourite: removeFavourite,
    onClear: clearFavourites,
  };

  return (
    <>
      {showSplash && <SplashScreen onDone={handleSplashDone} />}

      {!showSplash && (
        <div className="app">
          <Header favouritesCount={favourites.length} />

          <div className="app-content">
            <Routes>
              {/* Home */}
              <Route path="/" element={
                <>
                  <Hero
                    title={"Find your perfect\nhome today"}
                    favouritesCount={favourites.length}
                  />
                  {/* Favourites drop zone — below hero on home page */}
                  <FavouritesSidebar {...sidebarProps} layout="horizontal" />
                  <HomeCards />
                  <FeaturedCarousel properties={properties} onAddFavourite={addFavourite} favourites={favourites} />
                </>
              } />

              <Route path="/buy"        element={<BuyPage      favourites={favourites} onAddFavourite={addFavourite} onRemoveFavourite={removeFavourite} onClear={clearFavourites} />} />
              <Route path="/rent"       element={<RentPage     favourites={favourites} onAddFavourite={addFavourite} onRemoveFavourite={removeFavourite} onClear={clearFavourites} />} />
              <Route path="/sell"       element={<SellPage />} />
              <Route path="/find-agent" element={<FindAgentPage />} />
              <Route path="/feed"       element={<FeedPage     favourites={favourites} onAddFavourite={addFavourite} onRemoveFavourite={removeFavourite} onClear={clearFavourites} />} />
              <Route path="/favourites" element={
                <FavouritesPage
                  favourites={favourites}
                  onAddFavourite={addFavourite}
                  onRemoveFavourite={removeFavourite}
                  onClear={clearFavourites}
                  allProperties={properties}
                />
              } />
              <Route path="/property/:id" element={
                <PropertyPage favourites={favourites} onAddFavourite={addFavourite} />
              } />
            </Routes>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;