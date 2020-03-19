import React, { useRef, useState } from "react";
import "./Main.css";
import { Route } from "react-router-dom";
import { List, Write, View, SignUp } from "./index";
import { RightWrite } from "./right";
import { Category } from "./left";

const Main = props => {
  const [category] = useState("");
  const [contents, setContents] = useState("");

  const {
    login,
    admin,
    user_ip,
    list_data,
    list_all_page,
    list_search,
    list_page,
    _changePage,
    _changeCategory
  } = props;

  const titleRef = useRef();

  // 카테고리 변경 함수, App 에서 넘겨받음
  // const _changeCategory = target => {
  //   setCategory(target);
  //   sessionStorage.setItem("category", target);
  // };

  // 컨텐츠 저장 함수
  const _getContents = val => {
    const contents = val.trim();

    setContents(contents);
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
            <Category
              _changeCategory={_changeCategory}
              login={login}
              admin={admin}
              user_ip={user_ip}
            />
          )}
        />
      </div>

      <div>
        <Route
          exact
          path="/"
          component={_withProps(List, {
            category,
            list_data,
            list_all_page,
            list_page,
            _changePage,
            list_search
          })}
        />
        <Route exact path="/write">
          <Write
            titleRef={titleRef}
            _getContents={_getContents}
            contents={contents}
            {...props}
          />
        </Route>
        <Route path="/view/:data" component={View} />
        <div>
          <Route path="/signup" component={SignUp} />
        </div>
      </div>

      <div className="Main-right">
        <Route path="/write">
          <RightWrite titleRef={titleRef} contents={contents} />
        </Route>
      </div>
    </div>
  );
};

export default Main;
