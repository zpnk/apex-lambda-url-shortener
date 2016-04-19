var Knex = require('knex');

exports.handle = function(event, context, callback) {
  var knex = Knex({client: 'pg', connection: process.env.PG_URL});

  knex
    .select('*')
    .from('urls')
    .where({key: event.key})
    .catch(function(error) {
      knex.destroy();
      return callback(error);
    })
    .then(function(urls) {
      knex.destroy();
      callback(null, urls[0]);
    });
};
