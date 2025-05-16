import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './pages/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './hooks/AuthProvider';
import Channel from './pages/Channel';
import Login from './pages/Login';
import Contacts from './pages/Contacts';
import QA from './pages/QA';
import PrivateRoute from './components/PrivateRoute';
import About from "./pages/About";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Layout wrapper route */}
          <Route path='/' element={<Layout />}>
            {/* These routes render inside <Outlet /> in Layout */}
            <Route index element={<HomePage />} />
            <Route path='contacts' element={<Contacts />} />
            <Route path='about' element={<About />} />
            <Route path='qa' element={<QA />} />
            <Route path='channels' element={<Channel />} />
            <Route path='channel/:channel_id' element={
              <PrivateRoute>
                <Channel />
              </PrivateRoute>
            } />
          </Route>

          {/* Route outside layout (e.g. Login page doesn't use Layout) */}
          <Route path='login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
