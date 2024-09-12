module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category", {
      id: {
        primaryKey: true,
        type: Sequelize.STRING
      },
      cat_type: {
        type: Sequelize.STRING
      }
    },{
        tableName: 'category',
        timestamps: false
    });
    
    return Category;
};

   