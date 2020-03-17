import React from "react";

import { Header } from "./inc";
import { Main } from "./page";

const App = () => {
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
      <Header />
      <Main />
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
