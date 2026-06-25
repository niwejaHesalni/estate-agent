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
            <h2>♥ {ordered.length} Saved {ordered.length === 1 ? 'Property' : 'Properties'}</h2>
            {ordered.length > 0 && (
              <button className="fav-page__clear-btn" onClick={() => { onClear(); setOrderedIds([]); }}>
                Clear all
              </button>
            )}
          </div>

          {ordered.length === 0 ? (
            <div className="fav-page__empty">
              <p className="fav-page__empty-icon">♡</p>
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
                  <div className="fav-card__handle" title="Drag to reorder">⠿</div>

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
                  >✕</button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── RIGHT: sidebar ── */}
        <aside className="fav-page__sidebar">
          <div className="fav-sidebar">
            <h3 className="fav-sidebar__title">❤ Saved ({ordered.length})</h3>

            {/* Drop zone */}
            <div
              className={`fav-sidebar__drop${overDropZone ? ' over' : ''}`}
              onDragOver={handleDropZoneDragOver}
              onDragLeave={() => setOverDropZone(false)}
              onDrop={handleDropZoneDrop}
            >
              {overDropZone ? '✓ Drop to save!' : '⬇ Drop a property here'}
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
                    >✕</button>
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