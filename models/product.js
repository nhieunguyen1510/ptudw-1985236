'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, { foreignKey: 'categoryId' });
      Product.belongsTo(models.Brand, { foreignKey: 'brandId' });
      Product.hasMany(models.ProductColor, { foreignKey: 'productId' });
      Product.hasMany(models.ProductSpecification, { foreignKey: 'productId' });
      Product.hasMany(models.Comment, { foreignKey: 'productId' });
      Product.hasMany(models.Review, { foreignKey: 'productId' });
    }
  };
  Product.init({
    name: DataTypes.STRING,
    imagepath: DataTypes.TEXT,
    price: DataTypes.DECIMAL,
    thumbnailPath: DataTypes.TEXT,
    availability: DataTypes.BOOLEAN,
    summary: DataTypes.TEXT,
    description: DataTypes.TEXT,
    reviewCount: DataTypes.INTEGER,
    overallReview: DataTypes.DOUBLE,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};