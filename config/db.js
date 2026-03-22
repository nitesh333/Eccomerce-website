const { Sequelize } = require('sequelize');
const path = require('path');

// For local development, we use SQLite. 
// When deploying to HosterPK, you will uncomment the MySQL section below.
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database.sqlite'), // Stores data in backend/database.sqlite
  logging: false, // Disable logging of all SQL queries to console
});

/* 
// MySQL Configuration for HosterPK Production
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST || 'localhost',
  dialect: 'mysql',
  logging: false,
});
*/

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully (SQLite).');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
