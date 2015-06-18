# Habit Component

A neat little widget for showing off your HabitRPG stats.

## Dependencies

The client requires React >= v13.3 for DOM rendering and qwest >= v1.7.0 for AJAX requests. These can be installed using npm for now.

The server does not require any 3rd party modules.

The client source is written using JSX and both client and server are written in ES6. Therefore, Babel is used for transpiling from JSX/ES6 to ES5.1. Dev dependencies can be installed via npm and include grunt, grunt-bable, etc.

## Installation

First, simply clone the repo. You can start the server:

```
$ cd habit-widget/server/
$ npm start

> habit-webhook@0.0.1 start /Users/will/Code/habit-widget/server
> node build/index.js

Server running at
  => http://localhost:8888/
CTRL + C to shutdown
```

On your site (or wherever you're putting this), put the `client` directory in a convenient place. For now, it requires you to install the dependencies using npm (you could potentially use a CDN for React, I don't know of one for qwest):

```
$ cd /var/www/mysite/habit-widget/client
$ npm install
```

Put this in your head section:

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
<script src="js/build/habit.js"></script>
<script>
	habitWidget.render('habit-widget', 'My Habit RPG Username', 'http://mywebsite.com:8888/data');
</script>
```

Now, wherever you so please, you can position your habit-widget!

```html
<div id="habit-widget"></div>
```
