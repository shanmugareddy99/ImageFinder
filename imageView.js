import React from 'react';

function ImageView({ name, surname, imageUrl }) {
  return (
    <div>
      <h2>Selected Image</h2>
      <div>
        <p>Name: {name}</p>
        <p>Surname: {surname}</p>
        <img src={imageUrl} alt="Selected" />
      </div>
    </div>
  );
}

export default ImageView;
