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
  NavigationBarIOS
} = React;

var EventsList = require("./src/components/EventsList")


var MyOAppReact = React.createClass({
  render: function() {
    return (<NavigationBarIOS initialRoute={{
                component: EventsList,
                title: 'MyOApp'
            }} />
    );
  }
});

AppRegistry.registerComponent('MyOAppReact', () => MyOAppReact);
