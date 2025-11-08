import React from 'react';

function WelcomeCard({ name, age }) {
  return (
    <div style={{
      backgroundColor: '#1fa037ff',
      padding: '15px',
      margin: '10px 0',
      borderRadius: '4px'
    }}>
      <h3>Welcome {name}</h3>
      <p>Age: {age}</p>
    </div>
  );
}

export default WelcomeCard;