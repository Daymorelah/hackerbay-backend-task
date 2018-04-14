/* eslint-disable import/no-extraneous-dependencies, no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
const { expect } = chai;
// const myToken = '';

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
  });
});
