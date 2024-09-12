module.exports = app => {
    const incidents = require("../controllers/incident.controller.js");
    var router = require("express").Router();

    router.post("/", incidents.create);

    app.use('/api/incidents', router);
}