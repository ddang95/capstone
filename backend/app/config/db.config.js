module.exports = {
    HOST: "localhost",
    USER: "pccUser",
    PASSWORD: "pccUser",
    DB: "cis197_summer_2022",
    dialect: "mysql",
    define: {
      timestamps: false
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };