const { sequelize } = require("../models");
const db = require("../models");
const Cimt = db.cimt;
const Op = db.Sequelize.Op;

exports.findByUsernameCimt = (req, res) => {
    const name = req.query.username;
  
    Cimt.findAll({
      attributes: ['username', 'phone_num'],
      where: {username: name}
    })
      .then(data => {
        if (data) {
          console.log(data);
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Cimt with username=${name}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Cimt with username=" + name
        });
      });
  };


  