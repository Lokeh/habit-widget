# Habit Component

A neat little widget for showing off your HabitRPG stats.

Simply clone the repo. You can start the server:

```
$ cd habit-widget/server/
$ npm start

> habit-webhook@0.0.1 start /Users/will/Code/habit-widget/server
> node build/index.js

Server running at
  => http://localhost:8888/
CTRL + C to shutdown
```

On your site (or wherever you're putting this), include the `client` directory and put this in your head section:

```html
<!-- habit-widget scripts and styles -->
<script src="habit-widget/client/node_modules/react/dist/react.js"></script>
<script src="habit-widget/client/node_modules/qwest/src/qwest.js"></script>
<link href='http://fonts.googleapis.com/css?family=Lato&subset=latin,latin-ext' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css">
<link rel="stylesheet" href="habit-widget/client/css/style.css">
```

And at the bottom of your body section:

```html
<div id="habit-widget"></div>
<script src="js/build/habit.js"></script>
<script>
	habitWidget.render('habit-widget', 'My Habit RPG Username', 'http://mywebsite.com:8888/data');
</script>
```
