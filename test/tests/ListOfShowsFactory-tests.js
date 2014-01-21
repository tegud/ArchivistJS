var expect = require('expect.js');
var Promise = require('bluebird');
var proxyquire = require('proxyquire');

var showData = 'title,directory,tvrage,start date,end date,number of episodes,run time,network,country\r\n"House, M.D.",House,3908,Nov 2004,May 2012,"176 eps","60 min","Fox",US\r\n"Homeland",Homeland,27811,Oct 2011,___ ____,"24+ eps","60 min","Showtime",US';
var ListOfShowsFactory = proxyquire('../../src/ListOfShowsFactory.js', {
    './TvRage/TvRageRequest.js': function(options) {
        return {
            getSeries: function() {
                return new Promise( function(resolve, reject) {
                    resolve(showData);
                });
            }
        };
    }
});

describe('new ListOfShowsFactory', function() {
    describe('calling build returns ListOfShows', function() {
        describe('can find tv series by name', function() {
            it('returns undefined for unknown tv series', function(done) {
                var listOfShowsFactory = new ListOfShowsFactory({ });

                listOfShowsFactory.build().then(function(listOfShows) {
                    done();
                    expect(listOfShows.getShow('I don\'t know you')).to.be(undefined);
                });
            });

            it('sets title', function(done) {
                var listOfShowsFactory = new ListOfShowsFactory({ });

                listOfShowsFactory.build().then(function(listOfShows) {
                    done();
                    expect(listOfShows.getShow('House, M.D.').title).to.be('House, M.D.');
                });
            });
        });
    });
});
