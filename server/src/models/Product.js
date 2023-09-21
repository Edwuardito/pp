const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Product",{
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },      
        details: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        image: {
          type: DataTypes.ARRAY(DataTypes.STRING),
          allowNull: false,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        sold: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        dimensions: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        offer: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue:false
        },
        status: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue:1
        }
      }
    );
};