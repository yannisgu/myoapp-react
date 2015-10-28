import React from 'react-native'
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} = React;

import NavigationBar from 'react-native-navbar';

var IosNavigationBar  = React.createClass({
    getInitialState: function() {
        return {title: "", showBack: false}
    },
    render: function() {
        var leftButton = {};
        if(this.state.showBack) {
            leftButton = {title: "< Back", handler: this.props.onBack}
        }

        return <NavigationBar
            title={{title: this.state.title}}
            leftButton={leftButton} />
    }
});

export default IosNavigationBar
