var _ = require('lodash');

var ColumnMapper = function (mappings) {
    var inbuiltParsers = {
        'int': function(value) {
            return parseInt(value, 10);
        },
        'extractNumber': function(value) {
            var numberRegex = /([0-9])+/;
            var regexMatch = value.match(numberRegex);

            if (!regexMatch) {
                return value;
            }

            return regexMatch[0];
        }
    };

    var mapValue = function (column, value) {
        if (mappings[column]) {
            if (Array.isArray(mappings[column])){
                _.each(mappings[column], function(columnMapping) {
                    if (typeof columnMapping === 'string' && inbuiltParsers[columnMapping]) {
                        value = inbuiltParsers[columnMapping](value);
                    } else if (typeof columnMapping === 'function') {
                        value = columnMapping(value);
                    }
                });

                return value;
            }
            if (typeof mappings[column] === 'string' && inbuiltParsers[mappings[column]]) {
                return inbuiltParsers[mappings[column]](value);
            } else if (typeof mappings[column] === 'function') {
                return mappings[column](value);
            }
        }

        return value;
    };

    return {
        map: function (column, value) {
            return mapValue(column, value);
        }
    };
};

module.exports = ColumnMapper;
