import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import { useEffect, useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <Router>
      <div className={`flex ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main className="flex-1 p-5">
          <Routes>
            {/* Pass darkMode and setDarkMode to Dashboard */}
            <Route path="/" element={<Dashboard darkMode={darkMode} setDarkMode={setDarkMode} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
