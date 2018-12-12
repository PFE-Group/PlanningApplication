const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const assert = chai.assert;

chai.use(chaiHttp);

describe('POST /api/login/login', () => {
    it('it should not POST a login with user not found', (done) => {
        chai.request('http://localhost:3030')
        .post('/api/login/login')
        .type('form')
        .send({email:'usernotfound@gmail.com',password:'password'})
        .end((err, res) => {
            res.should.have.status(401);
            res.should.be.json;
            assert.equal(res.body.message, 'user not found', 'res.body.message should be \'user not found\'');
            done();
        });
    });
});

