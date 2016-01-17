/** @jsx React.DOM */

var React = require('react');
var StatusStore = require('../stores/StatusStore');
var Actions = require('../actions/Actions');
var Status = require('./Status.react');

function getState() {
    return {
        status: StatusStore.getAll()
    }
}

var StatusList = React.createClass({
    getInitialState: function() {
        return getState();
    },
    componentDidMount: function() {
        StatusStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function() {
        StatusStore.removeChangeListener(this.onChange);
    },
    onChange: function() {
        this.setState(getState());
    },
    createStatus: function(status, index) {
        var tags = status.tags || ["default"];
        return (
            <Status key={index} pos={index} content={status.text} date={ status.date } tags={tags} />
        )
    },
    render: function() {
        return (
            <div>
                <div id="add">
                    <button className = "btn btn-primary btn-sm pull-right glyphicon glyphicon-plus" onClick={ Actions.create }/>
                </div> <br/>
            <br/>
                <div className="statuslist"> {this.state.status.map(this.createStatus) } </div>
            </div>
        )
    }
});

module.exports = StatusList;
