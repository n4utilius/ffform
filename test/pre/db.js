var Waterline = require('../../node_modules/sails/node_modules/waterline/lib/waterline.js')
  , question_model = require('../../api/models/Question.js')
  , orm = new Waterline();

//Para hacer los test, se debe de cambiar la BD del proyecto a a19_reports_test

var config = {
  adapters: { 'default': 'mongo', mongo: require('sails-mongo') },
  connections: {
    'default': {
      adapter: 'mongo',
      url: 'mongodb://localhost:27017/a19_reports'
    }
  }
};

var Question = Waterline.Collection.extend({
  identity: 'question',
  connection: 'default',
  attributes: question_model.attributes
});

orm.loadCollection(Question);

orm.initialize(config, function(err, data) {
  if (err) throw err;
  if(data.collections){
    var models = data.collections
      , connections = models.connections;

    models.question.destroy();/*
    models.question.create({
      label: "Nombre",
      order_num: 1,
      type: 'string',
      enable: true
    })
    /**/
    models.question.find().exec(function(err, data) {
      if(err) return console.log({ err: err }, 500);
      if(data){
        return console.log(data);
      }
    });
    /**/
  }
});

//module.exports = orm
 
