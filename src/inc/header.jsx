import React, { useState, useRef, useEffect } from "react";
import { Route, Link, Switch } from "react-router-dom";
import "../App.css";

import Modal from "react-awesome-modal";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const idRef = useRef();
  const pwdRef = useRef();

  useEffect(() => {
    console.log("아이디: " + id + ", 비번: " + pwd);
  }, [id, pwd]);

  const _openModal = () => {
    setVisible(true);
  };

  const _closeModal = () => {
    setVisible(false);
  };

  const _changeId = () => {
    const id = idRef.current.value;
    setId(id);
  };
  const _changePwd = () => {
    const pwd = pwdRef.current.value;
    setPwd(pwd);
  };
  return (
    <div className="header_grid">
      <div></div>
      <div className="acenter">
        <Route path="/" />
        <Link className="link_tit" to="/">
          <h3>Pathas' blog</h3>
        </Link>
      </div>
      <h5
        onClick={() => {
          _openModal();
        }}
      >
        관리자 로그인
      </h5>
      <div className="acenter">
        <Modal
          visible={visible}
          width="400"
          height="300"
          effect="fadeInDown"
          onClickAway={() => _closeModal()}
        >
          <h4 className="acenter login_tit">관리자 로그인</h4>
          <form>
            <div className="login_div">
              <div className="login_input_div">
                <p>관리자 ID</p>
                <input
                  ref={idRef}
                  onChange={() => {
                    _changeId();
                  }}
                  type="text"
                  name="id"
                />
              </div>

              <div className="login_input_div" style={{ marginTop: "40px" }}>
                <p>관리자 Password</p>
                <input
                  ref={pwdRef}
                  onChange={() => _changePwd()}
                  type="password"
                  name="password"
                />
              </div>
            </div>
          </form>
          <div className="submit_div">
            <div>
              <input type="button" value="로그인" />
            </div>
            <div>
              <input value="취소" type="button" onClick={() => _closeModal()} />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Header;
