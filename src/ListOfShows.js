var _ = require('lodash');

ListOfShows = function(shows) {
    return {
        getShow: function(showTitle) {
            var foundShow = _.findWhere(shows, { title: showTitle });

            return foundShow;
        }
    };
};

module.exports = ListOfShows;
