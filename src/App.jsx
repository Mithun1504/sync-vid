import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import VideoScroll from "./components/VideoScroll";
import SectionDetailPage from "./components/SectionDetailPage";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            <VideoScroll />
            <Footer />
          </div>
        }
      />
      <Route path="/details" element={<SectionDetailPage />} />
      <Route path="/details/:sectionId" element={<SectionDetailPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
