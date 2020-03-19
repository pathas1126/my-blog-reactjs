import React from "react";
import { Route, Link } from "react-router-dom";
import "../App.css";

import { Login } from "./index";

const Header = props => {
  const { login, _login, admin, user_ip, login_modal, _toggleModal } = props;

  // 로그인 함수, id, pwd 서버로 전송
  // Login.jsx 로 이동

  // 로그아웃 함수
  const _logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      props._logout();
    }
  };

  // 모달 열고 닫기
  const _openModal = () => {
    return props._toggleModal(true);
  };

  // _toggleModal(false)로 대체
  // const _closeModal = () => {
  //   setVisible(false);
  // };

  // input 값 가져오기
  // Login.jsx 로 이동

  return (
    <div className="header_grid">
      <div className="acenter">
        {login &&
          admin === "Y" &&
          (user_ip === "192.168.200.143" || user_ip === "192.168.0.241") && (
            <h5>
              <Link to="/write">포스트 작성</Link>
            </h5>
          )}
      </div>
      <div className="acenter">
        <Route path="/" />
        <Link className="link_tit" to="/">
          <h3>Pathas' blog</h3>
        </Link>
      </div>

      <div className="acenter">
        <ul className="btn_list">
          {login ? (
            <li className="btn_cursor" onClick={_logout}>
              로그아웃
            </li>
          ) : (
            <li
              className="btn_cursor"
              onClick={() => {
                _openModal();
              }}
            >
              로그인
            </li>
          )}
          <Login
            _login={_login}
            login_modal={login_modal}
            _toggleModal={_toggleModal}
          />
          {!login && (
            <li className="btn_cursor">
              <Link to="signup">회원가입</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
