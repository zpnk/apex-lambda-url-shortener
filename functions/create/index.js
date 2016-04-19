var Knex = require('knex');
var shortid = require('shortid');

exports.handle = function(event, context, callback) {
  var knex = Knex({client: 'pg', connection: process.env.PG_URL});

  var url = {
    key: shortid.generate(),
    destination: event.url
  };

  knex
    .insert(url)
    .into('urls')
    .catch(function(error) {
      knex.destroy();
      return callback(error);
    })
    .then(function() {
      knex.destroy();
      callback(null, url);
    });
};
