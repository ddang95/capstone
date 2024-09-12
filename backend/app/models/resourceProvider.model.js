module.exports = (sequelize, Sequelize) => {
    const Rp = sequelize.define("rp", {
      username: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      strt_addr: {
        type: Sequelize.STRING
      }      
    },
    {tableName: 'resource_provider',
    timestamps: false
  });

    return Rp;
  };
