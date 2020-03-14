import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
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

      // 데이터 형식이
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

  /* 
  
  useEffect(() => {
    const _getHost = async () => {
        const res = await axios.get("api/host");
        setHost(res.data.host);
      };
      _getHost();
    }, []);
    const [test, setTest] = useState("");

    useEffect(() => {
    const _dbTest = async () => {
      const res = await axios.get("/api/test");
      setTest(res.data);
      console.log(res.data);
    };
    _dbTest();
  }, []);
  
      useEffect(() => {
        const _addData = async e => {
          console.log(
            await axios("/add/data", {
              method: "POST",
              data: { test: "Complete!" },
              headers: new Headers()
            })
          );
        };
        _addData();
      }, []);
  */

  return (
    <div className="App">
      <h3>
        Welcome to <u>pathas</u> Blog!
      </h3>
      <form method="POST" onSubmit={_addData}>
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
                    gridTemplateColumns: "32% 35%",
                    width: "50%",
                    marginLeft: "25%"
                  }}
                >
                  <div className="">{el.id}</div>
                  <div className="">{el.name}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default App;
