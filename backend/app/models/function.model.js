module.exports = (sequelize, Sequelize) => {
    const Function = sequelize.define("function", {
      func_num: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      func_name: {
        type: Sequelize.STRING
      }      
    },
    {tableName: 'func',
    timestamps: false
  });

    return Function;
  };
