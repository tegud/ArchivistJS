var _ = require('lodash');

ListOfShows = function(shows) {
    return {
        getShow: function(showTitle) {
            return _.findWhere(shows, { title: showTitle });
        }
    };
};

module.exports = ListOfShows;
