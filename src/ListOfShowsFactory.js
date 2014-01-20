var _ = require('lodash');
var Promise = require('bluebird');
var ListOfShows = require('./listofshows.js');

ListOfShowsFactory = function(request, parser, showsWeCareAbout) {
    return {
        build: function() {
            return new Promise(function(resolve, reject) {
                request.getSeries().then(parser.parseCsv).then(showsWeCareAbout.filter).then(function(data) {
                    resolve(new ListOfShows(data));
                });
            });
        }
    };
};

module.exports = ListOfShowsFactory;
