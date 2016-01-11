var AppDispatcher = require('../dispatcher/Dispatcher');
var EventEmitter = require('events').EventEmitter;
var constants = require('../constants/constants');
var assign = require('object-assign');
var CHANGE_EVENT = 'change';

var __status = [];

function init() {
    var status = localStorage.getItem("status");
    if (status == null) {
        return;
    }
    __status = JSON.parse(localStorage.getItem("status"));
}

function save() {
    localStorage.setItem("status", JSON.stringify(__status));
}

function create() {
    var now = (new Date()).getTime(),
        text = "Add entry";

    __status.push({
        date: now,
        text: text
    });
}

function update(id, content) {
    __status[id] = {
        date: (new Date()).getTime(),
        text: content
    };
}

function destroy(id) {
    __status.splice(id, 1);
}

var StatusStore = assign({}, EventEmitter.prototype, {
    getAll: function() {
        return __status;
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
        save();
    },
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }
});

AppDispatcher.register(function(action) {
    var index, text;
    switch(action.actionType) {
        case constants.ADD_ENTRY:
            create();
            StatusStore.emitChange();
            break;

        case constants.DELETE_ENTRY:
            index = action.id;
            if (__status[index] == 'undefined' || __status[index] == null) {
                console.error(`${index} does not exist`);
                break;
            }
            destroy(index);
            StatusStore.emitChange();
            break;

        case constants.UPDATE_ENTRY:
            index = action.id;
            if (__status[index] == 'undefined' || __status[index] == null) {
                console.error(`${index} does not exist`);
                break;
            }
            text = action.text;
            update(index, text);
            StatusStore.emitChange();
            break;
    }
});

init();
module.exports = StatusStore;
