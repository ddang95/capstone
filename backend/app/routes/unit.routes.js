module.exports = app => {
    const unit = require("../controllers/unit.controller.js");
    var router = require("express").Router();
    
    router.post("/", unit.findAllUnits);

    app.use('/api/units', router);
  };