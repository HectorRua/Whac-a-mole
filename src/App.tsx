import React from "react";
import { Routes, Route } from "react-router-dom";
import Game from "./Game";
import Home from "./Home";
import { SettingsProvider } from "./Providers/SettingsContext";
import "./app.css";

const App: React.FC<{}> = () => {
  return (
    <SettingsProvider>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </div>
    </SettingsProvider>
  );
};

export default App;
