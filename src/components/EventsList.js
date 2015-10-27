import eventsStore from '../stores/EventStore'
import React from 'react-native'
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} = React;

import EventRow from './EventRow'


var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var eventsList = React.createClass({
    listView: null,
    componentDidMount: function() {
        eventsStore.on("update",
            value => {
                this.setState({dataSource: ds.cloneWithRows(value.events)});
            });
    },

    getInitialState: function() {
        return { dataSource: ds.cloneWithRows(eventsStore.get().events)};
     },
     render: function() {
         return (
             <ListView  ref={c => this.listView = c} dataSource={this.state.dataSource} renderRow=
                {(event) => <EventRow event={event}/>} />
        );
    },
});

export default eventsList;
