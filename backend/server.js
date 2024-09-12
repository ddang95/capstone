const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

const db = require("./app/models");
db.sequelize.sync();


// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our application." });
});

require("./app/routes/user.routes")(app);
require("./app/routes/cimt.routes")(app);
require("./app/routes/resourceProvider.routes")(app);
require("./app/routes/admin.routes")(app);
require("./app/routes/unit.routes")(app);
require("./app/routes/incident.routes")(app);
require("./app/routes/resource.routes")(app);
require("./app/routes/function.routes")(app);
require("./app/routes/category.routes")(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});