const { sequelize } = require("../models");
const db = require("../models");
const Functions = db.function;
const Op = db.Sequelize.Op;

exports.findAllFunctions = (req, res) => {

  Functions.findAll({
    attributes: ['func_num', 'func_name'],
  })
    .then(data => {
      if (data) {
        //console.log(data);
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Functions.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving functions"
      });
    });
};

exports.getFunctions = (req, res) => {
  Functions.findAll()
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Functions.`
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}



