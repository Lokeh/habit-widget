
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

	var LatestHabit = React.createClass({
		render: function () {
			var latestHabit = this.props.habits.concat(this.props.dailys).sort(byDate)[0];
			// if (latestHabit) console.log(latestHabit.history[latestHabit.history.length-1].date);
			if (!latestHabit) latestHabit = { text: 'Loading...' };
			return (
				<div className="habit-list">
					Latest task completed:
					<div className="habit">
						<span className="name">{latestHabit.text}</span>
					</div>
				</div>
			);
		}
	});

	var LevelIndicator = React.createClass({
		render: function () {
			return (
				<span className="level">Lvl {this.props.level}</span>
			);
		}
	});

	var ProfileName = React.createClass({
		render: function () {
			return (
				<span className="profile-name">{this.props.name}</span>
			);
		}
	});

	var StatBar = React.createClass({
		render: function () {
			var style = {width: Math.floor((this.props.statValue / this.props.max)*100) + '%' };
			var classes = "meter " + this.props.name;
			return (
				<div className="stat-bar">
					<div className={classes} style={style}></div>
					<i className="fa fa-heart"></i>
					<span className="text">
						{this.props.statValue.toFixed()} / {this.props.max}
					</span>
				</div>
			);
		}
	});

	var Habit = React.createClass({
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
		<Habit url="https://habitrpg.com:443/api/v2/user" />,
		document.getElementById('habit-widget')
	);
})();