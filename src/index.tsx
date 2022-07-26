import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import Logs from './components/pages/Logs';
import LogTypeEditor from './components/pages/LogTypeEditor';
import LogTypes from './components/pages/LogTypes';
import Overview from './components/pages/Overview';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/logs" element={<Logs />} />
        <Route path="/dashboard/types" element={<LogTypes />} />
        <Route path="/dashboard/types/editor" element={<LogTypeEditor />} />
      </Routes>
      ;
    </BrowserRouter>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
