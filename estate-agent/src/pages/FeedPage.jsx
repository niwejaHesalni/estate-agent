import React from 'react';
import Hero from '../components/Hero';
import FeedSection from '../components/FeedSection';
import properties from '../data/properties';

function FeedPage({ favourites, onAddFavourite }) {
  return (
    <>
      <Hero title={"Property Feed"} subtitle="The latest listings — updated daily." />
      <FeedSection properties={properties} onAddFavourite={onAddFavourite} favourites={favourites} />
    </>
  );
}

export default FeedPage;
