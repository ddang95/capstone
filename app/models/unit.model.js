module.exports = (sequelize, Sequelize) => {
    const Unit = sequelize.define("unit", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      unit_name: {
        type: Sequelize.STRING
      }
    },{
      tableName: 'unit',
      timestamps: false
    });
    return Unit;
  };