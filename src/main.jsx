import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// Import components
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Help from "./components/Help/Help";

// Import ThemeProvider
import { ThemeProvider } from "./ThemeContext";

// Import SelectedDateProvider
import { SelectedDateProvider } from './SelectedDateContext';

// Import LoginStatusProvider
import { LoginStatusProvider } from './LoginStatusContext';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/help",
    element: <Help />
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <SelectedDateProvider>
        <LoginStatusProvider>
          <RouterProvider router={router} />
        </LoginStatusProvider>
      </SelectedDateProvider>
    </ThemeProvider>
  </StrictMode>,
);
