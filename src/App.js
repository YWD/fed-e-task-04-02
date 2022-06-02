/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import { Link, Route } from "react-router-dom";

import IndexPage from "./pages/index/index.jsx";
import AppleComponent from "./pages/apple/index.jsx";
import HooksWrapper from './pages/hooks/index.jsx';
import CartPage from './pages/cart/index.jsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
      <div className="container">
        <AppleComponent />
        {/*<div className="link">*/}
        {/*  /!*<Link className="link-href" to="/">Index Page</Link>*!/*/}
        {/*  <Link className="link-href" to="/mobx">Mobx State Page</Link>*/}
        {/*  /!*<Link className="link-href" to="/hooks">Hooks State Page</Link>*!/*/}
        {/*  /!*<Link className="link-href" to="/cart">CartStore Page</Link>*!/*/}
        {/*</div>*/}
        {/*<div className="route-container">*/}
        {/*  /!*<Route path="/" component={IndexPage} exact={true}></Route>*!/*/}
        {/*  <Route path="/mobx" component={AppleComponent}></Route>*/}
        {/*  /!*<Route path="/hooks" component={HooksWrapper}></Route>*!/*/}
        {/*  /!*<Route path="/cart" component={CartPage}></Route>*!/*/}
        {/*</div>*/}
      </div>
    </div>
  );
}

export default App;
