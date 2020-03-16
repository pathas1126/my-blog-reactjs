const path = require("path");
const model = require("./model");

const hashing = require(path.join(__dirname, "config", "hashing.js"));
const salt = require(path.join(__dirname, "config", "db.json")).salt;

module.exports = {
  api: {
    // 관리자 로그인
    sendPw: (req, res) => {
      const body = req.body;
      const hash = hashing.enc(body.id, body.pwd, salt);

      model.api.searchInfo(body, hash, result => {
        let obj = {};
        if (result[0]) {
          obj["suc"] = true;
          obj["msg"] = "로그인 성공";
        } else {
          obj["suc"] = false;
          obj["msg"] = "로그인 실패";
        }
        res.send(obj);
      });
    },
    // 게시글 추가
    board: (req, res) => {
      const body = req.body;

      model.add.board(body, result => {
        if (result) {
          res.send(true);
        }
      });
    }
    /*
    getData: (req, res) => {
      console.log("컨트롤러 연결 성공!!");
      model.api.getData(data => {
        return res.send(data);
      });
    },
    addData: (req, res) => {
      model.api.addData(req, data => {
        return res.send(data);
      });
    },
    modifyData: (req, res) => {
      model.api.modifyData(req, data => {
        return res.send(data);
      });
    },
    deleteData: (req, res) => {
      model.api.deleteData(req);
      return res.send({});
    }*/
  },
  // 게시글, 수 가져오기
  get: {
    board: (req, res) => {
      const body = req.body;
      model.get.board(body, result => {
        if (result) {
          res.send(result);
        }
      });
    },
    board_cnt: (req, res) => {
      model.get.board_cnt(cnt => {
        const result = { cnt };
        res.send(result);
      });
    }
  }
};
