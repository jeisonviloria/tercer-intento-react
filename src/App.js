import React from 'react';
import './App.css';
import Gallery from './components/Gallery';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Photo Gallery</h1>
      </header>
      <main>
        <Gallery />
      </main>
    </div>
  );
}

export default App;