watch-settings-server
=====================

_Classes_

**code-generator** takes care of generating a Pebble App files: watchsettings.h, watchsettings.c, and watchsettings.js files. It also takes care of generating the Pebble Apps web components: [appname].html, [appname].js (note: css is a template and is not unique).

**hoster** takes care of hosting a Pebble Apps generated configuration page UI.

**bundler** takes care of bundling and storing a Pebble Apps assets.

**database** is a helper class to our firebase.

**firebase-parser** takes care of extracting and preparing parts of firebase JSON for input into other functions.
