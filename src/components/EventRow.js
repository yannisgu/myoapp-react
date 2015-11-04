import React from 'react-native'
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight
} = React;

import app from '../App'
import style from  '../styles/EventRowStyle'

var eventRow = React.createClass({
    onPress: function() {
        app.emit("openEvent", this.props.event)
    },
    render: function() {
        var event = this.props.event;
        var date = new Date(event.date);
        var dateString = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
        var line2 =
            (event.map ? event.map : "") +
            (event.map ? ", " : "") +
            (event.date ? dateString : "");
        var line3 =
            (event.region ? event.region : "") +
            (event.region && event.organiser ? ", " : "") +
            (event.organiser ? event.organiser : "")
            return <TouchableHighlight underlayColor={style.colors.main}  onPress={this.onPress}>
                <View key={event.name}>
                    <View style={style.mainRow}><Text style={style.mainRowText}>{event.name}</Text></View>
                    <View style={style.subRow}><Text style={style.subRowText}>{line2}</Text></View>
                    <View style={style.subRow}><Text style={style.subRowText}>{line3}</Text></View>
                </View>
            </TouchableHighlight>

    }
});



export default eventRow;
