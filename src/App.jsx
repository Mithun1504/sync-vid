import React, { useEffect } from 'react';
import VideoScroll from './components/VideoScroll';
import './index.css';

function App() {
  return (
    <div className="App">
      <VideoScroll />
      <div className="content-section">
        <h2>Continue scrolling...</h2>
        <p>This section appears after the video plays fully.</p>
      </div>
    </div>
  );
}

export default App;
