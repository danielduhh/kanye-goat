var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should();
var app = require('../server');
chai.use(require('chai-things'));
chai.use(chaiHttp);

// Add promise support if this does not exist natively.
if (!global.Promise) {
    var q = require('q');
    chai.request.addPromises(q.Promise);
}

describe('GET /songs', function () {
    it('Should return 113 songs', function(done){
        chai.request(app)
            .get('/api/songs')
            .end(function (err, res) {

                expect(err).to.be.null;
                expect(res).to.have.status(200);

                var features = res.body.features;
                var randomNumber = Math.floor(Math.random() * 112);

                expect(features.length).to.equal(113);
                expect(features).to.have.length(113);
                assert.lengthOf(features, 113, 'features must have 113 elements');
                features.should.have.length(113);
                
                expect(features[randomNumber].properties).to.include.keys("album_title");

                done();
            });
    })
});
