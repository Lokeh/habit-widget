
// Create scope
"use strict";

(function () {
	var byDate = function byDate(el1, el2) {
		var h1len = el1.history.length;
		var h2len = el2.history.length;
		if (h1len === 0 && h2len === 0) return 0;
		if (h1len === 0) return 1;
		if (h2len === 0) return -1;
		var a = new Date(el1.history[h1len - 1].date);
		var b = new Date(el2.history[h2len - 1].date);
		return a > b ? -1 : a < b ? 1 : 0;
	};

	var LatestHabit = React.createClass({
		displayName: "LatestHabit",

		render: function render() {
			var latestHabit = this.props.habits.concat(this.props.dailys).sort(byDate)[0] || { text: "Loading..." };
			// if (latestHabit) console.log(latestHabit.history[latestHabit.history.length-1].date);
			return React.createElement(
				"div",
				{ className: "habit-list" },
				"Latest task completed:",
				React.createElement(
					"div",
					{ className: "habit" },
					React.createElement(
						"span",
						{ className: "name" },
						latestHabit.text
					)
				)
			);
		}
	});

	var LevelIndicator = React.createClass({
		displayName: "LevelIndicator",

		render: function render() {
			return React.createElement(
				"span",
				{ className: "level" },
				"Lvl ",
				this.props.level
			);
		}
	});

	var ProfileName = React.createClass({
		displayName: "ProfileName",

		render: function render() {
			return React.createElement(
				"span",
				{ className: "profile-name" },
				this.props.name
			);
		}
	});

	var GlyphLabel = React.createClass({
		displayName: "GlyphLabel",

		render: function render() {
			var glyphs = {
				"hp": "fa fa-heart",
				"exp": "fa fa-star",
				"mp": "fa fa-fire"
			};
			var thisGlyph = glyphs[this.props.type];
			return React.createElement(
				"div",
				{ className: "glyph-label" },
				React.createElement("i", { className: thisGlyph })
			);
		}
	});

	var StatBar = React.createClass({
		displayName: "StatBar",

		render: function render() {
			var style = { width: Math.floor(this.props.statValue / this.props.max * 100) + "%" };
			var classes = "meter " + this.props.name;
			return React.createElement(
				"div",
				null,
				React.createElement(GlyphLabel, { type: this.props.name }),
				React.createElement(
					"div",
					{ className: "stat-bar" },
					React.createElement("div", { className: classes, style: style }),
					React.createElement(
						"span",
						{ className: "text" },
						this.props.statValue.toFixed(),
						" / ",
						this.props.max
					)
				)
			);
		}
	});

	var Habit = React.createClass({
		displayName: "Habit",

		loadData: function loadData(url, cb) {
			var _this = this;

			console.log("loading...");
			qwest.get(url, null, {
				headers: {
					"x-api-user": habitConfig.uid,
					"x-api-key": habitConfig.key
				},
				cache: false
			}).then(function (data) {
				return _this.setState({ data: data });
			})["catch"](function (e, data) {
				console.log(e);
				console.log(data);
			});
		},
		getInitialState: function getInitialState() {
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
		componentDidMount: function componentDidMount() {
			console.log("mounted");
			this.loadData(this.props.url);
			// setInterval(function () { this.loadData(this.props.url); }.bind(this), this.props.interval);
		},
		render: function render() {
			return React.createElement(
				"div",
				{ className: "panel" },
				React.createElement(
					"div",
					{ className: "profile-info" },
					React.createElement(ProfileName, { name: this.state.data.profile.name }),
					React.createElement(LevelIndicator, { level: this.state.data.stats.lvl })
				),
				React.createElement(StatBar, { name: "hp", statValue: this.state.data.stats.hp, max: this.state.data.stats.maxHealth }),
				React.createElement(StatBar, { name: "exp", statValue: this.state.data.stats.exp, max: this.state.data.stats.toNextLevel }),
				React.createElement(StatBar, { name: "mp", statValue: this.state.data.stats.mp, max: this.state.data.stats.maxMP }),
				React.createElement(LatestHabit, { habits: this.state.data.habits, dailys: this.state.data.dailys })
			);
		}
	});

	// Render our parent component
	React.render(React.createElement(Habit, { url: "https://habitrpg.com:443/api/v2/user" }), document.getElementById("habit-widget"));
})();
//# sourceMappingURL=habit.js.map
