const { sequelize } = require("../models");
const db = require("../models");
const { QueryTypes } = require("sequelize")
const Categories = db.category;
const Op = db.Sequelize.Op;

exports.getCategories = (req, res) => {
  Categories.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}