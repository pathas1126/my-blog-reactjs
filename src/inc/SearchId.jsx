import React, { useRef, useState } from "react";
import Modal from "react-awesome-modal";
import { BackAndClose } from "./index";
import axios from "axios";

const SearchId = props => {
  const [result, setResult] = useState(false);

  const { _closeSearchModal, _backSearchModal, target } = props;

  const userNameRef = useRef();
  const userBirthdayRef = useRef();
  const userSexRef = useRef();
  const userEmailIdRef = useRef();
  const userEamilHostRef = useRef();

  const _searchUserID = async () => {
    const user_name = userNameRef.current.value;
    const user_birthday = userBirthdayRef.current.value;
    const user_sex = userSexRef.current.value;
    const email_id = userEmailIdRef.current.value;
    const email_host = userEamilHostRef.current.value;

    const user_email = email_id + "@" + email_host;

    // 이메일 체크
    const email_check = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

    if (user_name === "" || user_name.legnth < 1) {
      return alert("이름을 작성해주세요");
    } else if (user_name.legnth < 2) {
      return alert("이름은 2글자 이상이어야 합니다.");
    }

    if (user_birthday === 0 || user_sex === 0) {
      return alert("생년월일을 모두 입력해 주세요");
    } else if (isNaN(user_birthday) || isNaN(user_sex)) {
      return alert("생년월일은 숫자만 입력해 주세요");
    }

    if (email_id === "" || email_host === "") {
      return alert("이메일을 모두 입력해주세요");
    } else if (!user_email.match(email_check)) {
      return alert("올바른 이메일 형식을 입력해 주세요");
    }

    const obj = {
      user_name,
      user_birthday,
      user_sex,
      user_email
    };

    const res = await axios("/search/id", {
      method: "POST",
      data: obj,
      headers: new Headers()
    });

    if (res.data.length === 0) {
      return alert("일치하는 데이터가 없습니다. \n 다시 확인해주세요");
    }

    setResult(res.data);
  };

  //  result => false
  const _resetIDResult = () => {
    setResult(false);
  };

  const _resetBack = () => {
    _resetIDResult();
    return _backSearchModal(target);
  };

  return (
    <div>
      <Modal
        visible={props.search_id_modal}
        width="400"
        height="500"
        effect="fadeInDown"
      >
        <BackAndClose
          _closeSearchModal={_closeSearchModal}
          _backSearchModal={_backSearchModal}
          target={target}
          _resetIDResult={_resetIDResult}
        />
        {!result ? (
          <div className="Search_div">
            <h4>아이디 찾기</h4>
            <div>
              <h5>이름</h5>
              <input
                type="text"
                maxLength="15"
                name="search_id_name"
                ref={userNameRef}
              />
            </div>
            <div>
              <h5>생년월일</h5>
              <input
                type="text"
                maxLength="6"
                name="search_id_birthday"
                ref={userBirthdayRef}
              />{" "}
              -
              <input
                type="text"
                maxLength="6"
                name="search_id_sex"
                ref={userSexRef}
              />{" "}
              ******
            </div>
            <div>
              <h5>이메일</h5>
              <input
                type="text"
                maxLength="20"
                name="search_id_email"
                ref={userEmailIdRef}
              />
              <div className="search_id_email_div">
                @
                <input
                  type="text"
                  maxLength="15"
                  name="search_id_write_email"
                  ref={userEamilHostRef}
                />
              </div>
            </div>
            <div>
              <input
                type="button"
                value="조회하기"
                name="search_id_submit"
                onClick={() => _searchUserID()}
              />
            </div>
          </div>
        ) : (
          <div>
            <h4>아이디 찾기</h4>
            <div className="Search_id_result">
              <p>아래의 회원 정보를 찾았습니다.</p>
              <div className="Search_id_result_div">
                <div>
                  <h5>아이디</h5>
                  {result[0].id}
                </div>

                <div>
                  <h5>가입일</h5>
                  {result[0].signup_date.slice(0, 10)}
                </div>
              </div>

              <div>
                <input
                  type="button"
                  value="돌아가기"
                  name="search_id_back"
                  onClick={() => _resetBack()}
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SearchId;
