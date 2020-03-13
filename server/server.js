// express를 가져와서 app 변수에 저장
const express = require("express");

// app으로 서버를 관리할 수 있게 됨
const app = express();

// Sequeilize
const sequelize = require("./models").sequelize;
sequelize.sync();

app.use(express.json());

// PORT 번호 설정
const PORT = process.env.PORT || 4000;

// 지정한 PORT 번호로 서버를 구동시킴, listen() 메소드 사용
app.listen(PORT, () => {
  console.log(`Server On: http://localhost:${PORT}/`);
});

// 라우터 설정(서버 응답 출력), get() 메소드
app.get("/api/host", (req, res) => {
  res.send({ host: "pathas" });
});

/*
MySQL 직접 연결

// DB
const db = require("./config/db");

// DB 조회
app.get("/api/test", (req, res) => {
  db.query("select * from test", (err, data) => {
    if (!err) {
      res.send(data);
    } else {
      console.log(err);
      res.send(err);
    }
  });
});
*/
