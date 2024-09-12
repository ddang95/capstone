module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      username: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      pass: {
        type: Sequelize.STRING
      },
      display_name: {
        type: Sequelize.STRING
      },
      user_role: { 
          type: Sequelize.STRING
      }
    }
    ,
    {tableName: 'user',
    timestamps: false}
    );
    return User;
  };