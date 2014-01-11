var fs = require('fs');
var http = require('http');
var _ = require('lodash');

archivistFactory = function() {
	return {
		run: function(args) {
			var configFile = args || 'config.json';
			var affectedFiles = [];
			var data = [];
            var showsOfInterest = ['"The American Baking Competition"'];

			console.log('Loading episode information');

            var inbuiltParsers = {
                'int': function(value) {
                    return parseInt(value, 10);
                }
            };

            var parsers = {
                tvrage: 'int',
                numberofepisodes: function(value) {
                  var numberRegex = /([0-9])+/;
                  var regexMatch = value.match(/([0-9])+/);

                  if(!regexMatch) {
                    return value;
                  }

                  return inbuiltParsers['int'](regexMatch[0]);
                }
            };

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
			  	var lines = allData.split('\r\n');
			  	var numberOfLines = lines.length;
			  	var x = 0;
			  	var attributes = [];
			  	var headers = lines[x].split(',');
			  	var numberOfHeaders = headers.length;
			  	var columns;
			  	var shows = [];
                var quoteRemovalRegex = /^(?:")?(.*)(?:")?$/;

			  	for(columns = 0; columns < numberOfHeaders; columns++) {
			  		attributes.push(headers[columns].replace(/[ ]/g, ''));
			  	}

			  	for(x = 1; x < lines.length;x++) {
			  		var show = {};
			  		var showValues = lines[x].split(',');
                    var correctedValue;

			  		if(showValues.length < 2) {
			  			continue;
			  		}

			  		for(columns = 0; columns < numberOfHeaders; columns++) {
                        correctedValue = showValues[columns];

                        if(correctedValue[0] === '"') {
                            correctedValue = correctedValue.substring(1);
                        }

                        if(correctedValue[correctedValue.length - 1] === '"') {
                            correctedValue = correctedValue.substring(0, correctedValue.length - 1);
                        }

                        if(parsers[attributes[columns]]) {
                            if(typeof(parsers[attributes[columns]]) === 'string') {
                                correctedValue = inbuiltParsers[parsers[attributes[columns]]](correctedValue);
                            }
                            else if(typeof parsers[attributes[columns]] === 'function') {
                                correctedValue = parsers[attributes[columns]](correctedValue);
                            }
                        }

			  			show[attributes[columns]] = correctedValue;
			  		}

			  		shows.push(show);
			  	}

                var filteredShows = _(shows).filter(function(item) {
                    return  _(showsOfInterest).contains(item.title);
                });

			  	console.log(shows);
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