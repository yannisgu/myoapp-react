/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS
} = React;

var EventsList = require("./src/components/EventsList")
var EventDetail = require("./src/components/EventDetail")

var app = require("./src/App")

var _navigator = null;

app.on("openEvent").subscribe(function(event) {
     _navigator.push({
         title: event.name,
         component: EventDetail,
         passProps: {event: event}
     });
});


var MyOAppReact = React.createClass({
  render: function() {
    return (<NavigatorIOS style={{flex: 1}} ref={n => _navigator = n} initialRoute={{
                component: EventsList,
                title: 'MyOApp'
            }} />
    );
  }
});

AppRegistry.registerComponent('MyOAppReact', () => MyOAppReact);
