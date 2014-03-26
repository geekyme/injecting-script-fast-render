Text = new Meteor.Collection('text');

if (Meteor.isClient) {

  Router.configure({
    layoutTemplate: 'layout',
    waitOn: function(){
      return [
        Meteor.subscribe('texts')
      ]
    }
  });

  Router.map(function(){
    this.route('/', {
      template: 'hello'
    })
  });

  Template.hello.greeting = function () {
    return "Welcome to shawn.";
  };

  Template.hello.helpers({
    list: function () {
      return Text.find();
    }
  });

  Template.hello.events({
    'submit form': function (e, tmpl) {
      e.preventDefault();
      // template data, if any, is available in 'this'
      var text = $(tmpl.find('input[type="text"]')).val();

      console.log(text)

      Text.insert({text: text});
    }
  });
}

if (Meteor.isServer) {

  FastRender.route('/', function(){
    this.subscribe('texts');
  });

  Meteor.publish('texts', function(){
    return Text.find();
  })
}
