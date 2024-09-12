const { sequelize } = require("../models");
const db = require("../models");
const Admin = db.admin;
const Op = db.Sequelize.Op;

exports.findByUsernameAdmin = (req, res) => {
    const name = req.query.username;
  
    Admin.findAll({
      attributes: ['username', 'email'],
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


  