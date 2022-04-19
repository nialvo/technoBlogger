//login to db
require('dotenv').config();
const Sequelize = require('sequelize');



let sequelize;

if (process.env.JAWSDB_URL) {//for deployed version
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {//for running locally 
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    },
  );
}

module.exports = sequelize;