import React from 'react-native'
var {
  Text,
  View,
  Image,
  ScrollView
} = React;

import mapsStore from "../stores/MapsStore"
import style from "../styles/MapsStyle"
import MapRow from "./MapRow"

var MapsList = React.createClass({
    componentDidMount: function() {
        mapsStore.on("update", (value) => this.setState({maps: value.events[this.props.event.id] || []}));
    },
    getInitialState: function() {
        return {maps: mapsStore.get().events[this.props.event.id] || []};
    },
    render: function() {
        return <ScrollView>
            {this.state.maps.map((m) => {
                return <MapRow map={m} />
            })}
        </ScrollView>
    }
});



export default MapsList;
