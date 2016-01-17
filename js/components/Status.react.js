/** @jsx React.DOM */

var React = require('react');
var Actions = require('../actions/Actions');

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

var Tag = React.createClass({
	getInitialState: function() {
		return {
			editing: false
		}
	},
	render: function() {
		console.log(`rendering tag ${this.props.pos}`);
		if (this.state.editing) {
			return this.renderForm()
		} else {
			return this.renderText();
		}
	},
	renderForm: function() {
		var tags = this.props.tags.join(',');
		return (
			<div className="tags">
				<input type="text" ref="tag" onBlur={this.display} defaultValue={tags}></input>
			</div>
		)
	},
	renderText: function() {
		var idx = 0;
		var tags = this.props.tags.map(function(t) {
			idx += 1;
			return (<span className="badge" key={idx}>{t}</span>)
		});
		return (
			<div className="tags" onClick={this.edit}>
				{tags}
			</div>
		)
	},
	display: function() {
		var tags = [],
			val = this.refs.tag.value;
		if (val.length) {
			tags = val.split(',').filter((t) => t.trim().length);
		}
		Actions.updateTag(this.props.pos, tags);
		console.log("updating tag", this.refs.tag.value);
		this.setState({editing: false});
	},
	edit: function() {
		this.setState({editing: true});
	}
});

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
		// this.props.updateStatus(this.props.pos, this.refs.content.value);
        Actions.update(this.props.pos, this.refs.content.value);
	},
	focusOut: function() {
		this.setState({editing: false});
	},
    delete: function() {
        Actions.destroy(this.props.pos);
    },
	renderText: function() {
	// http://stackoverflow.com/questions/28524751/reactjs-modify-parent-state-from-child-component
		var tags = this.props.tags.length ? this.props.tags : ["default"];
		return (
			<div className="status">
				<span className="date">{parseDate(this.props.date)}</span>
				<label onClick={this.edit}>{this.props.content}</label>

				<button className="btn btn-xs btn-danger glyphicon glyphicon-trash pull-right" onClick={this.delete}/>
				<Tag tags={tags} pos={this.props.pos} key={this.props.pos}/>

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
		console.log(`rendering Status ${this.props.pos}`);
		if (this.state.editing) {
			return this.renderForm();
		} else {
			return this.renderText();
		}
	}
});

module.exports = Status;
