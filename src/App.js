import React, { lazy, Suspense, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Register from "./Login/Register";
import Login from "./Login/Login";
import CarouselItems from "./Desktop/CarouselItems";
function App() {
  return (
    <div>
      <Router>      


        <Switch>
        <Route path="/" exact component={CarouselItems} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
