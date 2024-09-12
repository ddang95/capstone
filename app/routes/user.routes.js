module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();

    router.post("/", users.findByUsername);


    app.use('/api/users', router);


  };