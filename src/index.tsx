import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ErrorFound from './components/ErrorFound';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import './styles/_main.scss';

import * as Sentry from '@sentry/react';

/**
 * Renders the React DOM
 * Uses I18nextProvider for website translation
 * Uses Sentry.ErrorBoundary to fallback to an Error Page for any uncaught errors
 */
ReactDOM.render(
  <React.Fragment>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Sentry.ErrorBoundary fallback={<ErrorFound />}>
          <App />
        </Sentry.ErrorBoundary>
      </I18nextProvider>
    </BrowserRouter>
  </React.Fragment>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
