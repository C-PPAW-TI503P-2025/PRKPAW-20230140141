import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [serverMessage, setServerMessage] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');

  // Mengambil pesan dari server
  useEffect(() => {
    fetch('http://localhost:5000')
      .then(response => response.json())
      .then(data => setServerMessage(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  // Menampilkan pesan selamat datang berdasarkan input nama
  useEffect(() => {
    if (name.trim()) {
      setWelcomeMessage(`Hello, ${name}!`);
    } else {
      setWelcomeMessage('');
    }
  }, [name]);

  return (
    <div className="App">
      <h1>Integrasi React dan Node.js</h1>
      
      {/* Input untuk nama pengguna */}
      <div className="input-section">
        <label htmlFor="nameInput">Masukkan Nama Anda: </label>
        <input
          id="nameInput"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ketik nama di sini..."
        />
      </div>

      {/* Menampilkan pesan selamat datang */}
      {welcomeMessage && (
        <div className="welcome-message">
          <h2>{welcomeMessage}</h2>
        </div>
      )}

      {/* Menampilkan pesan dari server */}
      <div className="server-message">
        <p>Pesan dari server: <strong>{serverMessage}</strong></p>
      </div>
    </div>
  );
}

export default App;