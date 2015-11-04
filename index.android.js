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
  BackAndroid,
  TouchableOpacity
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
var ResultsByLeg = require("./src/components/ResultsByLeg")

require("./src/reactions/Reactions")

var _navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator && _navigator.getCurrentRoutes().length > 1) {
        _navigator.pop();
        return true;
    }
    return false;
});

import style from "./src/styles/AndroidIndexStyle"

var NavigationBarRouteMapper = {
  RightButton: function(route, navigator, index, navState) {
      if(route.name == "index") {
          return <TouchableOpacity onPress={() => app.emit("openAboutPage")}>
            <Text style={style.titleBarButton}>
              Über MyOApp
            </Text>
          </TouchableOpacity>
      }
      return null;
  },
  LeftButton: function(route, navigator, index, navState) {
    return null;
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={style.titleBarTitle}>
        {route.title}
      </Text>
    );
  },

};

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
           return <ResultsByRunner results={route.results} runner={route.runner} category={route.category} />
       case "resultsByLeg":
           return <ResultsByLeg results={route.results} leg={route.leg} category={route.category} />

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
            sceneStyle={{backgroundColor: "white"}}
            navigationBar={
                <Navigator.NavigationBar
                  routeMapper={NavigationBarRouteMapper}
                  style={style.titleBar}
                />
              }
            />
        );
  }
});

AppRegistry.registerComponent('MyOAppReact', () => MyOAppReact);
