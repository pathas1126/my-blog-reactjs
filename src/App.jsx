import React, { useState, useEffect, useCallback } from "react";

import { Header } from "./inc";
import { Main } from "./page";
import queryString from "query-string";
import axios from "axios";

const App = props => {
  // login 관련 state
  const [login, setLogin] = useState(false);
  const [admin, setAdmin] = useState("");
  const [user_ip, setUser_ip] = useState("");
  const [login_modal, setLogin_modal] = useState(false);

  // List 관련 state
  const [list_data, setList_data] = useState([]);
  const [list_page, setList_page] = useState(1);
  const list_limit = 10;
  const [list_all_page, setList_all_page] = useState([]);
  const [list_search, setList_search] = useState("");
  const [_, setCategory] = useState("");

  // List 가져오는 함수
  const _setPage = () => {
    if (sessionStorage.page) {
      setList_page(Number(sessionStorage.page));
      return Number(sessionStorage.page);
    }
    setList_page(1);
    return 1;
  };

  const _changePage = el => {
    setList_page(el);
    sessionStorage.setItem("page", el);

    return _getListData();
  };

  const _getListData = useCallback(async () => {
    const list_pages = _setPage();

    let categories = "";
    if (sessionStorage.getItem("category")) {
      categories = sessionStorage.getItem("category");
    }

    let search = "";
    if (queryString.parse(props.location.search)) {
      search = queryString.parse(props.location.search).search;
    }

    // Board 테이블 데이터 전체 수
    const total_cnt = await axios("/get/board_cnt", {
      method: "POST",
      headers: new Headers(),
      data: { search, category: categories }
    });

    // List 데이터 가져오기
    const total_list = await axios("/get/board", {
      method: "POST",
      headers: new Headers(),
      data: {
        limit: list_limit,
        page: list_pages,
        search,
        category: categories
      }
    });

    // 전체 페이지 수 구하기
    let page_arr = [];

    for (let i = 1; i <= Math.ceil(total_cnt.data.cnt / list_limit); i++) {
      page_arr.push(i);
    }

    setList_data(JSON.stringify(total_list.data));
    setList_all_page(page_arr);
    setList_search(search);
  }, [props.location.search]);

  // Category 변경
  const _changeCategory = target => {
    sessionStorage.setItem("category", target);
    setCategory(target);

    return _getListData();
  };

  // 렌더링 될 때 sessionStorage값으로 state 값 저장
  useEffect(() => {
    _getListData();
    if (sessionStorage.login && sessionStorage.IP) {
      setLogin(JSON.parse(sessionStorage.login)[0].id);
      setAdmin(JSON.parse(sessionStorage.login)[0].admin);
      setUser_ip(JSON.parse(sessionStorage.IP));
      console.log(login, admin, user_ip);
    }
  }, [_getListData, admin, login, user_ip]);

  // 로그인 함수
  const _login = data => {
    console.log(data);
    sessionStorage.setItem("login", JSON.stringify(data.data));
    sessionStorage.setItem("IP", JSON.stringify(data.ip));

    setLogin(JSON.parse(sessionStorage.login)[0].id);
    setAdmin(JSON.parse(sessionStorage.login)[0].admin);
    setUser_ip(JSON.parse(sessionStorage.IP));
    console.log(login, admin, user_ip);

    return window.location.reload();
  };

  // 로그아웃 함수
  const _logout = () => {
    setLogin(false);
    setAdmin(false);
    setUser_ip("");

    sessionStorage.removeItem("login");
    sessionStorage.removeItem("IP");
  };

  //
  const _toggleModal = boolean => {
    setLogin_modal(boolean);
  };

  /* 
  const [name, setName] = useState("");
  const [list, setList] = useState("");

  // 데이터 추가 함수
  const _addData = async e => {
    e.preventDefault();

    const res = await axios("/add/data", {
      method: "POST",
      data: { data: name },
      headers: new Headers()
    });

    if (res.data) {
      alert("데이터를 추가했습니다.");
      return window.location.reload();
    }
  };

  // input value 변경 함수
  const _nameUpdate = e => {
    setName(e.target.value);
  };

  // 데이터 조회 함수
  useEffect(() => {
    const _getData = async () => {
      const res = await axios.get("/get/data");

      // 데이터 형식이 배열이 아닌 경우 배열로 바꾸어서 처리해주는 함수
      if (res.data[0] === undefined) {
        console.log("데이터가 배열 형식이 아닙니다.");
        let cover = [];
        cover.push(res.data);
        return setList(cover);
      }
      setList(res.data);
    };

    _getData();
  }, []);

  // 데이터 수정 메소드
  const _modify = async el => {
    const modify = prompt(el.name + "을 어떤 이름으로 변경할까요?");

    if (modify !== null) {
      const body = {
        name: modify,
        id: el.id
      };

      const res = await axios("/modify/data", {
        method: "POST",
        data: { modify: body },
        headers: new Headers()
      });

      if (res.data) {
        alert("데이터를 수정했습니다.");
        return window.location.reload();
      }
    }
  };

  // 데이터 삭제 메소드
  const _delete = async el => {
    const remove = window.confirm(el.name + "을 삭제합니까?");

    if (remove) {
      const body = { id: el.id };
      const res = await axios("/delete/data", {
        method: "POST",
        data: { delete: body },
        headers: new Headers()
      });

      if (res) {
        alert("데이터를 삭제했습니다.");
        return window.location.reload();
      }
    }
  };
  */

  return (
    <div className="App">
      <Header
        admin={admin}
        user_ip={user_ip}
        login={login}
        _login={_login}
        _logout={_logout}
        login_modal={login_modal}
        _toggleModal={_toggleModal}
      />
      <Main
        admin={admin}
        user_ip={user_ip}
        login={login}
        login_modal={login_modal}
        _toggleModal={_toggleModal}
        list_data={list_data}
        list_all_page={list_all_page}
        list_search={list_search}
        list_page={list_page}
        _changePage={_changePage}
        _changeCategory={_changeCategory}
      />
      {/* <form method="POST" onSubmit={_addData}>
        <input type="text" maxLength="10" onChange={e => _nameUpdate(e)} />
        <input type="submit" value="Add" />
      </form>
      <br />
      <br />
      <div style={{ height: "250px", overflos: "auto" }}>
        <h4 style={{ color: "#ababab" }}>Theachers List</h4>

        <div
          style={{
            border: "solid 1px black",
            width: "50%",
            marginLeft: "25%",
            textAlign: "left"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "32% 35% 30%",
              textAlign: "center"
            }}
          >
            <div>Number</div>
            <div>Name</div>
            <div>Other</div>
          </div>

          {list.length !== 0 &&
            list.map((el, key) => {
              return (
                <div
                  key={key}
                  style={{
                    display: "grid",
                    lineHeight: "40px",
                    gridTemplateColumns: "35% 35% 35% 0%",
                    width: "50%",
                    marginLeft: "25%"
                  }}
                >
                  <div className="">{el.id}</div>
                  <div className="">{el.name}</div>
                  <div
                    style={{ color: "#ababab", cursor: "pointer" }}
                    onClick={() => _modify(el)}
                  >
                    Modify
                  </div>
                  <div
                    style={{ color: "#ababab", cursor: "pointer" }}
                    onClick={() => _delete(el)}
                  >
                    Delete
                  </div>
                </div>
              );
            })}
        </div>
      </div> */}
    </div>
  );
};

export default App;
