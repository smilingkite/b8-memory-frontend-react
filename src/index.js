import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import App from './App';
import Lobby from './games/Lobby'
import MemoryGame from './games/MemoryGame'
import SignUp from './users/SignUp'
import SignIn from './users/SignIn'

import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Lobby} />
        <Route path="/games/:gameId" component={MemoryGame} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
