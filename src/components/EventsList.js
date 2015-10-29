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
                if(eventsStore.get().events.length > 0) {
                    var scrollIndex = null;
                    for(var i in eventsStore.get().events) {
                        var event =  eventsStore.get().events[i]
                        if(event.date  >= new Date().getTime() - (1000*60*60*24)) {
                			scrollIndex = i;
                            break;
                        }
                    }
                    if(scrollIndex) {

                        //this.listView.getScrollResponder().scrollTo(66 * scrollIndex)
                    }
                }

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
