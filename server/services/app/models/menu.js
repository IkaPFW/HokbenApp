'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Menu.belongsTo(models.User, { as: 'author', foreignKey: 'authorId' })
      Menu.belongsTo(models.Category, {foreignKey: 'categoryId'})
      Menu.hasOne(models.Ingredient)
    }
  }
  Menu.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Menu name is required'
        },
        notEmpty: {
          msg: 'Menu name is required'
        }
      }
    },
    japaneseName: DataTypes.STRING,
    description: DataTypes.STRING,
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Menu price is required'
        },
        notEmpty: {
          msg: 'Menu price is required'
        }
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Image URL is required'
        },
        notEmpty: {
          msg: 'Image URL is required'
        }
      }
    },
    authorId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    UserMongoId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Menu',
  });
  Menu.beforeCreate((menu) => {
    menu.authorId = 1
    menu.UserMongoId = '63f734d42126f104249d254'
  })
  return Menu;
};