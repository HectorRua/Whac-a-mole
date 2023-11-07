import React from "react";
import { Routes, Route } from "react-router-dom";
import Game from "./Game";
import Home from "./Home";

const App: React.FC<{}> = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
};

export default App;
