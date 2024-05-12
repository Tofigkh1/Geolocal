import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './firebaseConfig';


initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
