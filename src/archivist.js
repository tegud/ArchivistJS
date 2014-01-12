var fs = require('fs');
var http = require('http');
var _ = require('lodash');
var ColumnMapper = require('./ColumnMapper.js');

var TvRagSeriesInfoParser = function() {
    var parsers = {
        tvrage: 'int',
        numberofepisodes: ['extractNumber', 'int'],
        runtime: ['éxtractNumber', 'int']
    };

    var columnMapper = new ColumnMapper(parsers);

    return {
        parseCsv: function(data) {
            var lines = data.split('\r\n');
            var numberOfLines = lines.length;
            var x = 0;
            var attributes = [];
            var headers = lines[x].split(',');
            var numberOfHeaders = headers.length;
            var columns;
            var shows = [];

            for (columns = 0; columns < numberOfHeaders; columns++) {
                attributes.push(headers[columns].replace(/[ ]/g, ''));
            }

            for (x = 1; x < numberOfLines;x++) {
                var show = {};
                var showValues = lines[x].split(',');
                var correctedValue;

                if (showValues.length < 2) {
                    continue;
                }

                for (columns = 0; columns < numberOfHeaders; columns++) {
                    correctedValue = showValues[columns];

                    if (correctedValue[0] === '"') {
                        correctedValue = correctedValue.substring(1);
                    }

                    if (correctedValue[correctedValue.length - 1] === '"') {
                        correctedValue = correctedValue.substring(0, correctedValue.length - 1);
                    }

                    show[attributes[columns]] = columnMapper.map(attributes[columns], correctedValue);
                }

                shows.push(show);
            }

            return shows;
        }
    };
};

archivistFactory = function() {
	return {
		run: function(args) {
			var configFile = args || 'config.json';
			var affectedFiles = [];
			var data = [];
            var showsOfInterest = ['Zorro and Son'];

			console.log('Loading episode information');

			var options = {
                hostname: 'epguides.com',
                port: 80,
                path: '/common/allshows.txt',
                method: 'GET'
			};

			var req = http.request(options, function(res) {
                res.on('data', function (chunk) {
                    data.push(chunk);
                });

                res.on('end', function() {
                    var allData = data.join('');

                    var parser = new TvRagSeriesInfoParser();

                    var shows = parser.parseCsv(allData);

                    var filteredShows = _.filter(shows, function(item) {
                        return  _(showsOfInterest).contains(item.title);
                    });
                });
			});

			req.on('error', function(e) {
                console.log('request failed: ' + e.message);
			});

			req.end();
		}
	};
};

module.exports = new archivistFactory().run();
