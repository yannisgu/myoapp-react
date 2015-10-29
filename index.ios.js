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
  LinkingIOS
} = React;

var EventsList = require("./src/components/EventsList")
var EventDetail = require("./src/components/EventDetail")
var MapsList = require("./src/components/MapsList")
var IosNavigationBar = require("./src/components/IosNavigationBar")
require("./src/reactions/Reactions")
var ResultsIndex = require("./src/components/ResultsIndex")
var ResultsByCategory = require("./src/components/ResultsByCategory")

var app = require("./src/App")

var _navigator = null;

app.on("openEvent").subscribe(function(event) {
    _navigator.push({name: "eventDetail", event: event});
});

app.on("openMaps").subscribe(function(event) {
    _navigator.push({name: "mapsList", event: event});
});

app.on("openResults").subscribe(function(event) {
    _navigator.push({name: "resultsIndex", event: event})
});

app.on("openResultsForCategory").subscribe(function(category) {
    _navigator.push({name: "resultsByCategory", category: category})
});


app.on("openUrl").subscribe(function(url) {
    LinkingIOS.openURL(url);
});



var MyOAppReact = React.createClass({
    navigator: null,
    navigationBar: null,
    renderScene: function(route, navigationOperations, onComponentRef) {
        _navigator = navigationOperations;
       switch(route.name) {
           case "index":
                if(this.navigationBar) {
                    this.navigationBar.setState({title: "MyOApp", showBack: false})
                }
               return <EventsList />
           case "eventDetail":
                this.navigationBar.setState({title: route.event.name, showBack: true})
               return <EventDetail event={route.event} />
           case "mapsList":
                this.navigationBar.setState({title: "Karten: " + route.event.map, showBack: true})
               return <MapsList event={route.event} />
           case "resultsIndex":
                return <ResultsIndex event={route.event} />
            case "resultsByCategory":
                 return <ResultsByCategory category={route.category} />

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
          name: 'index'
      };

    return (<View style={{ flex: 1, }}>
                <IosNavigationBar ref={n => this.navigationBar = n} onBack={this.onBack}/>
                <Navigator
                  initialRoute={firstRoute}
                  configureScene={() => Navigator.SceneConfigs.FloatFromBottom}
                  renderScene={this.renderScene}
                  ref={n => this.navigator = n}
                  />
            </View>
    );
  }
});

AppRegistry.registerComponent('MyOAppReact', () => MyOAppReact);
