import React, { useState } from 'react';

/**
 * FavouritesSidebar - Drag-and-drop drop zone + list of saved properties.
 * Allows adding via drop, removing individually, and clearing all.
 */
function FavouritesSidebar({ favourites, allProperties, onAddFavourite, onRemoveFavourite, onClear }) {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsOver(true);
  };

  const handleDragLeave = () => setIsOver(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const id = e.dataTransfer.getData('propertyId');
    const prop = allProperties.find((p) => p.id === id);
    if (prop) onAddFavourite(prop);
  };

  return (
    <aside className="favourites-sidebar">
      <h2>❤ Favourites ({favourites.length})</h2>

      {/* Drop zone */}
      <div
        className={`fav-drop-zone${isOver ? ' over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isOver ? 'Drop to add!' : 'Drag a property here'}
      </div>

      {/* Saved list */}
      {favourites.length === 0 ? (
        <p style={{ fontSize: '0.82rem', color: '#9ca3af', textAlign: 'center' }}>No saved properties yet.</p>
      ) : (
        <>
          {favourites.map((p) => (
            <div key={p.id} className="fav-item">
              <span className="fav-item-name">{p.location}</span>
              <button
                className="fav-remove"
                onClick={() => onRemoveFavourite(p.id)}
                title="Remove"
              >
                ✕
              </button>
            </div>
          ))}
          <button className="fav-clear" onClick={onClear}>
            Clear all
          </button>
        </>
      )}
    </aside>
  );
}

export default FavouritesSidebar;
