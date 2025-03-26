import { Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './principal/dashboard';

function Main() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default Main;