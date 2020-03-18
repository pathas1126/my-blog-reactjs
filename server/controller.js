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
    }
  },
  add: {
    // 게시글 추가
    board: (req, res) => {
      const body = req.body;

      model.add.board(body, result => {
        if (result) {
          res.send(true);
        }
      });
    },
    category: (req, res) => {
      const body = req.body;

      model.add.category(body, result => {
        let obj = {};
        if (result) {
          obj["suc"] = true;
          obj["msg"] = "카테고리가 생성되었습니다.";
        } else {
          obj["suc"] = false;
          obj["msg"] = "이미 있는 카테고리 입니다.";
        }

        res.send(obj);
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
      const body = req.body;

      model.get.board_cnt(body, cnt => {
        const result = { cnt };
        res.send(result);
      });
    },
    board_data: (req, res) => {
      const body = req.body;

      model.get.board_data(body, data => {
        const result = { data };
        res.send(result);
      });
    },
    category: (req, res) => {
      model.get.category(data => {
        res.send(data);
      });
    }
  },
  update: {
    view_cnt: (req, res) => {
      const body = req.body;

      // 게시글 조회수 중복 증가 방지, 쿠키 활용
      const expires = new Date();
      expires.setDate(expires.getDate() + 1);

      const cookie_name = "board_" + body.id;
      const exist_cookie = req.cookies[cookie_name];

      if (!exist_cookie) {
        res.cookie(cookie_name, true, {
          expires
        });

        model.update.view_cnt(body, result => {
          if (result) {
            res.send(true);
          }
        });
      }
    }
  },
  delete: {
    category: (req, res) => {
      const body = req.body;

      model.delete.category(body, result => {
        if (result) {
          res.send(result);
        }
      });
    }
  },
  modify: {
    category: (req, res) => {
      const body = req.body;
      console.log(body);

      model.modify.category(body, result => {
        let obj = {};
        if (result) {
          obj["suc"] = true;
          obj["msg"] = "카테고리가 변경되었습니다.";
        } else {
          obj["suc"] = false;
          obj["msg"] = "이미 있는 카테고리 입니다.";
        }
        res.send(obj);
      });
    }
  }
};
