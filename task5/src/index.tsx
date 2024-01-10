import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './components/App/App';
import { BrowserRouter } from 'react-router-dom';
import { MovieContextProvider } from './context/MovieContext';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <BrowserRouter>
    <MovieContextProvider>
      <App />
    </MovieContextProvider>
  </BrowserRouter>
);
