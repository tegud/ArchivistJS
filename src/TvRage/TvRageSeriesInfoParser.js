var ColumnMapper = require('../ColumnMapper.js');
var csv = require('csv');
var Promise = require("bluebird");

var parsers = {
    tvrage: 'int',
    'number of episodes': ['extractNumber', 'int'],
    'run time': ['extractNumber', 'int']
};

var columnMapper = new ColumnMapper(parsers);

var TvRageSeriesInfoParser = function() {
    return {
        parseCsv: function(data) {
            return new Promise(function(resolve) {
                csv()
                    .from.string(data, { columns: true })
                    .transform(function(row) {
                        for (var column in row) {
                            if (!row.hasOwnProperty(column)) {
                                continue;
                            }

                            row[column] = columnMapper.map(column, row[column]);
                        }

                        return row;
                    })
                    .to.array(function (data){
                        resolve(data);
                    });
            });
        }
    };
};

module.exports = TvRageSeriesInfoParser;
