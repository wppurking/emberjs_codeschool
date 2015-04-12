// 树的根节点
// Ember have a shorcut 'Em'
var App = Em.Application.create({
  LOG_TRANSITIONS: true
});

// 下面两种写法都可行
//App.ApplicationAdapter = DS.FixtureAdapter;
App.ApplicationAdapter = DS.FixtureAdapter.extend();

// 树的枝干, 用于寻找到叶子节点(template)
App.Router.map(function() {
  // http://example.com#/about
  // File Path: none
  // Ember Path: /about
  // Router: about
  //this.route('about');

  // http://example.com#/aboutus
  // File Path: none
  // Ember Path: /aboutus
  // Router: see below
  this.route('about', {path: '/aboutus'});

  // have a index template default route

  // use route for 3 kinds of words
  // * adjective
  // * adverbs
  // * verbs
  // use resource for nouns
  this.resource('products', function() {
    this.resource('product', {path: '/:product_id'});
    this.route('deals');
  });

  // Ember Router and Ember Route
  // * Router: Translate a path into a route
  // * Route: Provides data for the controller

  // Router -> Route -> Controller -> Template
});

// Nested Route
App.ProductsDealsRoute = Em.Route.extend({
  model: function() {
    var prods = this.modelFor('products').filter(function(prod) {
      return prod.get('price') < 220;
    });
    console.log(prods);
    return prods;
  }
});


// every route has a Default Controller
// index => IndexController
App.IndexController = Ember.Controller.extend({
  productsCount: 6,
  logo: 'http://www.easyacc.com/static/img/ico1_black.png',
  time: function() {
    return (new Date().toDateString());
  }.property()
});


// ProductsIndex
App.ProductsIndexRoute = Em.Route.extend({
  model: function() {
    // 为了让 Controller 处理, 其实也可以在这里处理 Filter.
    return this.store.findAll('product');
  }
});

App.ProductsIndexController = Em.ArrayController.extend({
  deals: function() {
    return this.filter(function(prod) {
      return prod.get('price') < 100;
    })
  }.property('@each.isOnSale')
});


// 如果将内容放在 controller 里面, 仍然可以实现数据的填充呀?
// 难道是为了在 Route 中进行远端数据的获取填充?
/*
App.ProductsController = Ember.Controller.extend({
  model: App.PRODUCTS
});
*/
App.ProductsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('product');
  }
});

App.ProductsController = Ember.ArrayController.extend({
  productsCount: Ember.computed.alias('length')
});



/* 如果仅仅是从 id 查询, 则所有代码可省略
App.ProductRoute = Ember.Route.extend({
  model: function(params) {
    console.log(params);
    return this.store.find('product', params.product_id);
  }
});
*/
App.ProductController = Ember.ObjectController.extend({
  // 测试值自动变化
  // App.Product.store.find('product', 4).then(function(p){ p.set('price', 222))})
  priceColor: function() {
    var price = this.get('price');
    if(price > 230) {
      return 'red';
    } else {
      return 'green';
    }
  }.property('price')
});



// Components
App.ProductsDetailsComponent = Em.Component.extend({
  /*
  reviewsCount: function() {
    return this.get('product.reviews.length');
  }.property('product.reviews.length')
  */
  reviewsCount: Em.computed.alias('product.reviews.length'),
  /*
  hasReviews: function() {
    return this.get('reviewsCount') > 0;
  }.property('reviewsCount')
  */
  hasReviews: Em.computed.gt('product.reviews.length', 0)
});


// Ember Data
// Ember Data has a Store: Central repository for records in your application,
// available in [routes(route)] and [controllers]
App.Product = DS.Model.extend({
  /* 
  // 自己设置所有属性的类型
  title: DS.attr('string'),
  price: DS.attr('number'),
  description: DS.attr('string'),
  isOnSale: DS.attr('boolean'),
  image: DS.attr('string')
  */
  // 当然 JS 弱类型语言, 也可以将这些交给 Ember 来处理
  title: DS.attr(),
  price: DS.attr(),
  description: DS.attr(),
  isOnSale: DS.attr(),
  image: DS.attr(),
  // async: 延迟加载
  reviews: DS.hasMany('review', {async: true})
});

App.Review = DS.Model.extend({
  text: DS.attr('string'),
  reviewedAt: DS.attr('date'),
  product: DS.belongsTo('product')
});


App.Product.FIXTURES = [
  {
    id: 1,
    title: 'Flint',
    price: 99,
    description: 'Flint is ...',
    isOnSale: true,
    image: 'flint.png',
    reviews: [100, 101]
  },
  {
    id: 2,
    title: 'Kindling',
    price: 249,
    description: 'Easily...',
    isOnSale: false,
    image: 'kindling.png'
  },
  {
    id: 3,
    title: 'Wyatt Box',
    price: 98,
    description: 'Easily...',
    isOnSale: false,
    image: 'kindling.png'
  },
  {
    id: 4,
    title: 'Holly Pad',
    price: 321,
    description: 'Easily...',
    isOnSale: false,
    image: 'kindling.png'
  }

]

App.Review.FIXTURES = [
{
  id: 100,
  text: 'first reivew',
  product: 1
},
{
  id: 101,
  text: '#101 Review',
  product: 1
}
]