const path = require("path");
const model = require("./model");

const hashing = require(path.join(__dirname, "config", "hashing.js"));
const salt = require(path.join(__dirname, "config", "db.json")).salt;

module.exports = {
  api: {
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
  }
};
