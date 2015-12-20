/** @jsx React.DOM */

var React = require('react');

parseDate = function(d) {
	var dateObj = new Date(d),
		weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
		year = dateObj.getFullYear(),
		month = dateObj.getMonth() + 1,
		date = dateObj.getDate(),		
		week = weeks[dateObj.getDay()];
	
	month = month < 10 ? "0" + month : "" + month;		
	date = date < 10 ? "0" + date : "" + date;
	return week + ", " + year + "/" + month + "/" + date;
	// return `${week}, ${year}/${month}/${date}`;
}

var Status = React.createClass({
	getInitialState: function() {
		return {
			editing: false
		}
	},
	edit: function() {
		console.log("editing");
		var self = this;
		this.setState({editing: true}, function() {
			self.refs.content.focus();	
		});		
	},
	update: function() {
		// console.log("Changed: ", this.refs.content.getDOMNode().value, " Key: ", this.props.pos);
		this.props.updateStatus(this.props.pos, this.refs.content.value)		
	},
	focusOut: function() {
		this.setState({editing: false});
	},
	renderText: function() {
	// http://stackoverflow.com/questions/28524751/reactjs-modify-parent-state-from-child-component		
		return (
			<div className="status">
				<span className="date">{parseDate(this.props.date)}</span>
				<label onClick={this.edit}>{this.props.content}</label>

				<button className="btn btn-xs btn-danger glyphicon glyphicon-trash pull-right" onClick={this.props.deleteStatus.bind(null, this.props.pos)}/>
			</div>
			)				
	},
	renderForm: function() {
		return (
			<div className="status">
				<span className="date">{parseDate(this.props.date)}</span>
				<textarea defaultValue={this.props.content} ref="content" rows="3" cols="150" onChange={this.update} onBlur={this.focusOut}/>
			</div>
			)		
	},	
	render: function() {
		if (this.state.editing) {
			return this.renderForm();
		} else {
			return this.renderText();
		}
	}
});

module.exports = Status;