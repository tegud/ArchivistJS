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
        function findMapping (mapping) {
            if (Array.isArray(mapping)){
                _.each(mapping, function(mapping) {
                    value = findMapping(mapping);
                });

                return value;
            } else if (typeof mapping === 'string' && inbuiltParsers[mapping]) {
                return inbuiltParsers[mapping](value);
            } else if (typeof mapping === 'function') {
                return mapping(value);
            }

            return value;
        }

        if (mappings[column]) {
            return findMapping( mappings[column]);
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
