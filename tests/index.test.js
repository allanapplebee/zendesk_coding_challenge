const chai = require('chai');
const chaiHTTP = require('chai-http');
const should = chai.should();
const app = require('../index');

chai.use(chaiHTTP);

describe('Unit testing routes return correct response codes', () => {
    it('get / should return OK status and include URL', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.include(process.env.URL);
                done();
            });
    });
    it('post /listall should return OK status', (done) => {
        chai.request(app)
            .post('/listall')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('post /showticket should return ok status', (done) => {
        chai.request(app)
            .post('/showticket')
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
    });
    it('should return 404 on unknown route', (done) => {
        chai.request(app)
            .get('/whatever')
            .end((err, res) => {
                res.should.have.status(404);
                done();
            });
    });
});