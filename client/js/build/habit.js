
// Create scope
"use strict";

(function () {
	// const byDate = (el1, el2) => {
	// 	const h1len = el1.history.length;
	// 	const h2len = el2.history.length;
	// 	if (h1len === 0 && h2len === 0) return 0; // equal
	// 	if (h1len === 0) return 1; // el1 less
	// 	if (h2len === 0) return -1; // el2 less
	// 	const a = new Date(el1.history[h1len-1].date);
	// 	const b = new Date(el2.history[h2len-1].date);
	// 	return a>b ? -1 : a<b ? 1 : 0;
	// };

	var LatestHabit = React.createClass({
		displayName: "LatestHabit",

		render: function render() {
			// const latestHabit = this.props.habits.concat(this.props.dailys).sort(byDate)[0] || { text: 'Loading...' };
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
						this.props.text
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

		processData: function processData(data) {
			// https://github.com/HabitRPG/habitrpg/blob/develop/common/script/index.coffee#L125
			var computeExp = function computeExp(lvl) {
				return Math.round((Math.pow(lvl, 2) * 0.25 + 10 * lvl + 139.75) / 10) * 10;
			};
			// https://github.com/HabitRPG/habitrpg/blob/develop/common/script/index.coffee#L1754
			var computeMaxMP = function computeMaxMP(int) {
				return int * 2 + 30;
			};
		},
		loadData: function loadData(url, cb) {
			var _this = this;

			console.log("loading...");
			qwest.get(url, null, {
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
					task: { text: "Loading..." },
					user: {
						stats: {
							hp: 0,
							mp: 0,
							exp: 0,
							lvl: 0,
							maxHealth: 50,
							maxMP: 0,
							toNextLevel: 0
						}
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
	React.render(React.createElement(Habit, { url: "http://willacton.com:8888/data" }), document.getElementById("habit-widget"));
})();
//# sourceMappingURL=habit.js.map
