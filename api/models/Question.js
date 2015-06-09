/**
* Question.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      title: {
        'type': 'string',
        'required': true
      },
      order_num: {
        'type': 'integer', 
        'required': true 
      },
      dependencies : {
        'type': 'json', /* { obj_id: "value" } */
        'required': false
      },
      type : {
        'type': 'string',
        'required': true,
        'enum': ['string','text','integer','float','date','time','datetime','boolean','binary','array','json'],
        'defaultsTo': 'string'
      },
      choices:{
        'type': 'array',
        'required': false
      },
      enable:{
        'type': 'boolean',
        'defaultsTo': true
      }

  }
};

