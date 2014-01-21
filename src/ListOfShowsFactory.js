var _ = require('lodash');
var Promise = require('bluebird');
var ListOfShows = require('./listofshows.js');
var TvRageRequest = require('./TvRage/TvRageRequest.js');
var TvRageSeriesInfoParser = require('./TvRage/TvRageSeriesInfoParser.js');

var ShowFilter = function() {
    return {
        filter: function(shows) {
            return new Promise(function(resolve) {
                resolve(shows);
            });
        }
    };
};

ListOfShowsFactory = function(options) {
    var showsWeCareAbout = new ShowFilter();
    var parser = new TvRageSeriesInfoParser();
    var request = new TvRageRequest(options);

    return {
        build: function() {
            return new Promise(function(resolve) {
                request.getSeries().then(parser.parseCsv).then(showsWeCareAbout.filter).then(function(data) {
                    resolve(new ListOfShows(data));
                });
            });
        }
    };
};

module.exports = ListOfShowsFactory;
