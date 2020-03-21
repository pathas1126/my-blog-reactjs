import React, { useRef, useState } from "react";
import Modal from "react-awesome-modal";
import { BackAndClose } from "./index";
import axios from "axios";

const SearchPw = props => {
  const { _closeSearchModal, _backSearchModal, target } = props;
  const [result, setResult] = useState(false);
  const [secret, setSecret] = useState("");
  const [user_data, setUser_data] = useState([]);
  const [change, setChange] = useState(false);

  const user_id_Ref = useRef();
  const email_id_Ref = useRef();
  const email_host_Ref = useRef();
  const secret_input_Ref = useRef();

  const change_password_Ref = useRef();
  const check_change_password_Ref = useRef();

  const _searchPassword = async () => {
    const user_id = user_id_Ref.current.value.trim();

    // 이메일
    const email_id = email_id_Ref.current.value.trim();
    const email_host = email_host_Ref.current.value.trim();

    const user_email = email_id + "@" + email_host;

    // 아이디 체크
    const id_check = /^[a-z]+[a-z0-9]{5,19}$/g;

    // 이메일 체크
    const email_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (!id_check.test(user_id)) {
      return alert("아이디는 영문자로 시작하는 6~20자여야만 합니다");
    }

    if (email_id === "" || email_host === "") {
      return alert("이메일을 모두 입력해주세요!");
    } else if (!user_email.match(email_check)) {
      return alert("올바른 이메일 형식을 입력해주세요");
    }

    // 서버로 데이터 전송
    const obj = { user_id, user_email };
    const res = await axios("/search/pw", {
      method: "POST",
      data: obj,
      headers: new Headers()
    });

    if (res.data === false) {
      return alert("일치하는 데이터가 없습니다. \n 다시 확인해주세요");
    }

    user_id_Ref.current.value = "";

    alert(
      res.data.result[0].email +
        "의 주소로 \n6자리의 숫자 코드가 발신되었습니다."
    );

    return (
      setResult(true),
      setSecret(res.data.secret),
      setUser_data(res.data.result[0])
    );
  };

  // 보안 코드 확인 함수
  const _checkSecretCode = () => {
    const secret_code = Number(secret);

    const secret_input = Number(secret_input_Ref.current.value.trim());

    if (String(secret_input).length !== 6) {
      return alert("6자리의 숫자코드를 입력해 주세요");
    } else if (secret_code !== secret_input) {
      return alert("숫자 코드가 일치하지 않습니다.");
    }
    return setChange(true);
  };

  // 비밀번호 변경 함수
  const _changePassword = async () => {
    const change_password = change_password_Ref.current.value.trim();
    const check_change_password = check_change_password_Ref.current.value.trim();

    const pw_check = /^[a-z]+[a-z0-9]{5,19}$/g;

    if (!pw_check.test(change_password)) {
      return alert("비밀번호는 영문자로 시작하는 6~20자여야만 합니다.");
    } else if (change_password !== check_change_password) {
      return alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
    }

    const user_id = user_data.id;
    const obj = { user_id, change_password };
    await axios("/update/pw", {
      method: "POST",
      data: obj,
      headers: new Headers()
    });

    alert("비밀번호가 변경되었습니다.");
    setResult(false);
    setChange(false);
    return _backSearchModal(target);
  };

  return (
    <div>
      <Modal
        visible={props.search_pw_modal}
        width="400"
        height="500"
        effect="fadeInDown"
      >
        <BackAndClose
          _closeSearchModal={_closeSearchModal}
          _backSearchModal={_backSearchModal}
          target={target}
        />
        {!result ? (
          <div className="Search_div">
            <h4>비밀번호 찾기</h4>

            <div>
              <h5>아이디</h5>
              <input
                ref={user_id_Ref}
                type="text"
                maxLength="15"
                name="search_pw_id"
              />
            </div>

            <div>
              <h5>이메일</h5>
              <input
                ref={email_id_Ref}
                type="text"
                maxLength="20"
                name="search_pw_email"
              />
              <div className="search_id_email_div">
                @
                <input
                  ref={email_host_Ref}
                  type="text"
                  maxLength="15"
                  name="search_pw_write_email"
                />
              </div>
            </div>
            <div>
              <input
                onClick={() => _searchPassword()}
                type="button"
                value="조회하기"
                name="search_pw_submit"
              />
            </div>
          </div>
        ) : !change ? (
          <div className="search_result_div">
            <h4>비밀번호 찾기</h4>

            <p>
              <b>{user_data.email}</b> 이메일 주소로 <br /> 전송된 6자리
              숫자코드를 입력해 주세요
            </p>
            <input
              ref={secret_input_Ref}
              type="text"
              maxLength="6"
              name="pw_secret"
              placeholder="6자리 숫자 코드 입력"
            />
            <input
              type="button"
              value="확인"
              name="pw_secret_submit"
              onClick={() => _checkSecretCode()}
            />
          </div>
        ) : (
          <div className="change_password_div">
            <h4> 비밀번호 변경</h4>

            <div>
              <span>
                변경하려는 비밀번호를 입력해 주세요
                <p>(영문자로 시작해 영문 또는 숫자로 6~20자 입력)</p>
              </span>

              <div>
                <h5>비밀번호</h5>
                <input
                  ref={change_password_Ref}
                  type="password"
                  name="change_password"
                  maxLength="20"
                />
              </div>

              <div>
                <h5>비밀번호 확인</h5>
                <input
                  ref={check_change_password_Ref}
                  type="password"
                  name="check_change_password"
                  maxLength="20"
                />
              </div>
              <input
                type="button"
                value="비밀번호 변경"
                name="change_password_submit"
                onClick={_changePassword}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SearchPw;
