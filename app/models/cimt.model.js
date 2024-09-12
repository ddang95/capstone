module.exports = (sequelize, Sequelize) => {
    const Cimt = sequelize.define("cimt", {
      username: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      phone_num: {
        type: Sequelize.STRING
      }      
    },
    {tableName: 'cimt',
    timestamps: false
  });

    return Cimt;
  };
