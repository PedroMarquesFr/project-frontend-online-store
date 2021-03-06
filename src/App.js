import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './GlobalStyles.css';
import Home from './pages/home';
import Cart from './pages/Cart';
import Details from './pages/Details';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route path="/cart" component={ Cart } />
        <Route path="/details/:id" component={ Details } />
        <Route path="/checkout" component={ Checkout } />
      </Switch>
    </Router>
  );
}

export default App;
