import { createBrowserRouter } from 'react-router-dom';
import { SignUp } from '../pages/SignUp';
import Dashboard from '../pages/dashboard';
import { Login } from '../pages/Login';
import { Home } from '../pages/Home';
import { About } from '../pages/About';
import { Features } from '../pages/Features';
import { Contact } from '../pages/Contact';

// Define your routes configuration
export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/features',
      element: <Features />,
    },
    {
      path: '/contact',
      element: <Contact />,
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
