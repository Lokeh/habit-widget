var LatestHabit = React.createClass({
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
				<div className="content" key={i}>
					{habit.text}
				</div>
			);
		});

		return (
			<div>{habits}</div>
		);
	}
});

React.render(
	<LatestHabit url="response.json" />,
	document.getElementById('habit-widget')
);