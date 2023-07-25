import React from "react";
import RandomQuote from "./components/RandomQuote";
import "./App.css";

const App = () => {
  return (
    <div className="neon-background">
      <div className="app-container">
        <RandomQuote />
      </div>
    </div>
  );
};

export default App;
