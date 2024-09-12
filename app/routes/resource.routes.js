module.exports = app => {
  const resources = require("../controllers/resource.controller.js");
  var router = require("express").Router();

  //Gets resources by keyword, returns all if no keywords
  router.post('/', resources.findByKeywords);

  router.post('/insert', resources.insert);

  router.post('/find', resources.findByID);

  router.get('/:curr_user', resources.findByOwner);

  app.use('/api/resources', router);
};