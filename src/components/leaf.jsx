import React from 'react';

const Leaf = ({ direction, delay }) => {
  const leafStyle = {
    position: 'absolute',
    top: `${Math.random() * 100}%`,
    left: direction === 'right' ? '-5%' : '105%',
    width: '20px',
    height: '20px',
    backgroundImage: 'url(./assets/oak leaf.png)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    animation: `fly-right 5s linear infinite`,
    animationDelay: `5s`,
  };

  return <div style={leafStyle}></div>;
};

export default Leaf;
