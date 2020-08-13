import './boot'
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './containers/App';
import client from './apolloClient';
import './assets/styles/index.less';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
