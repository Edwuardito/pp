const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name_user: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:1
          },
        image: {
            type: DataTypes.STRING            
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue:1
          }
    })
};