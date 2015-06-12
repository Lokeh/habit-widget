var LatestHabit = React.createClass({displayName: "LatestHabit",
	getInitialState: function () {
		return { data: { todos: [], habits: [] } };
	},
	componentDidMount: function () {
		console.log('mounted');
		qwest.get(this.props.url)
			.then(function (data) {
				this.setState({ data: data });
			}.bind(this))
			.catch(function (e, data) {
				console.log(e);
				console.log(data);
			})
	},
	render: function () {
		var habits = this.state.data.habits.map(function (habit, i) {
			return (
				React.createElement("div", {className: "content", key: i}, 
					habit.text
				)
			);
		});

		return (
			React.createElement("div", null, habits)
		);
	}
});

React.render(
	React.createElement(LatestHabit, {url: "response.json"}),
	document.getElementById('habit-widget')
);