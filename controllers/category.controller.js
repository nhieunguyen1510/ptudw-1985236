const express = require('express');
const models = require('../models');
const categoryModel = models.Category;
const productColorModel = models.ProductColor;
const productModel = models.Product;
const colorModel = models.Color;
const brandModel = models.Brand;
const router = express.Router();

router.get('/', (req, res) => {
  return Promise.all([
      colorModel.findAll({
        include: [productColorModel],
        limit: 50,
      }),
      brandModel.findAll({
        include: [productModel],
        limit: 50,
      }),
      categoryModel.findAll({
        include: [productModel],
        limit: 50,
      }),
    ])
    .then(([colors, brands, categories]) => {
      const colorsVM = colors.map(color => ({
        ...color.dataValues,
        productColorCount: color.ProductColors.length,
      }));
      const brandsVM = brands.map(brand => ({
        ...brand.dataValues,
        productCount: brand.Products.length,
      }));
      const categoriesVM = categories.map(category => ({
        ...category.dataValues,
        productCount: category.Products.length,
      }));
      return res.render('category', {
        title: 'Category',
        colors: colorsVM,
        brands: brandsVM,
        categories: categoriesVM,
      });
    })
    .catch(error => {
      req.statusCode(500);
      req.render('404');
    });
})

module.exports = router;
