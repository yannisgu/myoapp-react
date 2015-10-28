import React from "react-native";
var {
    Image,
    Text,
    View,
    TouchableHighlight
} = React;

import style from "../styles/MapsStyle"
import app from "../App"

var MapRow = React.createClass({
    openMap: function() {
        app.emit("openUrl", this.props.map.imagelink)
    },
    render: function() {
        var map = this.props.map;
        var thumbnailLink = "http://omaps.worldofo.com/images/"+ map.thumblink + "_s.jpg";

        return <TouchableHighlight  onPress={this.openMap}>
            <View style={style.row}>
                <Image style={style.image} source={{uri: thumbnailLink}}  style={{width: 40, height: 40}}/>
                <Text style={style.label}>{map.compname}</Text>
            </View>
        </TouchableHighlight>
    }
});

export default MapRow;
