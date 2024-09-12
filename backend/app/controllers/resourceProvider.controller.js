const { sequelize } = require("../models");
const db = require("../models");
const Rp = db.rp;
const Op = db.Sequelize.Op;

exports.findByUsernameRp = (req, res) => {
    const name = req.query.username;
  
    Rp.findAll({
      attributes: ['username', 'strt_addr'],
      where: {username: name}
    })
      .then(data => {
        if (data) {
          console.log(data);
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Resource Provider with username=${name}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Resource Provider with username=" + name
        });
      });
  };


  