module.exports = (sequelize, Sequelize) => {
    const Resource = sequelize.define("resource", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        res_owner: {
            type: Sequelize.STRING
        },
        res_name: {
            type: Sequelize.STRING
        },
        prim_func_num: {
            type: Sequelize.INTEGER
        },
        price: {
            type: Sequelize.DECIMAL
        },
        unit_id: {
            type: Sequelize.INTEGER
        },
        descript: {
            type: Sequelize.STRING
        },
        distance: {
            type: Sequelize.DECIMAL
        },
        sec_func_num: {
            type: Sequelize.INTEGER
        },
        capabilities: {
            type: Sequelize.STRING
        }
    },{
        tableName: 'emergency_resource',
        timestamps: false
    });
  
    return Resource;
  };
  