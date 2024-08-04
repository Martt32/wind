import React from 'react';

const Compass = ({ direction }) => {
  const directions = {
    N: 0,
    NE: 45,
    E: 90,
    SE: 135,
    S: 180,
    SW: 225,
    W: 270,
    NW: 315,
  };

  const rotation = directions[direction] || 0;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <svg width="100" height="100" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" stroke="black" strokeWidth="2" fill="none" />
        <line x1="50" y1="50" x2="50" y2="5" stroke="red" strokeWidth="2" transform={`rotate(${direction} 50 50)`} />
        <text x="50" y="15" fontSize="10" textAnchor="middle">N</text>
        <text x="85" y="55" fontSize="10" textAnchor="middle">E</text>
        <text x="50" y="95" fontSize="10" textAnchor="middle">S</text>
        <text x="15" y="55" fontSize="10" textAnchor="middle">W</text>
      </svg>
    </div>
  );
};

export default Compass;
