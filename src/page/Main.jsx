import React from "react";
import "./Main.css";
import { Route, Link, Switch } from "react-router-dom";
import { Home, Write } from "./index";
import { Right_Write } from "./right";

const Main = props => {
  return (
    <div className="Main">
      <div className="Main-left">
        <h3>Left Side</h3>
      </div>
      <div>
        <Route exact path="/" component={Home} />
        <Route exact path="/write" component={Write} />
      </div>
      <div className="Main-right">
        <Route path="/write" component={Right_Write} />
      </div>
    </div>
  );
};

export default Main;
