// express를 가져와서 app 변수에 저장
const express = require("express");

// app으로 서버를 관리할 수 있게 됨
const app = express();

// route.js의 router를 가져옴
const router = require("./route");

// Sequeilize
const sequelize = require("./models").sequelize;
const bodyParser = require("body-parser");

sequelize.sync();

// use(), METHOD() 미들웨어 호출 함수
// app이 요청을 받을 때마다 ()안의 함수가 실행됨
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// router, app이 '/' 경로로 요청을 받을 때마다 router 호출
app.use("/", router);

// PORT 번호 설정
const PORT = process.env.PORT || 4000;

// 지정한 PORT 번호로 서버를 구동시킴, listen() 메소드 사용
app.listen(PORT, () => {
  console.log(`Server On: http://localhost:${PORT}/`);
});

// // client로부터 추가된 값을 조회할 수 있는 API 작성
// app.post("/add/data", (req, res) => {
//   console.log(req.body);

//   Teacher.create({
//     name: req.body.data
//   })
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       console.log(err);
//       throw err;
//     });
// });

// // /get/data로 요청이 들어온 경우 Teacher 테이블의 모든 데이터를
// // Client로 전송하는 코드
// app.get("/get/data", (req, res) => {
//   Teacher.findAll()
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       throw err;
//     });
// });

// // 데이터 수정 코드
// app.post("/modify/data", (req, res) => {
//   Teacher.update(
//     { name: req.body.modify.name },
//     { where: { id: req.body.modify.id } }
//   )
//     .then(result => {
//       res.send(result);
//     })
//     .catch(err => {
//       throw err;
//     });
// });

// // 데이터 삭제 요청 처리 코드
// app.post("/delete/data", (req, res) => {
//   Teacher.destroy({ where: { id: req.body.delete.id } })
//     .then(res => {
//       res.sendStatus(200);
//     })
//     .catch(err => {
//       throw err;
//     });
// });

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
