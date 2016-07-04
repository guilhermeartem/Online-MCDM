'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Decision Schema
 */
var DecisionSchema = new Schema({
  name: {
    type: String,
    default: '',
    trim: true
  },
  methodOptions:[{
    method: {
      type: String,
      enum: ['topsis', 'todim']
    },
    theta: Number
  }],
  nAlt: Number,
  nCrit: Number,
  criteria: [{
    name: String,
    weight: Number,
    benefit: Boolean,
    type: {
      type: String,
      enum: ['crisp', 'interval', 'fuzzy', 'z-number']
    }
  }],
  alternatives: [{
    name: String
  }],
  evaluationOriginal: Schema.Types.Mixed,
  evaluation: [],
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Decision', DecisionSchema);
