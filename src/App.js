import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [name, setName] = useState("");

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

  const _nameUpdate = e => {
    setName(e.target.value);
  };

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
    </div>
  );
};

export default App;
