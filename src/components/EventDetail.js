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
import style from '../styles/EventDetailStyle'

var eventDetail = React.createClass({
    componentDidMount: function() {

    },
    openDesciption: function() {
        app.emit("openUrl", this.props.event.url)
    },
    openStartlist: function() {
        app.emit("openUrl", this.props.event.urlStartlist)
    },
    openExternalResults: function() {
        app.emit("openUrl", this.props.event.urlResults)
    },
    openResults: function() {
        console.log("asdf")
        app.emit("openResults", this.props.event)
    },
    openTimetable: function() {
        var item = this.props.event;
        var to = "";
    	if(item.eventCenter) {
    		to = "to=" + item.eventCenter;
    	}
    	else if(item.eventCenterLatitude && item.eventCenterLongitude) {
    		to = "toll=" + item.eventCenterLatitude + ',' + item.eventCenterLongitude;
    	}

    	if(item.date) {
    		var date = item.date / 1000;
    	}
    	var timetableUrl = "sbbmobileb2c://timetable?" + to  +"&time=" + date + '&accessid=dm89518e7a4e0bcf670';

    	app.emit("openUrl", timetableUrl);
    },
    openMaps: function() {
        var event = this.props.event;

        app.emit("openMaps", event);
    },
     render: function() {
         var event = this.props.event;
         var date = new Date(event.date);
         var dateString = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
         return <View>
            <View style={style.row}>
                <Text style={style.label}>Name</Text>
                <Text style={style.value}>{event.name}</Text>
            </View>
            <View style={style.row}>
               <Text style={style.label}>Datum</Text>
               <Text style={style.value}>{dateString}</Text>
            </View>
            <View style={style.row}>
                <Text style={style.label}>Karte</Text>
                <Text style={style.value}>{event.map}</Text>
            </View>
             <View style={style.row}>
                <Text style={style.label}>Ort</Text>
                <Text style={style.value}>{event.eventCenter}</Text>
             </View>
             {(() => {if(event.url) {
                 return <TouchableHighlight onPress={this.openDesciption} style={style.row}>
                    <Text style={style.linkText}>Aussschreibung</Text>
                 </TouchableHighlight>
             }})()}
             {(() => {if(event.urlStartlist) {
                 return <TouchableHighlight onPress={this.openStartlist} style={style.row}>
                    <Text style={style.linkText}>Starliste</Text>
                 </TouchableHighlight>
             }})()}
             {(() => {if(event.urlResults) {
                 return <TouchableHighlight onPress={this.openResults} style={style.row}>
                    <Text style={style.linkText}>Resultate</Text>
                 </TouchableHighlight>
             }})()}
             {(() => {if(event.urlResults) {
                 return <TouchableHighlight onPress={this.openExternalResults} style={style.row}>
                    <Text style={style.linkText}>Resultate (Erweitert)</Text>
                 </TouchableHighlight>
             }})()}
             <TouchableHighlight onPress={this.openTimetable} style={style.row}>
                <Text style={style.linkText}>Anfahrt</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.openMaps} style={style.row}>
               <Text style={style.linkText}>Karten</Text>
           </TouchableHighlight>
         </View>
    }
});

export default eventDetail;
