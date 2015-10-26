import React from 'react-native'
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} = React;



var eventDetail = React.createClass({
    componentDidMount: function() {
    },

     render: function() {
         return <View>
         <Text>{this.props.event.name}</Text>
         </View>
    }
});

export default eventDetail;
