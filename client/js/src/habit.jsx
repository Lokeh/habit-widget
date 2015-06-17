
// Create scope
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

	const LatestHabit = React.createClass({
		render() {
			// const latestHabit = this.props.habits.concat(this.props.dailys).sort(byDate)[0] || { text: 'Loading...' };
			// if (latestHabit) console.log(latestHabit.history[latestHabit.history.length-1].date);
			return (
				<div className="habit-list">
					Latest task completed:
					<div className="habit">
						<span className="name">{this.props.text}</span>
					</div>
				</div>
			);
		}
	});

	const LevelIndicator = React.createClass({
		render() { return (<span className="level">Lvl {this.props.level}</span>); }
	});

	const ProfileName = React.createClass({
		render() { return (<span className="profile-name">{this.props.name}</span>); }
	});

	const GlyphLabel = React.createClass({
		render() {
			const glyphs = {
				"hp": "fa fa-heart",
				"exp": "fa fa-star",
				"mp": "fa fa-fire"
			};
			const thisGlyph = glyphs[this.props.type];
			return (
				<div className="glyph-label">
					<i className={thisGlyph}></i>
				</div>
			);
		}
	});

	const StatBar = React.createClass({
		render() {
			const style = {width: Math.floor((this.props.statValue / this.props.max)*100) + '%' };
			const classes = "meter " + this.props.name;
			return (
				<div>
					<GlyphLabel type={this.props.name} />
					<div className="stat-bar">
						<div className={classes} style={style}></div>
						<span className="text">
							{this.props.statValue.toFixed()} / {this.props.max}
						</span>
					</div>
				</div>
			);
		}
	});

	const Habit = React.createClass({
		processData(data) {
			// https://github.com/HabitRPG/habitrpg/blob/develop/common/script/index.coffee#L125
			const computeExp = (lvl) => Math.round(((Math.pow(lvl, 2) * 0.25) + (10 * lvl) + 139.75) / 10) * 10;
			// https://github.com/HabitRPG/habitrpg/blob/develop/common/script/index.coffee#L1754
			const computeMaxMP = (int) => int*2 + 30;
		},
		loadData(url, cb) {
			console.log('loading...');
			qwest.get(url, null, {
				cache: false
			})
			.then((data) => this.setState({ data: data }))
			.catch((e, data) => {
				console.log(e);
				console.log(data);
			});
		},
		getInitialState() {
			return { 
				data: {
					task: { text: 'Loading...' },
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
		componentDidMount() {
			console.log('mounted');
			this.loadData(this.props.url);
			// setInterval(function () { this.loadData(this.props.url); }.bind(this), this.props.interval);
		},
		render() {
			return (
				<div className="panel">
					<div className="profile-info">
						<ProfileName name={this.state.data.profile.name} />
						<LevelIndicator level={this.state.data.stats.lvl} />
					</div>
					<StatBar name="hp" statValue={this.state.data.stats.hp} max={this.state.data.stats.maxHealth} />
					<StatBar name="exp" statValue={this.state.data.stats.exp} max={this.state.data.stats.toNextLevel} />
					<StatBar name="mp" statValue={this.state.data.stats.mp} max={this.state.data.stats.maxMP} />
					<LatestHabit habits={this.state.data.habits} dailys={this.state.data.dailys} />
				</div>
			);
		}
	});

	// Render our parent component
	React.render(
		<Habit url="http://willacton.com:8888/data" />,
		document.getElementById('habit-widget')
	);
})();