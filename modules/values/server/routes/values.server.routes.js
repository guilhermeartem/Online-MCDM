'use strict';

/**
 * Module dependencies
 */
var valuesPolicy = require('../policies/values.server.policy'),
  values = require('../controllers/values.server.controller');

module.exports = function(app) {
  // Values Routes
  app.route('/api/values').all(valuesPolicy.isAllowed)
    .get(values.list)
    .post(values.create);

  app.route('/api/values/:valueId').all(valuesPolicy.isAllowed)
    .get(values.read)
    .put(values.update)
    .delete(values.delete);

  // Finish by binding the Value middleware
  app.param('valueId', values.valueByID);
};
