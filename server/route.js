const express = require("express");
const router = express.Router();
const controller = require("./controller");

// 관리자 비밀번호 전송
router.post("/send/pw", controller.api.sendPw);

// 게시글 추가
router.post("/add/board", controller.api.board);

// 게시글 목록 불러오기
router.post("/get/board", controller.get.board);

// 게시글 수 가져오기
router.post("/get/board_cnt", controller.get.board_cnt);

// View 게시글 가져오기
router.post("/get/board_data", controller.get.board_data);

// 라우터 경로 설정
// router.HTTP 메소드 형태
/*
router.get("/get/data", controller.api.getData);

router.post("/add/data", controller.api.addData);
router.post("/modify/data", controller.api.modifyData);
router.post("/delete/data", controller.api.deleteData);

*/
module.exports = router;
