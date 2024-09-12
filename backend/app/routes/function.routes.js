module.exports = app => {
    const functions = require("../controllers/function.controller.js");
    var router = require("express").Router();
    
    router.post("/", functions.findAllFunctions);

    router.get('/', functions.findAllFunctions);

    app.use('/api/functions', router);
  };