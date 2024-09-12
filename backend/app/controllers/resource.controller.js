const { sequelize } = require("../models");
const db = require("../models");
const { QueryTypes } = require("sequelize")
const Resources = db.resource;
const Functions = db.function;
const Units = db.unit;
const Op = db.Sequelize.Op;


//Builds SQL query and returns info from DB
exports.findByKeywords = (req, res) => {
  const keyword = req.body.keyword;
  const primFunc = req.body.primFunc;
  const distance = req.body.distance;

  let search = [];
  if (keyword) {
    search.push(`emergency_resource.res_name LIKE '%${keyword}%' OR emergency_resource.capabilities LIKE '%${keyword}%' OR emergency_resource.descript LIKE '%${keyword}%'`);
  }
  if (primFunc) {
    search.push(`emergency_resource.prim_func_num = ${primFunc}`);
  }
  if (distance) {
    search.push(`emergency_resource.distance < ${distance}`);
  }

  let whereStatement = 'WHERE ';
  switch (search.length) {
    case 1:
      whereStatement += search.pop();
      break;
    case 2:
      whereStatement += search.pop() + ' AND ' + search.pop();
      break;
    case 3:
      whereStatement += search.pop() + ' AND ' + search.pop() + ' AND ' + search.pop();
      break;
    default:
      whereStatement = '';
      break;
  }

  let sqlStatement = `SELECT emergency_resource.id, emergency_resource.res_name, emergency_resource.res_owner, 
  emergency_resource.price, unit.unit_name AS 'unit', emergency_resource.distance
  FROM emergency_resource
  JOIN unit ON emergency_resource.unit_id = unit.id 
  `
  sqlStatement += whereStatement + ` ORDER BY distance`;

  sequelize.query(sqlStatement, {
    type: QueryTypes.SELECT
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}

exports.insert = (req, res) => {
  
  const res_owner = req.body.res_owner;
  const res_name = req.body.res_name;
  const prim_func_num = req.body.prim_func_num;
  const price = req.body.price;
  const unit_id = req.body.unit_id;
  const descript = req.body.descript;
  const distance = req.body.distance;
  const sec_func_num = req.body.sec_func_num;
  const capabilities = req.body.capabilities;

  // console.log(res_owner);
  // let insertStatement = ""
  
  // const resource = new Resources({

  // })
  
  // Resources.create({
  //   {
  //     res_owner: res_owner,
  //     res_name: res_name,
  //     prim_func_num: prim_func_num,
  //     price: price,
  //     unit_id: unit_id,
      
  //   }
  // })

  let insertStatement = ``;
  let valuesStatement = ``;

  insertStatement += `INSERT INTO emergency_resource (res_owner, res_name, prim_func_num, price, unit_id`;
  valuesStatement += `VALUES ('${res_owner}', '${res_name}', ${prim_func_num}, ${price}, ${unit_id}`

  if(descript != "")
  {
    insertStatement += `, descript`;
    valuesStatement += `, '${descript}'`;
  }
  if(distance != null)
  {
    insertStatement += `, distance`
    valuesStatement += `, ${distance}`;
  }
  if(sec_func_num != "")
  {
    insertStatement += `, sec_func_num`;
    valuesStatement += `, ${sec_func_num}`;
  }
  if(capabilities != "")
  {
    insertStatement += `, capabilities`
    valuesStatement += `, '${capabilities}'`;
  }
  insertStatement += `)`;
  valuesStatement += `)`;

  let sqlStatement = insertStatement + valuesStatement;
  console.log(sqlStatement);

  sequelize.query(sqlStatement, {
    type: QueryTypes.INSERT
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        message:
          err.message || "Some error inserting resources."
      });
    });
}


exports.findByOwner = (req, res) => {
  const curr_user = req.params.curr_user;
  const sqlStatement = 
    `SELECT prim_func_num, COUNT(*) AS 'count'
    FROM emergency_resource
    WHERE res_owner = '${curr_user}'
    GROUP BY prim_func_num` 
  sequelize.query(sqlStatement, {
    type: QueryTypes.SELECT
  })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving tutorials."
    });
  });
}

exports.findByID = (req, res) => {
  console.log("166 hiiiiii");
  // const id = req.query.id;

  Resources.findAll({
    where: {id: id}
  })
    .then(data => {
      if (data) {
        console.log(data);
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find resource with id=${name}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving resource with id=" + name
      });
    });
};