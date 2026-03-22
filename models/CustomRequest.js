const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');

const CustomRequest = sequelize.define('CustomRequest', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    designUrl: {
        type: DataTypes.STRING,
        allowNull: true // Optional image upload for the custom design
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Reviewed', 'Accepted', 'Rejected'),
        defaultValue: 'Pending'
    }
}, {
    timestamps: true
});

// Relationships
User.hasMany(CustomRequest, { foreignKey: 'userId' });
CustomRequest.belongsTo(User, { foreignKey: 'userId' });

module.exports = CustomRequest;
