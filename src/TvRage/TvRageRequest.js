var http = require('http');
var Promise = require("bluebird");
var _ = require('lodash');

var defaultOptions = {
    hostname: 'epguides.com',
    port: 80,
    path: '/common/allshows.txt',
    method: 'GET'
};

var TvRageRequest = function(options) {
    var requestOptions = _.extend({}, defaultOptions, options);

    return {
        getSeries: function() {
            var data = [];

            return new Promise(function(resolve, reject) {
                var req = http.request(requestOptions, function(res) {
                    res.on('data', function (chunk) {
                        data.push(chunk);
                    });

                    res.on('end', function() {
                        resolve(data.join(''));
                    });
                });

                req.on('error', function(e) {
                   reject(e);
                });

                req.end();
            });
        }
    };
};

module.exports = TvRageRequest;
