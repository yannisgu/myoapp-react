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

app.on("openEvent").subscribe(function(event) {
    _navigator.push({name: "eventDetail", event: event})
});

var EventsList = require("./src/components/EventsList")
var EventDetail = require("./src/components/EventDetail")

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
