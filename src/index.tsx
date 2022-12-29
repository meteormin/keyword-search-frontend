import React from 'react';
import { createRoot } from 'react-dom/client';
import App from 'App';
import reportWebVitals from 'reportWebVitals';
import { Provider } from 'react-redux';
import store from 'store/store';

document.documentElement.lang = process.env.REACT_APP_LOCALE || 'ko';

const container = document.getElementById('app');
if (container != null) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
