var express = require('express');
var _ = require('lodash');

var defaults = {
    port: 8080,
    data: {
        '/common/allshows.txt': 'title,directory,tvrage,start date,end date,number of episodes,run time,network,country\r\n"House, M.D.",House,3908,Nov 2004,May 2012,"176 eps","60 min","Fox",US'
    }
};

var FakeTvRageServer = function(options) {
    var app;
    var server;
    var serverSettings = _.extend({}, defaults, options);
    var data = options.data;

    return {
        start: function(callback) {
            app = express();

            for (var item in data) {
                app.get(item, function(req, res) {
                    res.send(typeof data[item] === 'function' ? data[item]() : data[item]);
                });
            }

            server = app.listen(serverSettings.port, function() {
                if (callback) {
                    callback();
                }
            });
        },
        stop: function() {
            server.close();
        }
    };
};

module.exports = FakeTvRageServer;