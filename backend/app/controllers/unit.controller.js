const { sequelize } = require("../models");
const db = require("../models");
const Unit = db.unit;
const Op = db.Sequelize.Op;

exports.findAllUnits = (req, res) => {
  
    Unit.findAll({
      attributes: ['id', 'unit_name']
    })
      .then(data => {
        if (data) {
          console.log(data);
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Units.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Units"
        });
      });
  };


  