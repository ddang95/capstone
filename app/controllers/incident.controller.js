const db = require("../models");
const Incident = db.incident;
const Category = db.category;
// const Op = db.Sequelize.Op;

// Create and Save a new Incident
exports.create = (req, res) => {
    // validate request
    console.log(req.body);
    if (!req.body.descript) {
        res.status(400).send({
          message: "desc can not be empty!"
        });
        return;
    }

    if (!req.body.inc_date) {
        res.status(400).send({
          message: "date can not be empty!"
        });
        return;
    }

    // Create an Incident
    const incident = {
        descript: req.body.descript,
        date: req.body.date,
        cat_id: req.body.cat_id,
        inc_owner: req.body.inc_owner,
    };

    //Save Incident in the database
    Incident.create({
        descript: incident.descript, 
        inc_date: incident.date, 
        cat_id: incident.cat_id, 
        inc_owner: incident.inc_owner})
        .then(data => {
          console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the Incident."
            });
        });
};

// Retrieve all Categories from the database.
exports.findAllCat = (req, res) => {
    const cat_type = req.query.cat_type;
    // var condition = cat_type ? { cat_type: { [Op.like]: `%${cat_type}%` } } : null;
    Category.findAllCat({ where: { cat_type: cat_type } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving categories."
        });
    });
};  