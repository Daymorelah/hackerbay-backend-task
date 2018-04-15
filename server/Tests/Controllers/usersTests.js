/* eslint-disable import/no-extraneous-dependencies, no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';
import * as helper from '../Helper';

chai.use(chaiHttp);
const { expect } = chai;

// helper.clearUSerdb();

describe('Tests for back-end task', () => {
  describe('Integration test for back-end task', () => {
    it('Should welcome the user to the API', (done) => {
      chai.request(app)
        .get('/api/v1/').end((error, res) => {
          expect(res.status).to.deep.equal(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('message', 'Welcome to the backend task');
          done();
        });
    });
    it('should create a user in the database', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send(helper.userDetails)
        .end((error, res) => {
          if (error) {
            throw (error);
          }
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.not.equal(null);
          expect(res.body.message).to.not.equal(null);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('user John Doe has been created');
          done();
        });
    });
    it('should not create a new user if username already exists', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send(helper.existingUsername)
        .end((error, res) => {
          if (error) {
            throw (error);
          }
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Username already exist');
          done();
        });
    });
    it('should not create a user if email address already exist', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send(helper.existingEmail)
        .end((error, res) => {
          if (error) {
            throw (error);
          }
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message');
          done();
        });
    });
    it('should not create a user if email is not valid', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send(helper.invalidEmail)
        .end((error, res) => {
          if (error) {
            throw (error);
          }
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Validation error: Please enter a valid email');
          done();
        });
    });
    it('should not create a user with incomplete user info', (done) => {
      chai.request(app)
        .post('/api/v1/signup')
        .send()
        .end((error, res) => {
          if (error) {
            throw (error);
          }
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Incomplete registration details');
          done();
        });
    });
    it('should not signin a user with incomplete user info', (done) => {
      chai.request(app)
        .post('/api/v1/signin')
        .send()
        .end((error, res) => {
          if (error) {
            throw (error);
          }
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Incomplete login details');
          done();
        });
    });
    it('should not signin a user if username does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/signin')
        .send(helper.unexistingUsername)
        .end((error, res) => {
          if (error) {
            throw (error);
          }
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Username or password does not exist');
          done();
        });
    });
    it('should not signin a user if password does not match ', (done) => {
      chai.request(app)
        .post('/api/v1/signin')
        .send(helper.unmatchingPassword)
        .end((error, res) => {
          if (error) {
            throw (error);
          }
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Username or password does not exist');
          done();
        });
    });
    it('should not signin a user if password is null', (done) => {
      chai.request(app)
        .post('/api/v1/signin')
        .send(helper.signinWithNullPassword)
        .end((error, res) => {
          if (error) {
            throw (error);
          }
          expect(res.status).to.equal(400);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Incomplete login details');
          done();
        });
    });
    it('should signin a user with correct credentials', (done) => {
      chai.request(app)
        .post('/api/v1/signin')
        .send(helper.validSignin)
        .end((error, res) => {
          if (error) {
            throw (error);
          }
          // expect(res.status).to.equal(200);
          console.log('res.body in sigin success is ==> ', res.body);
          expect(res.body).to.have.property('message');
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.not.equal(null);
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).to.equal('Login successfull');
          done();
        });
    });
  });
});
