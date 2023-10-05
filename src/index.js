import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import {store} from './store/store.jsx';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
const baseUrl=process.env.PUBLIC_URL || '/';
root.render(
  <Provider store={store}>
    <BrowserRouter basename={baseUrl}>
    <App />
    </BrowserRouter>
  </Provider>
  
);

