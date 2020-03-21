const path = require("path");
const model = require("./model");

const hashing = require(path.join(__dirname, "config", "hashing.js"));
const salt = require(path.join(__dirname, "config", "db.json")).salt;

const moment = require("moment-timezone");
const now_date = moment()
  .tz("Asia/Seoul")
  .format("YYYY-MM-DD HH:mm:ss");

// 사용자 ip 가져오기
const user_ip = require("ip");

// 이메일 보내기
const nodeMailer = require("nodemailer");

// 메일 발송 계정 설정
const mailPoster = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    user: "gmail 주소 입력",
    pass: "gmail 비밀 번호 입력"
  }
});

// 메일 수신 계정 설정
const mailOpt = (user_data, title, contents) => {
  const mailOptions = {
    from: "gamil 주소 입력",
    to: user_data.email,
    subject: title,
    text: contents
  };
  return mailOptions;
};

// 메일 전송 함수
const sendMail = mailOption => {
  mailPoster.sendMail(mailOption, (error, info) => {
    if (error) {
      console.error("에러>>>>>>>" + error);
    } else {
      console.log("전송 완료 " + info.response);
    }
  });
};

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
          obj["ip"] = user_ip.address();
          obj["data"] = result;
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
    },
    user: (req, res) => {
      const body = req.body;
      const hash_pw = hashing.enc(body.id, body.password, salt);

      model.add.user(body, hash_pw, now_date, result => {
        res.send(result);
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
    },
    pw: (req, res) => {
      const body = req.body;
      const hash_pw = hashing.enc(body.user_id, body.change_password, salt);

      model.update.pw(body, hash_pw, result => {
        res.send(true);
      });
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
  },
  search: {
    id: (req, res) => {
      const body = req.body;

      model.search.id(body, result => {
        res.send(result);
      });
    },
    pw: (req, res) => {
      const body = req.body;

      model.search.pw(body, result => {
        // 클라이언트로 전송할 데이터를 담을 객체
        let res_data = {};

        // 데이터 조회에 성공할 경우 이메일 전송
        if (result[0]) {
          const title = "비밀번호 조회 인증에 대한 6자리 숫자입니다.";
          const contents = () => {
            let number = "";
            let random = 0;

            for (let i = 0; i < 6; i++) {
              random = Math.trunc(Math.random() * (9 - 0) + 0);
              number += random;
            }
            res_data["secret"] = number;
            return `인증 칸에 아래의 숫자를 입력해주세요
            ${number}`;
          };
          const mailOption = mailOpt(result[0].dataValues, title, contents());
          sendMail(mailOption);
          res_data["result"] = result;
          res.send(res_data);
        } else {
          // 데이터가 조회되지 않을 경우
          res.send(false);
        }
      });
    }
  }
};
