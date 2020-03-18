import React, { useRef, useState } from "react";
import "./Main.css";
import { Route } from "react-router-dom";
import { List, Write, View } from "./index";
import { RightWrite } from "./right";
import { Category } from "./left";

const Main = props => {
  const [category, setCategory] = useState("");

  const { login } = props;

  const titleRef = useRef();
  const contentsRef = useRef();

  // 카테고리 변경 함수
  const _changeCategory = target => {
    setCategory(target);
    sessionStorage.setItem("category", target);
  };

  // 하이어오더 함수?, 컴포넌트의 기존 props(여기서는 matchProps)에
  // 새로운 props를 붙여서 컴포넌트 반환
  const _withProps = (Component, props) => matchProps => (
    <Component {...props} {...matchProps} />
  );

  return (
    <div className="Main">
      <div className="Main-left">
        <Route
          exact
          path="/"
          render={props => (
            <Category _changeCategory={_changeCategory} login={login} />
          )}
        />
      </div>
      <div>
        <Route exact path="/" component={_withProps(List, { category })} />
        <Route exact path="/write">
          <Write titleRef={titleRef} contentsRef={contentsRef} />
        </Route>
        <Route path="/view/:data" component={View} />
      </div>
      <div className="Main-right">
        <Route path="/write">
          <RightWrite titleRef={titleRef} contentsRef={contentsRef} />
        </Route>
      </div>
    </div>
  );
};

export default Main;
