
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

	var LatestHabit = React.createClass({displayName: "LatestHabit",
		render: function () {
			var latestHabit = this.props.habits.concat(this.props.dailys).sort(byDate)[0];
			// if (latestHabit) console.log(latestHabit.history[latestHabit.history.length-1].date);
			if (!latestHabit) latestHabit = { text: 'Loading...' };
			return (
				React.createElement("div", {className: "habit-list"}, 
					"Latest task completed:", 
					React.createElement("div", {className: "habit"}, 
						latestHabit.text
					)
				)
			);
		}
	});

	var LevelIndicator = React.createClass({displayName: "LevelIndicator",
		render: function () {
			return (
				React.createElement("span", {className: "level"}, "Lvl ", this.props.level)
			);
		}
	});

	var ProfileName = React.createClass({displayName: "ProfileName",
		render: function () {
			return (
				React.createElement("span", {className: "profile-name"}, this.props.name)
			);
		}
	});

	var StatBar = React.createClass({displayName: "StatBar",
		render: function () {
			var style = {width: ((this.props.statValue / this.props.max)*100).toFixed() + '%' };
			var classes = "meter " + this.props.name;
			return (
				React.createElement("div", {className: "stat-bar"}, 
					React.createElement("div", {className: classes, style: style}), 
					React.createElement("span", {className: "text"}, 
						this.props.statValue.toFixed(), " / ", this.props.max
					)
				)
			);
		}
	});

	var Habit = React.createClass({displayName: "Habit",
		loadData: function (url, cb) {
			console.log('loading...');
			qwest.get(url, null, {
				headers: {
					'x-api-user': habitConfig.uid,
					'x-api-key': habitConfig.key
				},
				cache: false
			})
			.then(function (data) {
				this.setState({ data: data });
			}.bind(this))
			.catch(function (e, data) {
				console.log(e);
				console.log(data);
			});
		},
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
			this.loadData(this.props.url);
			// setInterval(function () { this.loadData(this.props.url); }.bind(this), this.props.interval);
		},
		render: function () {
			return (
				React.createElement("div", {className: "panel"}, 
					React.createElement("div", {className: "profile-info"}, 
						React.createElement(ProfileName, {name: this.state.data.profile.name}), 
						React.createElement(LevelIndicator, {level: this.state.data.stats.lvl})
					), 
					React.createElement(StatBar, {name: "hp", statValue: this.state.data.stats.hp, max: this.state.data.stats.maxHealth}), 
					React.createElement(StatBar, {name: "exp", statValue: this.state.data.stats.exp, max: this.state.data.stats.toNextLevel}), 
					React.createElement(StatBar, {name: "mp", statValue: this.state.data.stats.mp, max: this.state.data.stats.maxMP}), 
					React.createElement(LatestHabit, {habits: this.state.data.habits, dailys: this.state.data.dailys})
				)
			);
		}
	});

	// Render our parent component
	React.render(
		React.createElement(Habit, {url: "https://habitrpg.com:443/api/v2/user", interval: 10000}),
		document.getElementById('habit-widget')
	);
})();