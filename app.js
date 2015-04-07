// 树的根节点
var App = Ember.Application.create({
  LOG_TRANSITIONS: true
});

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
  this.resource('products');

  // Ember Router and Ember Route
  // * Router: Translate a path into a route
  // * Route: Provides data for the controller

  // Router -> Route -> Controller -> Template

  this.resource('product', {path: '/product/:title'});
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


App.PRODUCTS = [
{
  title: 'Flint',
  price: 99,
  description: 'Flint is ...',
  isOnSale: true,
  image: 'flint.png'
},
{
  title: 'Kindling',
  price: 249,
  description: 'Easily...',
  isOnSale: false,
  image: 'kindling.png'
}
]


// 如果将内容放在 controller 里面, 仍然可以实现数据的填充呀?
// 难道是为了在 Route 中进行远端数据的获取填充?
/*
App.ProductsController = Ember.Controller.extend({
  model: App.PRODUCTS
});
*/
App.ProductsRoute = Ember.Route.extend({
  model: function() {
    return App.PRODUCTS;
  }
});

App.ProductRoute = Ember.Route.extend({
  model: function(params) {
    console.log(params);
    return App.PRODUCTS.findBy('title', params.title);
  }
});