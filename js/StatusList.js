/** @jsx React.DOM */

var React = require('react');
var Status = require('./Status.js');

var StatusList = React.createClass({
	getInitialState: function() {
		var status = localStorage.getItem("status");
		if (status == null) {
			localStorage.setItem("status", JSON.stringify(
				[{
					date: 1448908200000,
					text: "Capacity uplift of prod application"
				},
				{
					date: 1448994600000,
					text: "Version 2.0 rolled out in production"
				},
				{
					date: 1449081000000,
					text: "Database maintenance"
				}]));
		}
		return {status: JSON.parse(localStorage.getItem("status"))};
	},
	update: function(index, content) {
		var status = this.state.status;
		status[index] = {
			date: (new Date()).getTime(),
			text: content
		};
		this.setState({status: status});
		this.persistState();
	},
	deleteEntry: function(index) {
		var status = this.state.status;
		console.log("Deleting", status[index], " index", index);
		status.splice(index, 1);
		this.setState({status: status});
		this.persistState();
	},
	createStatus: function(status, index) {
		return (
			<Status key={index} content={status.text} date={status.date}     pos={index} updateStatus={this.update} deleteStatus={this.deleteEntry}/>
			)
	},
	persistState: function() {
		localStorage.setItem("status", JSON.stringify(this.state.status));
	},
	add: function() {
		var now = (new Date()).getTime(),
			content = "Add an entry";
		this.state.status.push({
			date: now,
			text: content
		});
		this.setState({status: this.state.status});
		this.persistState();
	},
	render: function() {
		return (
			<div>
				<div id="add">
					<button className="btn btn-primary btn-sm pull-right glyphicon glyphicon-plus" onClick={this.add}/>
				</div>
				<br/><br/>
				<div className="statuslist">
					{this.state.status.map(this.createStatus)}
				</div>
			</div>
			)
	}
});

module.exports = StatusList;
