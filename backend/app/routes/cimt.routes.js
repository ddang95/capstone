module.exports = app => {
    const cimt = require("../controllers/cimt.controller.js");
    var router = require("express").Router();
    
    router.get("/", cimt.findByUsernameCimt);

    app.use('/api/cimts', router);
  };