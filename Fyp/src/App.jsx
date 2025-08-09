import { supabase } from './config/supabase';
import { SignUp } from './Components/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './Components/Login';
import { Home } from './Components/Home';
import { Dashboard } from './Components/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;