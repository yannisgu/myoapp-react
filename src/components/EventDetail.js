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
