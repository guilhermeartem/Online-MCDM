'use strict';

/**
 * Module dependencies
 */
var decisionsPolicy = require('../policies/decisions.server.policy'),
  decisions = require('../controllers/decisions.server.controller');

module.exports = function(app) {
  // Decisions Routes
  app.route('/api/decisions').all(decisionsPolicy.isAllowed)
    .get(decisions.list)
    .post(decisions.create);

  app.route('/api/decisions/:decisionId').all(decisionsPolicy.isAllowed)
    .get(decisions.read)
    .put(decisions.update)
    .delete(decisions.delete);

  // Finish by binding the Decision middleware
  app.param('decisionId', decisions.decisionByID);
};
