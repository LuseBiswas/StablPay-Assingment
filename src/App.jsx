import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import {useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  return (
    <Router>
      <div className={`flex min-h-screen w-full ${darkMode ? "bg-gray-900" : "bg-gray-100"}`}>
        <Routes>
          <Route path="/" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;