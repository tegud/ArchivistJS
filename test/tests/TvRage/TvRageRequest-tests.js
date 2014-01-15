var expect = require('expect.js');
var TvRageRequest = require('../../../src/TvRage/TvRageRequest.js');
var FakeTvRageServer = require('../../lib/FakeTvRageServer.js');

describe('new TvRageRequest', function() {
    var httpPort = 3124;
    var allShowData;
    var tvRageHttpServer = new FakeTvRageServer({
        port: httpPort,
        data: {
            '/common/allshows.txt': function () {
                return allShowData;
            }
        }
    });

    before(function(done) {
        tvRageHttpServer.start(done);
    });

    after(function() {
        tvRageHttpServer.stop();
    });

    it('calls success callback with data', function(done) {
        allShowData = 'title,directory,tvrage,start date,end date,number of episodes,run time,network,country\r\n"House, M.D.",House,3908,Nov 2004,May 2012,"176 eps","60 min","Fox",US';

        new TvRageRequest({
            hostname: 'localhost',
            port: httpPort,
            success: function(data) {
                done();
                expect(data).to.be(allShowData);
            }
        });
    });
});
