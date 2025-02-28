import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* Add more routes here if needed */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
