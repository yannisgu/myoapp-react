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


var eventDetail = React.createClass({
    componentDidMount: function() {

    },
    openDesciption: function() {
        app.emit("openUrl", this.props.event.url)
    },
    openStartlist: function() {
        app.emit("openUrl", this.props.event.urlStartlist)
    },
    openResults: function() {
        app.emit("openUrl", this.props.event.urlResults)
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
         return <View>
            <View style={style.row}>
                <Text style={style.label}>Name</Text>
                <Text style={style.value}>{event.name}</Text>
            </View>
            <View style={style.row}>
               <Text style={style.label}>Datum</Text>
               <Text style={style.value}>{event.date}</Text>
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
                 return <TouchableHighlight onPress={this.openDesciption}>
                    <Text>Aussschreibung</Text>
                 </TouchableHighlight>
             }})()}
             {(() => {if(event.urlStartlist) {
                 return <TouchableHighlight onPress={this.openStartlist}>
                    <Text>Starliste</Text>
                 </TouchableHighlight>
             }})()}
             {(() => {if(event.urlResults) {
                 return <TouchableHighlight onPress={this.openResults}>
                    <Text>Resultate</Text>
                 </TouchableHighlight>
             }})()}
             <TouchableHighlight onPress={this.openTimetable}>
                <Text>Anfahrt</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={this.openMaps}>
               <Text>Karten</Text>
           </TouchableHighlight>
         </View>
    }
});

var baseStyle = {
    color: 'black'
}

var style = {
    row: {
        flexDirection: 'row'
    },
    label: {
        ...baseStyle,
        width: 50
    },
    value: {
        ...baseStyle,
        flex: 1
    }
}

export default eventDetail;
