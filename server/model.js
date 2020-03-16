const sequelize = require("./models").sequelize;

// admins 테이블을 불러오는 코드
const {
  Admin,
  Sequelize: { Op }
} = require("./models");

sequelize.query("SET NAMES utf8");

module.exports = {
  api: {
    searchInfo: (body, hash, callback) => {
      Admin.findAll({
        where: { [Op.and]: [{ user_id: body.id, password: hash }] }
      })
        .then(data => {
          callback(data);
        })
        .catch(err => {
          throw err;
        });
    }
  }
};

// Teacher 테이블을 가져와서 서버에서 읽을 수 있도록 함
/*
const {
  Teacher,
  Sequelize: { Op }
} = require("./models");

module.exports = {
  api: {
    getData: callback => {
      Teacher.findAll()
        .then(result => {
          callback(result);
        })
        .catch(err => {
          throw err;
        });
    },
    addData: (req, callback) => {
      Teacher.create({
        name: req.body.data
      })
        .then(result => {
          callback(result);
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
    },
    modifyData: (req, callback) => {
      Teacher.update(
        { name: req.body.modify.name },
        { where: { id: req.body.modify.id } }
      )
        .then(result => {
          callback(result);
        })
        .catch(err => {
          throw err;
        });
    },
    deleteData: (req, callback) => {
      Teacher.destroy({ where: { id: req.body.delete.id } }).catch(err => {
        throw err;
      });
    }
  }
};
*/
