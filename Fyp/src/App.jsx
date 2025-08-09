import { supabase } from './config/supabase';
import { SignUp } from './Components/SignUp';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<div>Login Page</div>} />
      </Routes>
    </Router>
  );
}

export default App;