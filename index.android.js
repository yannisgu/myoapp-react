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

app.on("openUrl").subscribe(function(url) {
    WebIntent.open(url);
})

var EventsList = require("./src/components/EventsList")
var EventDetail = require("./src/components/EventDetail")
var MapsList = require("./src/components/MapsList")
var ResultsIndex = require("./src/components/ResultsIndex")
var ResultsByCategory = require("./src/components/ResultsByCategory")
var ResultsByRunner = require("./src/components/ResultsByRunner")

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
     app.setNavigator(navigationOperations);

    switch(route.name) {
        case "index":
            return <EventsList />
        case "eventDetail":
            return <EventDetail event={route.event} />
        case "mapsList":
            return <MapsList event={route.event} />
        case "resultsIndex":
            return <ResultsIndex event={route.event} />
        case "resultsByCategory":
            return <ResultsByCategory category={route.category} results={route.results} />
        case "resultsByRunner":
            return <ResultsByRunner runner={route.runner} results={route.results} />
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
