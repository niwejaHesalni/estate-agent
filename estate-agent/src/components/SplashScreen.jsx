import React, { useEffect, useState } from 'react';
import './SplashScreen.css';

/**
 * SplashScreen - Displays for 2.5 seconds on first load then fades out.
 */
function SplashScreen({ onDone }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Start fade out at 2.2s, call onDone at 2.6s
    const fadeTimer = setTimeout(() => setFading(true), 2200);
    const doneTimer = setTimeout(() => onDone(), 2600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onDone]);

  return (
    <div className={`splash${fading ? ' splash--fade' : ''}`}>
      <div className="splash__logo">EstateFind</div>
      <p className="splash__tagline">Find your property</p>
      <div className="splash__bar-wrap">
        <div className="splash__bar-fill" />
      </div>
    </div>
  );
}

export default SplashScreen;
