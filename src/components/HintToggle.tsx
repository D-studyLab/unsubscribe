import React, { useState } from 'react';
import './HintToggle.css';

interface HintToggleProps {
  hintText: string;
}

export const HintToggle: React.FC<HintToggleProps> = ({ hintText }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="hint-toggle-container">
      <button
        className="hint-toggle-button"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? 'ヒントを隠す' : 'ヒントを見る'}
      </button>
      {isVisible && (
        <div className="hint-box">
          <p>{hintText}</p>
        </div>
      )}
    </div>
  );
};
