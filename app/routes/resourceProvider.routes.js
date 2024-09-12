module.exports = app => {
    const rp = require("../controllers/resourceProvider.controller.js");
    var router = require("express").Router();
    
    router.get("/", rp.findByUsernameRp);

    app.use('/api/rps', router);
  };