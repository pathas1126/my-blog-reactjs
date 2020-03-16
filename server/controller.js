const path = require("path");
const model = require("./model");

module.exports = {
  api: {
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
    }
  }
};
