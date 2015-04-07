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
  this.route('about', {path: '/aboutus'})

  // have a index template default route
});

// every route has a Default Controller
// index => IndexController
App.IndexController = Ember.Controller.extend({
  productsCount: 6,
  logo: '/image/logo.png',
  time: function() {
    return (new Date().toDateString());
  }.property()
});