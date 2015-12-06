import React from 'react-native'
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  ScrollView
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
        app.emit("openUrl", "http://o-l.ch/cgi-bin/results?rl_id=" + this.props.event.resultsId)
    },
    openResults: function() {
        app.emit("openResults", this.props.event)
    },
    openOlana: function() {
        app.emit("openUrl", "http://ol.zimaa.ch/event/solv/" + this.props.event.resultsId + "/categories");
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
         return <ScrollView>
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
                 return <TouchableHighlight underlayColor={style.colors.main} onPress={this.openDesciption}>
                    <View style={style.row}><Text style={style.linkText}>Aussschreibung</Text></View>
                 </TouchableHighlight>
             }})()}
             {(() => {if(event.urlStartlist) {
                 return <TouchableHighlight underlayColor={style.colors.main} onPress={this.openStartlist}>
                    <View style={style.row}><Text style={style.linkText}>Starliste</Text></View>
                 </TouchableHighlight>
             }})()}
             {(() => {if(event.resultsId) {
                 return <View><TouchableHighlight underlayColor={style.colors.main} onPress={this.openResults}>
                    <View style={style.row}><Text style={style.linkText}>Resultate</Text></View>
                 </TouchableHighlight>
                 <TouchableHighlight underlayColor={style.colors.main} onPress={this.openOlana}>
                    <View style={style.row}>
                        <Text style={style.linkText}>Resultate (Olana)</Text>
                    </View>
                 </TouchableHighlight>
                 <TouchableHighlight underlayColor={style.colors.main} onPress={this.openExternalResults}>
                    <View style={style.row}><Text style={style.linkText}>Resultate (o-l.ch)</Text></View>
                 </TouchableHighlight></View>
             }})()}
             <TouchableHighlight underlayColor={style.colors.main} onPress={this.openTimetable}>
                <View style={style.row}><Text style={style.linkText}>Anfahrt</Text></View>
            </TouchableHighlight>
            <TouchableHighlight underlayColor={style.colors.main} onPress={this.openMaps}>
               <View style={style.row}><Text style={style.linkText}>Karten</Text></View>
           </TouchableHighlight>
         </ScrollView>
    }
});

export default eventDetail;
