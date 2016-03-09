'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Value = mongoose.model('Value'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Value
 */
exports.create = function(req, res) {
  var value = new Value(req.body);
  value.user = req.user;

  value.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(value);
    }
  });
};

/**
 * Show the current Value
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var value = req.value ? req.value.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  value.isCurrentUserOwner = req.user && value.user && value.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(value);
};

/**
 * Update a Value
 */
exports.update = function(req, res) {
  var value = req.value ;

  value = _.extend(value , req.body);

  value.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(value);
    }
  });
};

/**
 * Delete an Value
 */
exports.delete = function(req, res) {
  var value = req.value ;

  value.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(value);
    }
  });
};

/**
 * List of Values
 */
exports.list = function(req, res) { 
  Value.find().sort('-created').populate('user', 'displayName').exec(function(err, values) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(values);
    }
  });
};

/**
 * Value middleware
 */
exports.valueByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Value is invalid'
    });
  }

  Value.findById(id).populate('user', 'displayName').exec(function (err, value) {
    if (err) {
      return next(err);
    } else if (!value) {
      return res.status(404).send({
        message: 'No Value with that identifier has been found'
      });
    }
    req.value = value;
    next();
  });
};
