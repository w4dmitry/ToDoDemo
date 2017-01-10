import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { App } from './App';
import { Main } from './Main';
import { About } from './About';
import { NotFound } from './NotFound';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDom.render((
    <Router history={browserHistory}>

        <Route path="/">

           <IndexRoute component={Main} />

           <Route path="about" component={About} />

           <Route path="*" component={NotFound} />

        </Route>

    </Router>
), document.getElementById('app'));