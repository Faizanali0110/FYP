import { createBrowserRouter } from 'react-router-dom';
import { SignUp } from '../pages/SignUp';
import Dashboard from '../pages/dashboard';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';

// Define your routes configuration
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/dashboard/*',
      element: <Dashboard />,
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    },
  }
);
