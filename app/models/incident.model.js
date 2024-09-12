module.exports = (sequelize, Sequelize) => {
    const Incident = sequelize.define("incident", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descript: {
        type: Sequelize.STRING
      },
      inc_date: {
        type: Sequelize.DATE
      },
      inc_owner: {
        type: Sequelize.STRING
      },
      cat_id: {
        type: Sequelize.STRING
      },
      },{
      tableName: 'incident',
      timestamps: false
      });
      
    return Incident;
};