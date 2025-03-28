import { Routes, Route } from 'react-router-dom';
import App from './App';
import Dashboard from './principal/dashboard';
import { Employ } from './principal/employees';
import { Users } from './principal/users';
import { Factories } from './principal/factories';
import { NotFound } from './components/notFound';

function Main() {
  return (
    <Routes>
      <Route path='*' element= {<NotFound/>}/>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/dashboard/employees' element={<Employ/>}/>
      <Route path='/dashboard/users' element={<Users/>}/>
      <Route path='/dashboard/factories' element={<Factories/>}/>
      <Route path='/dashboard/notFound' element={<NotFound/>}/>
    </Routes>
  );
}

export default Main;