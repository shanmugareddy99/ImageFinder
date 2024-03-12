import React, { useState, useEffect } from 'react';
import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: 'kvse1HAQQKot5VRFSflJeuVPTI3nMI8TJ80_AJFSsFU',
});

const topics = ['Travel', 'Cars', 'Wildlife', 'Technology', 'Other'];

function App() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [topic, setTopic] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    fetchImage();
  }, [topic, customTopic]);

  const fetchImage = () => {
    console.log('Topic', topic);
    let query = topic === 'Other' ? customTopic : topic;
    console.log('Check for rejeact', topic, query);
    unsplash.search
      .getPhotos({ query, perPage: 1, orientation: 'landscape' })
      .then((json) => {
        if (json.response.results && json.response.results.length > 0) {
          setImageUrl(json.response.results[0].urls.regular);
        } else {
          setImageUrl('');
        }
      })
      .catch((error) => {
        console.error('Error fetching image: ', error);
      });
  };

  // while accepting make new name surname and image
  const handleAccept = () => {
    setAccepted(true);
  };
  //Reset to earlier state
  const handleReject = () => {
    setCustomTopic('');
  };

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
  return (
    <div>
      <h1>Image Selector</h1>
      {!accepted ? (
        <div>
          <form>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Surname:
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </label>
            <br />
            <label>
              Preferred Topic:
              <select value={topic} onChange={(e) => setTopic(e.target.value)}>
                {topics.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            {topic === 'Other' && (
              <div>
                <br />
                <label>
                  Other Topic:
                  <input
                    type="text"
                    value={customTopic}
                    onChange={(e) => setCustomTopic(e.target.value)}
                  />
                </label>
              </div>
            )}
          </form>
          {imageUrl && (
            <div>
              <h2>Selected Image:</h2>
              <img src={imageUrl} alt="Selected" />
              <br />
              <button onClick={handleAccept}>Accept</button>
              <button onClick={handleReject}>Reject</button>
            </div>
          )}
        </div>
      ) : (
        // Render ImageView if image accepted
        <ImageView name={name} surname={surname} imageUrl={imageUrl} />
      )}
    </div>
  );
}

export default App;
