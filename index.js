const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const viewConstants  = require('./constants/view.constants');
const categoryController = require('./controllers/category.controller');
const homeController = require('./controllers/home.controller');
const models = require('./models');

const app = express();
const port = process.env.PORT || 3000;
const listPages = [
  'blog',
  'cart',
  'category',
  'checkout',
  'confirmation',
  'contact',
  'login',
  'register',
  'single-blog',
  'single-product',
  'tracking-order'
]

app.use(express.static(path.resolve(__dirname, 'public')));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.get('/', homeController);

app.get('/sync', (req, res) => {
  models.sequelize.sync()
    .then(() => {
      res.send('Sync complete!!!');
    })
})

app.get('/:page', (req, res, next) => {
  const page = req.params.page;
  if (listPages.includes(page)) {
    const banner = viewConstants.pageBannerMap[page];
    res.locals.useBanner = true;
    res.locals.banner = banner;
    return next();
  }
  res.status(404);
  return res.render('404');
});

app.use('/category', categoryController);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
