import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [host, setHost] = useState("");
  const [test, setTest] = useState("");

  useEffect(() => {
    const _getHost = async () => {
      const res = await axios.get("api/host");
      setHost(res.data.host);
    };
    _getHost();
  }, []);

  useEffect(() => {
    const _dbTest = async () => {
      const res = await axios.get("/api/test");
      setTest(res.data);
      console.log(res.data);
    };
    _dbTest();
  }, []);

  return (
    <div className="App">
      <h3>
        Welcome to <u>{host}</u> Blog!
      </h3>
    </div>
  );
};

export default App;
