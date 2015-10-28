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
  Navigator,
  BackAndroid
} = React;

var app = require( "./src/App")
var WebIntent = require('react-native-webintent');

app.on("openEvent").subscribe(function(event) {
    _navigator.push({name: "eventDetail", event: event})
});

app.on("openMaps").subscribe(function(event) {
    _navigator.push({name: "mapsList", event: event})
});


app.on("openUrl").subscribe(function(url) {
    WebIntent.open(url);
})

var EventsList = require("./src/components/EventsList")
var EventDetail = require("./src/components/EventDetail")
var MapsList = require("./src/components/MapsList")

require("./src/reactions/Reactions")

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();
        return true;
    }
    return false;
});


var RouteMapper = function(route, navigationOperations, onComponentRef) {
     _navigator = navigationOperations;

    switch(route.name) {
        case "index":
            return <EventsList />
        case "eventDetail":
            return <EventDetail event={route.event} />
        case "mapsList":
            return <MapsList event={route.event} />
    }
};

var MyOAppReact = React.createClass({
    componentDidMount: function() {
    },
  render: function() {
      var firstRoute = {
          name: 'index'
      };
      return (
          <Navigator
            initialRoute={firstRoute}
            configureScene={() => Navigator.SceneConfigs.FadeAndroid}
            renderScene={RouteMapper}
            />
        );
  }
});

AppRegistry.registerComponent('MyOAppReact', () => MyOAppReact);
