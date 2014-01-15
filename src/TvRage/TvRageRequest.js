var http = require('http');
var _ = require('lodash');

var defaultOptions = {
    hostname: 'epguides.com',
    port: 80,
    path: '/common/allshows.txt',
    method: 'GET'
};

var TvRageRequest = function(options) {
    var data = [];
    var requestOptions = _.extend({}, defaultOptions, options);

    var req = http.request(requestOptions, function(res) {
        res.on('data', function (chunk) {
            data.push(chunk);
        });

        res.on('end', function() {
            options.success(data.join(''));
        });
    });

    req.on('error', function(e) {
        options.error(e);
    });

    req.end();
};

module.exports = TvRageRequest;
