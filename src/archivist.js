var _ = require('lodash');
var TvRageRequest = require('./TvRage/TvRageRequest.js');
var parser = new require('./TvRage/TvRageSeriesInfoParser.js')();

archivistFactory = function() {
	return {
		run: function() {
            var showsOfInterest = ['American Dad!', 'Community', 'Family Guy', 'Grey\'s Anatomy', 'Hart of Dixie', 'Helix', 'Homeland'];

            new TvRageRequest({
                success: function(data) {
                    parser.parseCsv(data, function(shows) {
                        var filteredShows = _.filter(shows, function(item) {
                            return  _(showsOfInterest).contains(item.title);
                        });

                        if (showsOfInterest.length !== filteredShows.length) {
                            var unknownShows = [];
                            var knownShows = _.pluck(filteredShows, 'title');

                            _.each(showsOfInterest, function(show) {
                                if (!_.contains(knownShows, show)) {
                                    unknownShows.push(show);
                                }
                            });
                        }

                        console.log(filteredShows);
                    });
                }
            });
        },
        error: function(e) {
            console.log('request failed: ' + e.message);
        }
	};
};

module.exports = new archivistFactory().run();
