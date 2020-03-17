import React, { useRef } from "react";
import "./Main.css";
import { Route, Link, Switch } from "react-router-dom";
import { List, Write, View } from "./index";
import { Right_Write } from "./right";

const Main = props => {
  const titleRef = useRef();
  const contentsRef = useRef();

  return (
    <div className="Main">
      <div className="Main-left">
        <h3>Left Side</h3>
      </div>
      <div>
        <Route exact path="/" component={List} />
        <Route exact path="/write">
          <Write titleRef={titleRef} contentsRef={contentsRef} />
        </Route>
        <Route path="/view/:data" component={View} />
      </div>
      <div className="Main-right">
        <Route path="/write">
          <Right_Write titleRef={titleRef} contentsRef={contentsRef} />
        </Route>
      </div>
    </div>
  );
};

export default Main;
