// express를 가져와서 app 변수에 저장
const express = require("express");

// app으로 서버를 관리할 수 있게 됨
const app = express();

// PORT 번호 설정
const PORT = process.env.PORT || 4000;

// 서버 응답 출력, get() 메소드
app.get("/", (req, res) => {
  res.send(`Response Complete`);
});

// 지정한 PORT 번호로 서버를 구동시킴, listen() 메소드 사용
app.listen(PORT, () => {
  console.log(`Server On: http://localhost:${PORT}/`);
});
