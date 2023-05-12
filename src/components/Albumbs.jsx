import React, { useState, useEffect } from "react";

const Albums = () => {
  const [albums, setAlbums] = useState([]); // State for getting albumbs
  const [newAlbum, setNewAlbum] = useState("");  // State for updatinf albumb after adding a new albumb
  const [loading, setLoading] = useState(false); // State for loading animation

  useEffect(() => {
    // Fetch albums data from API on component mount
    fetch("https://jsonplaceholder.typicode.com/albums")
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data); // Update state with fetched albums data
      })
      .catch((error) => console.log(error));
  }, []);

  const addAlbum = () => {
    setLoading(true); // Start the loading animation

    // Make a POST request to add a new album
    fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "POST",
      body: JSON.stringify({ title: newAlbum }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => setAlbums([...albums, data])) // Update state with the new album
      .catch((error) => console.log(error))
      .finally(() => setLoading(false)); // Stop the loading animation

    setNewAlbum(""); // Clear the input field
  };

  const updateAlbum = (id, newTitle) => {
    setLoading(true); // Start the loading animation

    // Make a PUT request to update an album
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title: newTitle }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the updated album
        const updatedAlbums = albums.map((album) =>
          album.id === id ? { ...album, title: newTitle } : album
        );
        setAlbums(updatedAlbums);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false)); // Stop the loading animation
  };

  const deleteAlbum = (id) => {
    setLoading(true); // Start the loading animation

    // Make a DELETE request to remove an album
    fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Filter out the deleted album from the state
        const updatedAlbums = albums.filter((album) => album.id !== id);
        setAlbums(updatedAlbums);
      })
      .catch((error) => console.log(error))
      .finally(() => setLoading(false)); // Stop the loading animation
  };

  return (
    <div className="albums-container">
      <h1>Albums</h1>
      {/* adding new albumb */}
      <div className="add-albumb">
        <input
          type="text"
          value={newAlbum}
          onChange={(e) => setNewAlbum(e.target.value)}
        />
        <button onClick={addAlbum} disabled={loading}>
          Add Album
        </button>
      </div>
      {/* Looping over the ablumb data */}
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {album.title}
            <div>
              <button
                onClick={() => updateAlbum(album.id, "Updated Title")}
                disabled={loading}
              >
                Update
              </button>
              <button onClick={() => deleteAlbum(album.id)} disabled={loading}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      {/* Conditional rendering for loader overlay */}
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default Albums;
