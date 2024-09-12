const { sequelize } = require("../models");
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

exports.findByUsername = (req, res) => {
    const name = req.query.username;
  
    User.findAll({
      attributes: ['username', 'pass', 'display_name', 'user_role'],
      where: {username: name}
    })
      .then(data => {
        if (data) {
          console.log(data);
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with username=${name}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with username=" + name
        });
      });
  };


  