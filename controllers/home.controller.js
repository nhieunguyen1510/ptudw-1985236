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
      categoryModel.findAll({
        raw: true,
        limit: 50,
      }),
      productModel.findAll({
        include: [categoryModel],
        order: [
          ['overallReview', 'DESC'],
        ],
        limit: 6,
        attributes: ['id', 'name', 'imagepath', 'price']
      }),
    ])
    .then(([categories, trendingProducts]) => {
      const trendingProductsVM = trendingProducts.map(trendingProduct => ({
        ...trendingProduct.dataValues,
        Category: trendingProduct.Category
      }))
      return res.render('index', {
        title: 'Home page',
        categories,
        trendingProducts: trendingProductsVM,
      });
    })
    .catch(error => {
      res.statusCode(500);
      res.render('404');
    });
})

module.exports = router;
