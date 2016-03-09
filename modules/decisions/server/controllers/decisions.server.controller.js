'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Decision = mongoose.model('Decision'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  java = require('java'),
  _ = require('lodash');

java.classpath.push('./java/DataType/bin/');
java.classpath.push('./java/DataType/json-20140107.jar');

var jsonInterface = java.import('MCDM.JSONRunner');

/**
 * Create a Decision
 */
exports.create = function(req, res) {
  var decision = new Decision(req.body);
  decision.user = req.user;

  decision.save(function(err) {

    var matrix = req.body;
    //console.log(matrix);
    var str = jsonInterface.runSync(JSON.stringify(matrix));

    var ret = JSON.parse(str);

    res.json(ret);
    //res.json(matrix);

    //  if (err) {
  //    return res.status(400).send({
  //      message: errorHandler.getErrorMessage(err)
  //    });
  //  } else {
  //    res.jsonp(decision);
  //  }
  });
};

/**
 * Show the current Decision
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var decision = req.decision ? req.decision.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  decision.isCurrentUserOwner = req.user && decision.user && decision.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(decision);
};

/**
 * Update a Decision
 */
exports.update = function(req, res) {
  var decision = req.decision ;

  decision = _.extend(decision , req.body);

  decision.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(decision);
    }
  });
};

/**
 * Delete an Decision
 */
exports.delete = function(req, res) {
  var decision = req.decision ;

  decision.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(decision);
    }
  });
};

/**
 * List of Decisions
 */
exports.list = function(req, res) {
  Decision.find().sort('-created').populate('user', 'displayName').exec(function(err, decisions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(decisions);
    }
  });
};

/**
 * Decision middleware
 */
exports.decisionByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Decision is invalid'
    });
  }

  Decision.findById(id).populate('user', 'displayName').exec(function (err, decision) {
    if (err) {
      return next(err);
    } else if (!decision) {
      return res.status(404).send({
        message: 'No Decision with that identifier has been found'
      });
    }
    req.decision = decision;
    next();
  });
};
