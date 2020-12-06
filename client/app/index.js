import React from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './components/App/App';
import NotFound from './components/App/NotFound';

import Home from './components/Home/Home';

import about from './components/about/about';
import FAQs from './components/FAQs/FAQs';
import Franchise from './components/Franchise/Franchise';
import Order from './components/Order/Order';

import './styles/styles.scss';

render((
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={about}/>
        <Route path="/FAQs" component={FAQs}/>
        <Route path="/Franchise" component={Franchise}/>
        <Route path="/Order" component={Order}/>
        <Route component={NotFound}/>
      </Switch>
    </App>
  </Router>
), document.getElementById('app'));
