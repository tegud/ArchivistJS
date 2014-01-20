var expect = require('expect.js');
var TvRageSeriesInfoParser = require('../../../src/TvRage/TvRageSeriesInfoParser.js');

describe('new TvRageSeriesInfoParser', function() {
    it('parses tvrage identifier  to an int', function(done) {
        var showData = 'title,directory,tvrage,start date,end date,number of episodes,run time,network,country\r\n"House, M.D.",House,3908,Nov 2004,May 2012,"176 eps","60 min","Fox",US';

        var infoParser = new TvRageSeriesInfoParser();

        infoParser.parseCsv(showData).then(function(data) {
            expect(data[0].tvrage).to.be(3908);
            done();
        });
    });

    it('parses number of episodes to an int', function(done) {
        var showData = 'title,directory,tvrage,start date,end date,number of episodes,run time,network,country\r\n"House, M.D.",House,3908,Nov 2004,May 2012,"176 eps","60 min","Fox",US';

        var infoParser = new TvRageSeriesInfoParser();

        infoParser.parseCsv(showData).then(function(data) {
            expect(data[0]['number of episodes']).to.be(176);
            done();
        });
    });

    it('parses run time to an int', function(done) {
        var showData = 'title,directory,tvrage,start date,end date,number of episodes,run time,network,country\r\n"House, M.D.",House,3908,Nov 2004,May 2012,"176 eps","60 min","Fox",US';

        var infoParser = new TvRageSeriesInfoParser();

        infoParser.parseCsv(showData).then(function(data) {
            expect(data[0]['run time']).to.be(60);
            done();
        });
    });
});
