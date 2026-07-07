import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import './FavouritesPage.css';

function FavouritesPage({ favourites, onAddFavourite, onRemoveFavourite, onClear, allProperties }) {
  const navigate = useNavigate();

  // Local order state for drag-and-drop reordering
  const [orderedIds, setOrderedIds] = useState(() => favourites.map((p) => p.id));
  const [draggingId, setDraggingId] = useState(null);
  const [overDropZone, setOverDropZone] = useState(false);

  // Keep orderedIds in sync when favourites change externally
  const syncedOrder = [
    ...orderedIds.filter((id) => favourites.some((p) => p.id === id)),
    ...favourites.filter((p) => !orderedIds.includes(p.id)).map((p) => p.id),
  ];
  const ordered = syncedOrder.map((id) => favourites.find((p) => p.id === id)).filter(Boolean);

  const fmt = (p) =>
    p.toLocaleString('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 });

  /* ── Card drag (reorder) ── */
  const handleCardDragStart = (e, id) => {
    setDraggingId(id);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('propertyId', id);
  };

  const handleCardDragOver = (e, targetId) => {
    e.preventDefault();
    if (!draggingId || draggingId === targetId) return;
    setOrderedIds((prev) => {
      const arr = [...prev];
      const from = arr.indexOf(draggingId);
      const to = arr.indexOf(targetId);
      if (from === -1 || to === -1) return prev;
      arr.splice(from, 1);
      arr.splice(to, 0, draggingId);
      return arr;
    });
  };

  const handleCardDrop = (e) => {
    e.preventDefault();
    setDraggingId(null);
  };

  /* ── Sidebar drop zone (add from other pages) ── */
  const handleDropZoneDragOver = (e) => {
    e.preventDefault();
    setOverDropZone(true);
  };

  const handleDropZoneDrop = (e) => {
    e.preventDefault();
    setOverDropZone(false);
    const id = e.dataTransfer.getData('propertyId');
    const prop = (allProperties || []).find((p) => p.id === id);
    if (prop) onAddFavourite(prop);
  };

  return (
    <>
      <Hero title="Your Favourites" subtitle="Drag to reorder · Drop cards to save · Click to view" />

      <div className="fav-page">

        {/* ── LEFT: card grid ── */}
        <section className="fav-page__grid-area">
          <div className="fav-page__grid-header">
            <h2>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" style={{ verticalAlign: 'middle', marginRight: 4 }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              {ordered.length} Saved {ordered.length === 1 ? 'Property' : 'Properties'}
            </h2>
            {ordered.length > 0 && (
              <button className="fav-page__clear-btn" onClick={() => { onClear(); setOrderedIds([]); }}>
                Clear all
              </button>
            )}
          </div>

          {ordered.length === 0 ? (
            <div className="fav-page__empty">
              <p className="fav-page__empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </p>
              <p>You haven't saved any properties yet.</p>
              <p>Click the heart icon on any listing to save it here.</p>
            </div>
          ) : (
            <div className="fav-page__cards">
              {ordered.map((p) => (
                <div
                  key={p.id}
                  className={`fav-card${draggingId === p.id ? ' fav-card--dragging' : ''}`}
                  draggable
                  onDragStart={(e) => handleCardDragStart(e, p.id)}
                  onDragOver={(e) => handleCardDragOver(e, p.id)}
                  onDrop={handleCardDrop}
                  onDragEnd={() => setDraggingId(null)}
                >
                  {/* Drag handle */}
                  <div className="fav-card__handle" title="Drag to reorder">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                      <circle cx="9" cy="5" r="1.5"/><circle cx="15" cy="5" r="1.5"/>
                      <circle cx="9" cy="12" r="1.5"/><circle cx="15" cy="12" r="1.5"/>
                      <circle cx="9" cy="19" r="1.5"/><circle cx="15" cy="19" r="1.5"/>
                    </svg>
                  </div>

                  {/* Image */}
                  <div className="fav-card__img" onClick={() => navigate(`/property/${p.id}`)}>
                    <img
                      src={p.pictures?.[0] || p.picture}
                      alt={p.location}
                      onError={(e) => { e.target.src = 'https://placehold.co/260x160?text=Property'; }}
                    />
                  </div>

                  {/* Info */}
                  <div className="fav-card__info" onClick={() => navigate(`/property/${p.id}`)}>
                    <div className="fav-card__price">{fmt(p.price)}</div>
                    <div className="fav-card__meta">
                      {p.bedrooms} bed · {p.type} · {p.tenure}
                    </div>
                    <div className="fav-card__addr">{p.location}</div>
                  </div>

                  {/* Remove */}
                  <button
                    className="fav-card__remove"
                    onClick={() => { onRemoveFavourite(p.id); setOrderedIds((prev) => prev.filter((id) => id !== p.id)); }}
                    title="Remove"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── RIGHT: sidebar ── */}
        <aside className="fav-page__sidebar">
          <div className="fav-sidebar">
            <h3 className="fav-sidebar__title">
              <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 4 }}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              Saved ({ordered.length})
            </h3>

            {/* Drop zone */}
            <div
              className={`fav-sidebar__drop${overDropZone ? ' over' : ''}`}
              onDragOver={handleDropZoneDragOver}
              onDragLeave={() => setOverDropZone(false)}
              onDrop={handleDropZoneDrop}
            >
              {overDropZone ? (
                <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 4 }}><path d="M20 6L9 17l-5-5"/></svg>Drop to save!</>
              ) : (
                <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" style={{ verticalAlign: 'middle', marginRight: 4 }}><path d="M12 5v14M5 12h14"/></svg>Drop a property here</>
              )}
            </div>

            {/* Compact list */}
            {ordered.length === 0 ? (
              <p className="fav-sidebar__empty">No saved properties yet.</p>
            ) : (
              <ul className="fav-sidebar__list">
                {ordered.map((p, i) => (
                  <li
                    key={p.id}
                    className="fav-sidebar__item"
                    onClick={() => navigate(`/property/${p.id}`)}
                  >
                    <span className="fav-sidebar__num">{i + 1}</span>
                    <span className="fav-sidebar__item-info">
                      <span className="fav-sidebar__item-price">{fmt(p.price)}</span>
                      <span className="fav-sidebar__item-loc">{p.location}</span>
                    </span>
                    <button
                      className="fav-sidebar__remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFavourite(p.id);
                        setOrderedIds((prev) => prev.filter((id) => id !== p.id));
                      }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="12" height="12"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  </button>
                  </li>
                ))}
              </ul>
            )}

            {ordered.length > 0 && (
              <button className="fav-sidebar__clear" onClick={() => { onClear(); setOrderedIds([]); }}>
                Clear all
              </button>
            )}
          </div>
        </aside>

      </div>
    </>
  );
}

export default FavouritesPage;