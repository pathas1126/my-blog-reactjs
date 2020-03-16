const sequelize = require("./models").sequelize;

// admins 테이블을 불러오는 코드
const {
  Admin,
  Board,
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
  },
  add: {
    board: (body, callback) => {
      Board.create({
        title: body.title,
        contents: body.contents,
        date: new Date(86400000)
      })
        .then(data => {
          callback(data);
        })
        .catch(err => {
          throw err;
        });
    }
  },
  get: {
    board: (body, callback) => {
      Board.findAll({
        limit: body.page * body.limit,
        offset: (body.page - 1) * body.limit,
        order: sequelize.literal("board_id DESC")
      })
        .then(data => {
          callback(data);
        })
        .catch(err => {
          throw err;
        });
    },
    board_cnt: callback => {
      Board.count().then(result => {
        callback(result);
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
