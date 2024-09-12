module.exports = app => {
    const categories = require("../controllers/category.controller.js");
    var router = require("express").Router();

    //Retrieves all categories from the DB
    router.get('/', categories.getCategories);
  
    app.use('/api/categories', router);
  };