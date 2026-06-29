import React from 'react';
import Hero from '../components/Hero';
import FeedSection from '../components/FeedSection';
import FavouritesSidebar from '../components/FavouritesSidebar';
import properties from '../data/properties';

function FeedPage({ favourites, onAddFavourite, onRemoveFavourite, onClear }) {
  return (
    <>
      <Hero title={"Property Feed"} subtitle="The latest listings — updated daily." />
      <FavouritesSidebar
        favourites={favourites}
        allProperties={properties}
        onAddFavourite={onAddFavourite}
        onRemoveFavourite={onRemoveFavourite}
        onClear={onClear}
        layout="horizontal"
      />
      <FeedSection properties={properties} onAddFavourite={onAddFavourite} favourites={favourites} />
    </>
  );
}

export default FeedPage;
