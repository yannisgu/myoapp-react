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
  LinkingIOS,
  TouchableOpacity
} = React;

var EventsList = require("./src/components/EventsList")
var EventDetail = require("./src/components/EventDetail")
var MapsList = require("./src/components/MapsList")
var IosNavigationBar = require("./src/components/IosNavigationBar")
require("./src/reactions/Reactions")
var ResultsIndex = require("./src/components/ResultsIndex")
var ResultsByCategory = require("./src/components/ResultsByCategory")
var ResultsByRunner = require("./src/components/ResultsByRunner")
var ResultsByLeg = require("./src/components/ResultsByLeg")


var style = require("./src/styles/IosIndexStyle")

var app = require("./src/App")

var _navigator = null;

app.on("openUrl").subscribe(function(url) {
    LinkingIOS.openURL(url);
});
var NavigationBarRouteMapper = {
  RightButton: function() {
      return null;
  },
  LeftButton: function(route, navigator, index, navState) {
    if (index === 0) {
      return null;
    }

    var previousRoute = navState.routeStack[index - 1];
    return (
      <TouchableOpacity
        onPress={() => navigator.pop()}>
        <Text style={style.titleBarButton}>
          Zurück
        </Text>
      </TouchableOpacity>
    );
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={style.titleBarTitle}>
        {route.title}
      </Text>
    );
  },

};


var MyOAppReact = React.createClass({
    navigator: null,
    navigationBar: null,
    renderScene: function(route, navigationOperations, onComponentRef) {
        _navigator = navigationOperations;
        app.setNavigator(_navigator);
       switch(route.name) {
           case "index":
                if(this.navigationBar) {
                    this.navigationBar.setState({title: "MyOApp", showBack: false})
                }
               return <EventsList />
           case "eventDetail":
                //this.navigationBar.setState({title: route.event.name, showBack: true})
               return <EventDetail event={route.event} />
           case "mapsList":
                //this.navigationBar.setState({title: "Karten: " + route.event.map, showBack: true})
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
   },
   getInitialState: function() {
       return {title: 'MyOApp'}
   },
    componentDidMount: function() {
    },
    onBack: function() {
        this.navigator.pop();
    },
    render: function() {
      var firstRoute = {
          name: 'index',
          title: "MyOApp"
      };

    return (<View style={{flex: 1}}>
                <Navigator
                  initialRoute={firstRoute}
                  configureScene={() => Navigator.SceneConfigs.FloatFromBottom}
                  renderScene={this.renderScene}
                  ref={n => this.navigator = n}
                  sceneStyle={style.scene}
                  navigationBar={
                  <Navigator.NavigationBar
                    routeMapper={NavigationBarRouteMapper}
                    style={style.titleBar}
                  />
                }
                  />
            </View>
    );
  }
});




AppRegistry.registerComponent('MyOAppReact', () => MyOAppReact);
