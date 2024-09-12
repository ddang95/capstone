module.exports = app => {
    const admin = require("../controllers/admin.controller.js");
    var router = require("express").Router();
    
    router.get("/", admin.findByUsernameAdmin);

    app.use('/api/admins', router);
  };