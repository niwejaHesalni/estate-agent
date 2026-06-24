import React, { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import SplashScreen from './components/SplashScreen';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [favourites, setFavourites] = useState([]);
  const [activeTab, setActiveTab] = useState('Buy');
  const [heroQuery, setHeroQuery] = useState('');

  const handleSplashDone = useCallback(() => setShowSplash(false), []);

  const addFavourite = (property) => {
    setFavourites((prev) => {
      if (prev.find((p) => p.id === property.id)) return prev;
      return [...prev, property];
    });
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((p) => p.id !== id));
  };

  const clearFavourites = () => setFavourites([]);

  const handleHeroSearch = (query, tab) => {
    setHeroQuery(query);
  };

  return (
    <>
      {showSplash && <SplashScreen onDone={handleSplashDone} />}

      {!showSplash && (
        <div className="app">
          <Header favouritesCount={favourites.length} />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    onSearch={handleHeroSearch}
                    favouritesCount={favourites.length}
                  />
                  <SearchPage
                    favourites={favourites}
                    onAddFavourite={addFavourite}
                    onRemoveFavourite={removeFavourite}
                    onClearFavourites={clearFavourites}
                    activeTab={activeTab}
                    heroQuery={heroQuery}
                  />
                </>
              }
            />
            <Route
              path="/property/:id"
              element={
                <PropertyPage
                  favourites={favourites}
                  onAddFavourite={addFavourite}
                />
              }
            />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
