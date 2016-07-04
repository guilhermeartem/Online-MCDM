'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Value Schema
 */
var ValueSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Value name',
    trim: true
  },
  abbreviation: {
    type: String,
    default: '',
    required: 'Please fill abbreviation name',
    trim: true
  },
  type: {
    type: String,
    default: '',
    enum: ['crisp', 'interval', 'fuzzy', 'z-number'],
    required: 'Please select value type'
  },
  value: {
    type: [Number]
    //required: 'Please insert the value'
  },
  minValue:{
    type: Number,
    required: 'Enter minimum value'
  },
  maxValue:{
    type: Number,
    required: 'Enter maximum value'
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Value', ValueSchema);
