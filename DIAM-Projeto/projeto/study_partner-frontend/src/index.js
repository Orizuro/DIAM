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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/qa' element={<QA />} />
          {/*<Route path='/community-rules' element={<CommunityRules />} />*/}
          <Route path='/channels' element={<Channel />} />
          <Route path='/channel/:channel_id' element={<Channel />} />
          <Route path='/login' element={<Login />} />
          {/*NO PAGE: <Route path='*' element={} />*/}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
