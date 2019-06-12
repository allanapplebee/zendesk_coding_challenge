const chai = require('chai');
const chaiHTTP = require('chai-http');
const expect = chai.expect;
const should = chai.should();
const app = require('../index');
const helpers = require('../helperFunctions/APICall');
const getTicket = helpers.getTicket;

chai.use(chaiHTTP);

describe('testing routes return correct response codes', () => {
    it('get / should return OK status and include URL', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.include(process.env.URL);
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

describe('testing API call', () => {
    it('returns at least some data', (done) => {
        getTicket(process.env.URL)
            .then(res => {
                expect(typeof res).to.equal('object');
                done();
            });
    });
    it('returns a list of tickets', (done) => {
        getTicket(process.env.URL)
            .then(res => {
                expect(res.tickets).length.to.be.above(1)
                done();
            });
    });
    it('returns a single ticket', (done) => {
        let id = 1;
        let url = `https://allanapplebee.zendesk.com/api/v2/tickets/${id}.json`;
        getTicket(url)
            .then(res => {
                expect(typeof res).to.equal('object');
                expect(res.ticket.id).to.equal(1);
                expect(res.ticket.subject).to.equal('Sample ticket: Meet the ticket');
                done();
            });
    });
});