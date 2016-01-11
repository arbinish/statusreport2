var AppDispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/constants');

var Actions = {
    create: function() {
        AppDispatcher.dispatch({
            actionType: Constants.ADD_ENTRY
        });
    },
    destroy: function(index) {
        AppDispatcher.dispatch({
            actionType: Constants.DELETE_ENTRY,
            id: index
        });
    },
    update: function(index, text) {
        AppDispatcher.dispatch({
            actionType: Constants.UPDATE_ENTRY,
            id: index,
            text: text
        });
    }
}

module.exports = Actions;
