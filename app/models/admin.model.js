module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
      username: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING
      }      
    },
    {tableName: 'admin_user',
    timestamps: false
  });

    return Admin;
  };
