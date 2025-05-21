import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './hooks/AuthProvider';
import Login from './pages/Login';
import Contacts from './pages/Contacts';
import QA from './pages/QA';
import PrivateRoute from './components/PrivateRoute';
import About from "./pages/About";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CommunityRules from "./pages/CommunityRules";
import ErrorPage from "./pages/Error";
import StudySessions from "./pages/StudySessions";
import UcPage from "./pages/UcPage";
import UserProfile from './pages/UserProfile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='contacts' element={<Contacts />} />
            <Route path='about' element={<About />} />
            <Route path='qa' element={<QA />} />
            <Route path='channels' element={<UcPage />} />
            <Route path='rules' element={<CommunityRules />} />
            <Route path='studysessions' element={<StudySessions />} />
            <Route path='perfil' element={<UserProfile />} />
            <Route path='channel/:channel_id' element={
              <PrivateRoute>
                <UcPage />
              </PrivateRoute>
            } />
          </Route>

          {/* Route outside layout (e.g. Login page doesn't use Layout) */}
          <Route path='login' element={<Login />} />
          <Route path='*' element={
            <ErrorPage
              code="404"
              title="Page Not Found"
              message="The page you're looking for doesn't exist."
            />
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
