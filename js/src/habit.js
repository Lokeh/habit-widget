var byDate = function (el1, el2) {
	var h1len = el1.history.length;
	var h2len = el2.history.length;
	if (h1len === 0 && h2len === 0) return 0;
	if (h1len === 0) return 1;
	if (h2len === 0) return -1;
	var a = new Date(el1.history[h1len-1].date);
	var b = new Date(el2.history[h2len-1].date);
	return a>b ? -1 : a<b ? 1 : 0;
};

var LatestHabit = React.createClass({
	render: function () {
		var latestHabit = this.props.habits.concat(this.props.dailys).sort(byDate)[0];
		if (!latestHabit) latestHabit = { text: 'Loading...' };
		return (
			<div>
				Latest task completed: <em>{latestHabit.text}</em>
			</div>
		);
	}
});

var HealthBar = React.createClass({
	render: function () {
		return (
			<div>
				HP: {this.props.health.toFixed(2)}
			</div>
		);
	}
});

var ExpBar = React.createClass({
	render: function () {
		return (
			<div>
				EXP: {this.props.exp.toFixed(2)}
			</div>
		);
	}
});

var ManaBar = React.createClass({
	render: function () {
		return (
			<div>
				MP: {this.props.mana.toFixed(2)}
			</div>
		);
	}
});

var LevelIndicator = React.createClass({
	render: function () {
		return (
			<div>
				Lvl {this.props.level}
			</div>
		);
	}
});

var ProfileName = React.createClass({
	render: function () {
		return (
			<div>
				<span className="profile-name">{this.props.name}</span>
			</div>
		);
	}
});

var Habit = React.createClass({
	getInitialState: function () {
		return { 
			data: {
				todos: [],
				habits: [],
				dailys: [],
				stats: {
					hp: 0,
					mp: 0,
					exp: 0,
					lvl: 0
				},
				profile: { 
					name: null 
				}
			} 
		};
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
			});
	},
	render: function () {
		return (
			<div className="panel">
				<ProfileName name={this.state.data.profile.name} />
				<LevelIndicator level={this.state.data.stats.lvl} />
				<HealthBar health={this.state.data.stats.hp} />
				<ExpBar exp={this.state.data.stats.exp} />
				<ManaBar mana={this.state.data.stats.mp} />
				<LatestHabit habits={this.state.data.habits} dailys={this.state.data.dailys} />
			</div>
		);
	}
});

React.render(
	<Habit url="response.json" />,
	document.getElementById('habit-widget')
);