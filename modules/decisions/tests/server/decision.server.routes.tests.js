'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Decision = mongoose.model('Decision'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app, agent, credentials, user, decision;

/**
 * Decision routes tests
 */
describe('Decision CRUD tests', function () {

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

    // Save a user to the test db and create new Decision
    user.save(function () {
      decision = {
        name: 'Decision name'
      };

      done();
    });
  });

  it('should be able to save a Decision if logged in', function (done) {
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

        // Save a new Decision
        agent.post('/api/decisions')
          .send(decision)
          .expect(200)
          .end(function (decisionSaveErr, decisionSaveRes) {
            // Handle Decision save error
            if (decisionSaveErr) {
              return done(decisionSaveErr);
            }

            // Get a list of Decisions
            agent.get('/api/decisions')
              .end(function (decisionsGetErr, decisionsGetRes) {
                // Handle Decision save error
                if (decisionsGetErr) {
                  return done(decisionsGetErr);
                }

                // Get Decisions list
                var decisions = decisionsGetRes.body;

                // Set assertions
                (decisions[0].user._id).should.equal(userId);
                (decisions[0].name).should.match('Decision name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Decision if not logged in', function (done) {
    agent.post('/api/decisions')
      .send(decision)
      .expect(403)
      .end(function (decisionSaveErr, decisionSaveRes) {
        // Call the assertion callback
        done(decisionSaveErr);
      });
  });

  it('should not be able to save an Decision if no name is provided', function (done) {
    // Invalidate name field
    decision.name = '';

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

        // Save a new Decision
        agent.post('/api/decisions')
          .send(decision)
          .expect(400)
          .end(function (decisionSaveErr, decisionSaveRes) {
            // Set message assertion
            (decisionSaveRes.body.message).should.match('Please fill Decision name');

            // Handle Decision save error
            done(decisionSaveErr);
          });
      });
  });

  it('should be able to update an Decision if signed in', function (done) {
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

        // Save a new Decision
        agent.post('/api/decisions')
          .send(decision)
          .expect(200)
          .end(function (decisionSaveErr, decisionSaveRes) {
            // Handle Decision save error
            if (decisionSaveErr) {
              return done(decisionSaveErr);
            }

            // Update Decision name
            decision.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Decision
            agent.put('/api/decisions/' + decisionSaveRes.body._id)
              .send(decision)
              .expect(200)
              .end(function (decisionUpdateErr, decisionUpdateRes) {
                // Handle Decision update error
                if (decisionUpdateErr) {
                  return done(decisionUpdateErr);
                }

                // Set assertions
                (decisionUpdateRes.body._id).should.equal(decisionSaveRes.body._id);
                (decisionUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Decisions if not signed in', function (done) {
    // Create new Decision model instance
    var decisionObj = new Decision(decision);

    // Save the decision
    decisionObj.save(function () {
      // Request Decisions
      request(app).get('/api/decisions')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Decision if not signed in', function (done) {
    // Create new Decision model instance
    var decisionObj = new Decision(decision);

    // Save the Decision
    decisionObj.save(function () {
      request(app).get('/api/decisions/' + decisionObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', decision.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Decision with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/decisions/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Decision is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Decision which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Decision
    request(app).get('/api/decisions/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Decision with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Decision if signed in', function (done) {
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

        // Save a new Decision
        agent.post('/api/decisions')
          .send(decision)
          .expect(200)
          .end(function (decisionSaveErr, decisionSaveRes) {
            // Handle Decision save error
            if (decisionSaveErr) {
              return done(decisionSaveErr);
            }

            // Delete an existing Decision
            agent.delete('/api/decisions/' + decisionSaveRes.body._id)
              .send(decision)
              .expect(200)
              .end(function (decisionDeleteErr, decisionDeleteRes) {
                // Handle decision error error
                if (decisionDeleteErr) {
                  return done(decisionDeleteErr);
                }

                // Set assertions
                (decisionDeleteRes.body._id).should.equal(decisionSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Decision if not signed in', function (done) {
    // Set Decision user
    decision.user = user;

    // Create new Decision model instance
    var decisionObj = new Decision(decision);

    // Save the Decision
    decisionObj.save(function () {
      // Try deleting Decision
      request(app).delete('/api/decisions/' + decisionObj._id)
        .expect(403)
        .end(function (decisionDeleteErr, decisionDeleteRes) {
          // Set message assertion
          (decisionDeleteRes.body.message).should.match('User is not authorized');

          // Handle Decision error error
          done(decisionDeleteErr);
        });

    });
  });

  it('should be able to get a single Decision that has an orphaned user reference', function (done) {
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

          // Save a new Decision
          agent.post('/api/decisions')
            .send(decision)
            .expect(200)
            .end(function (decisionSaveErr, decisionSaveRes) {
              // Handle Decision save error
              if (decisionSaveErr) {
                return done(decisionSaveErr);
              }

              // Set assertions on new Decision
              (decisionSaveRes.body.name).should.equal(decision.name);
              should.exist(decisionSaveRes.body.user);
              should.equal(decisionSaveRes.body.user._id, orphanId);

              // force the Decision to have an orphaned user reference
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

                    // Get the Decision
                    agent.get('/api/decisions/' + decisionSaveRes.body._id)
                      .expect(200)
                      .end(function (decisionInfoErr, decisionInfoRes) {
                        // Handle Decision error
                        if (decisionInfoErr) {
                          return done(decisionInfoErr);
                        }

                        // Set assertions
                        (decisionInfoRes.body._id).should.equal(decisionSaveRes.body._id);
                        (decisionInfoRes.body.name).should.equal(decision.name);
                        should.equal(decisionInfoRes.body.user, undefined);

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
      Decision.remove().exec(done);
    });
  });
});
