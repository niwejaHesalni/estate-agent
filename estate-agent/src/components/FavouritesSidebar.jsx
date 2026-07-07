import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * FavouritesSidebar
 * layout="horizontal" → wide bar below the hero (home page)
 * layout="vertical"   → classic right-panel (legacy, not used by default now)
 */
function FavouritesSidebar({ favourites, allProperties, onAddFavourite, onRemoveFavourite, onClear, layout = 'horizontal' }) {
  const [isOver, setIsOver] = useState(false);
  const [isTrashOver, setIsTrashOver] = useState(false);
  const [draggingOutId, setDraggingOutId] = useState(null);
  const navigate = useNavigate();
  const isOverBarRef = useRef(false);

  // ── Drop zone: ADD property ──
  const handleDragOver = (e) => { e.preventDefault(); setIsOver(true); };
  const handleDragLeave = () => setIsOver(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    const id = e.dataTransfer.getData('propertyId');
    const prop = (allProperties || []).find((p) => p.id === id);
    if (prop) onAddFavourite(prop);
  };

  // ── Drag saved item OUT → trash ──
  const handleItemDragStart = (e, id) => {
    e.dataTransfer.setData('removeFavId', id);
    e.dataTransfer.effectAllowed = 'move';
    setDraggingOutId(id);
    isOverBarRef.current = true; // start inside
  };
  const handleItemDragEnd = (e, id) => {
    setDraggingOutId(null);
    if (!isOverBarRef.current) {
      onRemoveFavourite(id);
    }
  };

  // ── Trash drop zone ──
  const handleTrashDragOver = (e) => { e.preventDefault(); setIsTrashOver(true); };
  const handleTrashDragLeave = () => setIsTrashOver(false);
  const handleTrashDrop = (e) => {
    e.preventDefault();
    setIsTrashOver(false);
    const id = e.dataTransfer.getData('removeFavId');
    if (id) onRemoveFavourite(id);
    setDraggingOutId(null);
  };

  const handleBarDragLeave = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (
      e.clientX < rect.left ||
      e.clientX >= rect.right ||
      e.clientY < rect.top ||
      e.clientY >= rect.bottom
    ) {
      isOverBarRef.current = false;
    }
  };

  const fmt = (n) => n.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });

  if (layout === 'horizontal') {
    return (
      <section
        className="fav-bar"
        onDragEnter={() => { isOverBarRef.current = true; }}
        onDragOver={(e) => { e.preventDefault(); isOverBarRef.current = true; }}
        onDragLeave={handleBarDragLeave}
      >
        <div className="fav-bar__inner">

          {/* Left label */}
          <div className="fav-bar__label">
            <span className="fav-bar__heart">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </span>
            <span>Favourites</span>
            {favourites.length > 0 && (
              <span className="fav-bar__count">{favourites.length}</span>
            )}
          </div>

          {/* Drop zone */}
          <div
            className={`fav-bar__drop${isOver ? ' over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isOver ? (
              <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 4 }}><path d="M20 6L9 17l-5-5"/></svg>Drop to save!</>
            ) : (
              <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 4 }}><path d="M12 5v14M5 12h14"/></svg>Drag a property here to save</>
            )}
          </div>

          {/* Saved pills */}
          {favourites.length > 0 && (
            <ul className="fav-bar__list">
              {favourites.map((p) => (
                <li
                  key={p.id}
                  className={`fav-bar__pill${draggingOutId === p.id ? ' dragging' : ''}`}
                  draggable
                  onDragStart={(e) => handleItemDragStart(e, p.id)}
                  onDragEnd={(e) => handleItemDragEnd(e, p.id)}
                  onClick={() => navigate(`/property/${p.id}`)}
                  title={`${p.location} — drag to trash or outside to remove`}
                >
                  <span className="fav-bar__pill-price">{fmt(p.price)}</span>
                  <span className="fav-bar__pill-loc">{p.location.split(',')[0]}</span>
                  <button
                    className="fav-bar__pill-remove"
                    onClick={(e) => { e.stopPropagation(); onRemoveFavourite(p.id); }}
                    title="Remove"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Trash zone — only visible when dragging a saved item */}
          {favourites.length > 0 && (
            <div
              className={`fav-bar__trash${isTrashOver ? ' over' : ''}${draggingOutId ? ' visible' : ''}`}
              onDragOver={handleTrashDragOver}
              onDragLeave={handleTrashDragLeave}
              onDrop={handleTrashDrop}
            >
              {isTrashOver ? 'Release to remove' : 'Drag here to remove'}
            </div>
          )}

          {/* Actions */}
          {favourites.length > 0 && (
            <div className="fav-bar__actions">
              <button className="fav-bar__view-btn" onClick={() => navigate('/favourites')}>
                View all
              </button>
              <button className="fav-bar__clear-btn" onClick={onClear}>
                Clear all
              </button>
            </div>
          )}
        </div>
      </section>
    );
  }

  // ── Vertical layout (legacy fallback) ──
  return (
    <aside
      className="fav-sidebar-global"
      onDragEnter={() => { isOverBarRef.current = true; }}
      onDragOver={(e) => { e.preventDefault(); isOverBarRef.current = true; }}
      onDragLeave={handleBarDragLeave}
    >
      <h3 className="fav-sidebar-global__title">
        <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 4 }}>
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
        Favourites ({favourites.length})
      </h3>

      <div
        className={`fav-sidebar-global__dropzone${isOver ? ' over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isOver ? (
          <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 4 }}><path d="M20 6L9 17l-5-5"/></svg>Drop to save!</>
        ) : (
          <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 4 }}><path d="M12 5v14M5 12h14"/></svg>Drag a property here</>
        )}
      </div>

      {favourites.length === 0 ? (
        <p className="fav-sidebar-global__empty">No saved properties yet.</p>
      ) : (
        <ul className="fav-sidebar-global__list">
          {favourites.map((p, i) => (
            <li
              key={p.id}
              className={`fav-sidebar-global__item${draggingOutId === p.id ? ' dragging' : ''}`}
              draggable
              onDragStart={(e) => handleItemDragStart(e, p.id)}
              onDragEnd={(e) => handleItemDragEnd(e, p.id)}
              onClick={() => navigate(`/property/${p.id}`)}
            >
              <span className="fav-sidebar-global__num">{i + 1}</span>
              <span className="fav-sidebar-global__name">{p.location}</span>
              <button className="fav-sidebar-global__remove" onClick={(e) => { e.stopPropagation(); onRemoveFavourite(p.id); }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {favourites.length > 0 && (
        <div
          className={`fav-sidebar-global__trash${isTrashOver ? ' over' : ''}`}
          onDragOver={handleTrashDragOver}
          onDragLeave={handleTrashDragLeave}
          onDrop={handleTrashDrop}
        >
          {isTrashOver ? 'Release to remove' : 'Drag here to remove'}
        </div>
      )}

      {favourites.length > 0 && (
        <button className="fav-sidebar-global__clear" onClick={onClear}>Clear all</button>
      )}
    </aside>
  );
}

export default FavouritesSidebar;