
// Create scope
(function () {
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

	var loadData = function (url, cb) {
		qwest.get(url, null, {
			headers: {
				'x-api-user': habitConfig.uid,
				'x-api-key': habitConfig.key
			}
		})
		.then(cb)
		.catch(function (e, data) {
			console.log(e);
			console.log(data);
		});
	};

	var LatestHabit = React.createClass({displayName: "LatestHabit",
		render: function () {
			var latestHabit = this.props.habits.concat(this.props.dailys).sort(byDate)[0];
			if (!latestHabit) latestHabit = { text: 'Loading...' };
			return (
				React.createElement("div", null, 
					"Latest task completed: ", React.createElement("em", null, latestHabit.text)
				)
			);
		}
	});

	var HealthBar = React.createClass({displayName: "HealthBar",
		render: function () {
			return (
				React.createElement("div", null, 
					"HP: ", this.props.health.toFixed(0), " / ", this.props.max
				)
			);
		}
	});

	var ExpBar = React.createClass({displayName: "ExpBar",
		render: function () {
			return (
				React.createElement("div", null, 
					"EXP: ", this.props.exp.toFixed(0), " / ", this.props.max
				)
			);
		}
	});

	var ManaBar = React.createClass({displayName: "ManaBar",
		render: function () {
			return (
				React.createElement("div", null, 
					"MP: ", this.props.mana.toFixed(0), " / ", this.props.max
				)
			);
		}
	});

	var LevelIndicator = React.createClass({displayName: "LevelIndicator",
		render: function () {
			return (
				React.createElement("div", null, 
					"Lvl ", this.props.level
				)
			);
		}
	});

	var ProfileName = React.createClass({displayName: "ProfileName",
		render: function () {
			return (
				React.createElement("div", null, 
					React.createElement("span", {className: "profile-name"}, this.props.name)
				)
			);
		}
	});

	var Habit = React.createClass({displayName: "Habit",
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
						lvl: 0,
						maxHealth: 0,
						maxMP: 0,
						toNextLevel: 0
					},
					profile: { 
						name: null 
					}
				} 
			};
		},
		componentDidMount: function () {
			console.log('mounted');
			loadData(this.props.url, function (data) {
				this.setState({ data: data });
			}.bind(this));
		},
		render: function () {
			return (
				React.createElement("div", {className: "panel"}, 
					React.createElement(ProfileName, {name: this.state.data.profile.name}), 
					React.createElement(LevelIndicator, {level: this.state.data.stats.lvl}), 
					React.createElement(HealthBar, {health: this.state.data.stats.hp, max: this.state.data.stats.maxHealth}), 
					React.createElement(ExpBar, {exp: this.state.data.stats.exp, max: this.state.data.stats.toNextLevel}), 
					React.createElement(ManaBar, {mana: this.state.data.stats.mp, max: this.state.data.stats.maxMP}), 
					React.createElement(LatestHabit, {habits: this.state.data.habits, dailys: this.state.data.dailys})
				)
			);
		}
	});

	React.render(
		React.createElement(Habit, {url: "https://habitrpg.com:443/api/v2/user"}),
		document.getElementById('habit-widget')
	);
})();