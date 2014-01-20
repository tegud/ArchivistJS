var expect = require('expect.js');
var Promise = require("bluebird");
var ListOfShowsFactory = require('../../src/ListOfShowsFactory.js');

describe('new ListOfShowsFactory', function() {
    var showData = [{
        'title': 'House, M.D.',
        'directory': 'House',
        'tvrage': '3908',
        'start date': 'Nov 2004',
        'end date': 'May 2012',
        'number of episodes': 176,
        'run time': 60,
        'network': 'Fox',
        'country': 'US'
    }, {
        'title': 'Eastenders',
        'directory': 'Eastenders',
        'tvrage': '1234',
        'start date': 'Nov 2004',
        'end date': 'May 2012',
        'number of episodes': 9999,
        'run time': 30,
        'network': 'BBC',
        'country': 'UK'
    }];

    function justResolveWith(data) {
        return function() {
            return new Promise(function(resolve) {
                resolve(data);
            });
        };
    }

    describe('calling build returns ListOfShows', function() {
        describe('can find tv series by name', function() {
            it('returns undefined for unknown tv series', function(done) {
                var listOfShowsFactory = new ListOfShowsFactory({ getSeries: justResolveWith() }, { parseCsv: justResolveWith() }, { filter: justResolveWith(showData) });

                listOfShowsFactory.build().then(function(listOfShows) {
                    done();
                    expect(listOfShows.getShow('I dont know you')).to.be(undefined);
                });
            });

            it('sets tvrage id', function(done) {
                var listOfShowsFactory = new ListOfShowsFactory({ getSeries: justResolveWith() }, { parseCsv: justResolveWith(showData) }, { filter: justResolveWith(showData) });

                listOfShowsFactory.build().then(function(listOfShows) {
                    done();
                    expect(listOfShows.getShow(showData[0].title).tvrage).to.be(showData[0].tvrage);
                });
            });
        });
    });
});
