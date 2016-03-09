'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Value = mongoose.model('Value'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, value;

/**
 * Value routes tests
 */
describe('Value CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Value
    user.save(function () {
      value = {
        name: 'Value name'
      };

      done();
    });
  });

  it('should be able to save a Value if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Value
        agent.post('/api/values')
          .send(value)
          .expect(200)
          .end(function (valueSaveErr, valueSaveRes) {
            // Handle Value save error
            if (valueSaveErr) {
              return done(valueSaveErr);
            }

            // Get a list of Values
            agent.get('/api/values')
              .end(function (valuesGetErr, valuesGetRes) {
                // Handle Value save error
                if (valuesGetErr) {
                  return done(valuesGetErr);
                }

                // Get Values list
                var values = valuesGetRes.body;

                // Set assertions
                (values[0].user._id).should.equal(userId);
                (values[0].name).should.match('Value name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Value if not logged in', function (done) {
    agent.post('/api/values')
      .send(value)
      .expect(403)
      .end(function (valueSaveErr, valueSaveRes) {
        // Call the assertion callback
        done(valueSaveErr);
      });
  });

  it('should not be able to save an Value if no name is provided', function (done) {
    // Invalidate name field
    value.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Value
        agent.post('/api/values')
          .send(value)
          .expect(400)
          .end(function (valueSaveErr, valueSaveRes) {
            // Set message assertion
            (valueSaveRes.body.message).should.match('Please fill Value name');

            // Handle Value save error
            done(valueSaveErr);
          });
      });
  });

  it('should be able to update an Value if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Value
        agent.post('/api/values')
          .send(value)
          .expect(200)
          .end(function (valueSaveErr, valueSaveRes) {
            // Handle Value save error
            if (valueSaveErr) {
              return done(valueSaveErr);
            }

            // Update Value name
            value.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Value
            agent.put('/api/values/' + valueSaveRes.body._id)
              .send(value)
              .expect(200)
              .end(function (valueUpdateErr, valueUpdateRes) {
                // Handle Value update error
                if (valueUpdateErr) {
                  return done(valueUpdateErr);
                }

                // Set assertions
                (valueUpdateRes.body._id).should.equal(valueSaveRes.body._id);
                (valueUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Values if not signed in', function (done) {
    // Create new Value model instance
    var valueObj = new Value(value);

    // Save the value
    valueObj.save(function () {
      // Request Values
      request(app).get('/api/values')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Value if not signed in', function (done) {
    // Create new Value model instance
    var valueObj = new Value(value);

    // Save the Value
    valueObj.save(function () {
      request(app).get('/api/values/' + valueObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', value.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Value with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/values/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Value is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Value which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Value
    request(app).get('/api/values/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Value with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Value if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Value
        agent.post('/api/values')
          .send(value)
          .expect(200)
          .end(function (valueSaveErr, valueSaveRes) {
            // Handle Value save error
            if (valueSaveErr) {
              return done(valueSaveErr);
            }

            // Delete an existing Value
            agent.delete('/api/values/' + valueSaveRes.body._id)
              .send(value)
              .expect(200)
              .end(function (valueDeleteErr, valueDeleteRes) {
                // Handle value error error
                if (valueDeleteErr) {
                  return done(valueDeleteErr);
                }

                // Set assertions
                (valueDeleteRes.body._id).should.equal(valueSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Value if not signed in', function (done) {
    // Set Value user
    value.user = user;

    // Create new Value model instance
    var valueObj = new Value(value);

    // Save the Value
    valueObj.save(function () {
      // Try deleting Value
      request(app).delete('/api/values/' + valueObj._id)
        .expect(403)
        .end(function (valueDeleteErr, valueDeleteRes) {
          // Set message assertion
          (valueDeleteRes.body.message).should.match('User is not authorized');

          // Handle Value error error
          done(valueDeleteErr);
        });

    });
  });

  it('should be able to get a single Value that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Value
          agent.post('/api/values')
            .send(value)
            .expect(200)
            .end(function (valueSaveErr, valueSaveRes) {
              // Handle Value save error
              if (valueSaveErr) {
                return done(valueSaveErr);
              }

              // Set assertions on new Value
              (valueSaveRes.body.name).should.equal(value.name);
              should.exist(valueSaveRes.body.user);
              should.equal(valueSaveRes.body.user._id, orphanId);

              // force the Value to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Value
                    agent.get('/api/values/' + valueSaveRes.body._id)
                      .expect(200)
                      .end(function (valueInfoErr, valueInfoRes) {
                        // Handle Value error
                        if (valueInfoErr) {
                          return done(valueInfoErr);
                        }

                        // Set assertions
                        (valueInfoRes.body._id).should.equal(valueSaveRes.body._id);
                        (valueInfoRes.body.name).should.equal(value.name);
                        should.equal(valueInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Value.remove().exec(done);
    });
  });
});
