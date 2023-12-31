import React, { useState } from "react";
import Popup from "./Popup";
import "./App.css";
import Button from "@mui/material/Button";

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Popup App</h1>
        <Button variant="contained" size="large" onClick={handleButtonClick}>
          Save segment
        </Button>
        <Popup show={showPopup} handleClose={handleClosePopup} />
      </header>
    </div>
  );
}

export default App;
