import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import HomeCards from './components/HomeCards';
import FeaturedCarousel from './components/FeaturedCarousel';
import SplashScreen from './components/SplashScreen';
import PropertyPage from './pages/PropertyPage';
import BuyPage from './pages/BuyPage';
import RentPage from './pages/RentPage';
import SellPage from './pages/SellPage';
import MortgagePage from './pages/MortgagePage';
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

  return (
    <>
      {showSplash && <SplashScreen onDone={handleSplashDone} />}

      {!showSplash && (
        <div className="app">
          <Header favouritesCount={favourites.length} />

          <Routes>
            {/* Home / Landing */}
            <Route path="/" element={
              <>
                <Hero title={"Claim your home\nand get a free estimate"} />
                <HomeCards />
                <FeaturedCarousel properties={properties} onAddFavourite={addFavourite} favourites={favourites} />
              </>
            } />

            {/* Section pages */}
            <Route path="/buy"       element={<BuyPage      favourites={favourites} onAddFavourite={addFavourite} />} />
            <Route path="/rent"      element={<RentPage     favourites={favourites} onAddFavourite={addFavourite} />} />
            <Route path="/sell"      element={<SellPage />} />
            <Route path="/mortgage"  element={<MortgagePage />} />
            <Route path="/feed"      element={<FeedPage     favourites={favourites} onAddFavourite={addFavourite} />} />
            <Route path="/favourites" element={
              <FavouritesPage
                favourites={favourites}
                onAddFavourite={addFavourite}
                onRemoveFavourite={removeFavourite}
                onClear={clearFavourites}
                allProperties={properties}
              />
            } />

            {/* Property detail */}
            <Route path="/property/:id" element={
              <PropertyPage favourites={favourites} onAddFavourite={addFavourite} />
            } />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;