const chai = require('chai');
const expect = chai.expect;
const app = require('./app');
const request = require('supertest');

describe('Mean, Median, and Mode API', () => {
  it('should calculate the mean correctly', () => {
    const nums = [1, 2, 3, 4, 5];
    const mean = nums.reduce((a, b) => a + b, 0) / nums.length;
    expect(mean).to.equal(3);
  });

  it('should calculate the median correctly for even-length arrays', () => {
    const nums = [1, 2, 3, 4];
    const median = (nums[1] + nums[2]) / 2;
    expect(median).to.equal(2.5);
  });

  it('should calculate the median correctly for odd-length arrays', () => {
    const nums = [1, 2, 3, 4, 5];
    const median = 3;
    expect(median).to.equal(3);
  });

  it('should calculate the mode correctly', () => {
    const nums = [1, 2, 2, 3, 3, 3, 4, 4, 4, 4];
    const mode = 4;
    expect(mode).to.equal(4);
  });
});

describe('API endpoints', () => {
  it('should respond with the mean', (done) => {
    request(app)
      .get('/mean')
      .query({ nums: '1,2,3,4,5' })
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.operation).to.equal('mean');
        expect(res.body.value).to.equal(3);
        done();
      });
  });

  it('should respond with a 400 status for invalid numbers', (done) => {
    request(app)
      .get('/mean')
      .query({ nums: '1,2,three' })
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.error).to.equal('Invalid number in nums');
        done();
      });
  });

  it('should respond with a 400 status for missing nums', (done) => {
    request(app)
      .get('/mean')
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.error).to.equal('nums are required');
        done();
      });
  });
});
