var _ = require('lodash');
var ColumnMapper = require('../ColumnMapper.js');

var TvRageSeriesInfoParser = function() {
    var parsers = {
        tvrage: 'int',
        numberofepisodes: ['extractNumber', 'int'],
        runtime: ['extractNumber', 'int']
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

module.exports = TvRageSeriesInfoParser;
