import React, { useState, useRef } from "react";
import Modal from "react-awesome-modal";
import axios from "axios";

const Login = props => {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const idRef = useRef();
  const pwdRef = useRef();

  const { _login, login_modal, _toggleModal } = props;

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
        _login(res.data);
        _toggleModal(false);

        return alert("로그인 되었습니다.");
      } else {
        return alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    }
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
    <div>
      <Modal
        visible={login_modal}
        width="400"
        height="300"
        effect="fadeInDown"
        onClickAway={() => _toggleModal(false)}
      >
        <h4 className="acenter login_tit">로그인</h4>
        <form>
          <div className="login_div">
            <div className="login_input_div">
              <p> ID</p>
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
              <p>Password</p>
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
            <input
              value="취소"
              type="button"
              onClick={() => _toggleModal(false)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
