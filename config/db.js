const { Sequelize } = require('sequelize');
const path = require('path');

// For local development, we use SQLite. 
// When deploying to HosterPK, you will uncomment the MySQL section below.
const sequelize = new Sequelize({
  dialect: 'sqlite',
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME || 'akiyans_rakiyansh_db',
    process.env.DB_USER || 'rakiyans_nitesh33',
    process.env.DB_PASS || 'nitesh2026@',
    {
        host: process.env.DB_HOST || 'localhost',
        dialect: 'mysql',
        logging: false, // Set to true to see SQL queries in the console
    }
);

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Successfully connected to the MySQL production database.');
    } catch (error) {
        console.error('Unable to connect to the MySQL database:', error);
    }
};

module.exports = { sequelize, connectDB };
