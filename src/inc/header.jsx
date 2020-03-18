import React, { useState, useRef, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import "../App.css";
import axios from "axios";

import Modal from "react-awesome-modal";

const Header = props => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const { login } = props;

  const idRef = useRef();
  const pwdRef = useRef();

  // 로그인 함수, id, pwd 서버로 전송
  const _selectUserData = async e => {
    setId(id.trim());
    setPwd(pwd.trim());

    if (id === "") {
      return alert("아이디를 입력해 주세요!!");
    } else if (pwd === "") {
      return alert("비밀번호를 입력해 주세요!!");
    }

    const obj = { id: id, pwd: pwd };

    const res = await axios("/send/pw", {
      method: "POST",
      data: obj,
      header: new Headers()
    });
    if (res.data) {
      console.log(res.data.msg);

      if (res.data.suc) {
        props._login();
        _closeModal();

        return alert("로그인 되었습니다.");
      } else {
        return alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    }
  };

  // 로그아웃 함수
  const _logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      props._logout();
    }
  };

  // 모달 열고 닫기
  const _openModal = () => {
    setVisible(true);
  };

  const _closeModal = () => {
    setVisible(false);
  };

  // input 값 가져오기
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
      <div className="acenter">
        {login && (
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
      {login ? (
        <h5 className="btn_cursor" onClick={_logout}>
          관리자 로그아웃
        </h5>
      ) : (
        <h5
          className="btn_cursor"
          onClick={() => {
            _openModal();
          }}
        >
          관리자 로그인
        </h5>
      )}
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
              <input
                type="button"
                value="로그인"
                onClick={() => {
                  _selectUserData();
                }}
              />
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
