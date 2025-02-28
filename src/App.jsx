import './App.css'
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-5">
        <Dashboard />
      </main>
    </div>
  );
};
export default App
