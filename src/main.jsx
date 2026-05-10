import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import store from './states';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import './reactotron/ReactotronConfig.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <LoadingSpinner/>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
);
