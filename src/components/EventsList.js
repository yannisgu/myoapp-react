import eventsStore from '../stores/EventStore'
import React from 'react-native'
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView
} = React;

import EventRow from './EventRow';
import Tabs from "react-native-tabs"
import s from '../styles/EventListStyle';
import baseStyle from '../styles/BaseStyle'

var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

var eventsList = React.createClass({
    listView: null,
    componentDidMount: function() {
        eventsStore.on("update",
            value => {
                this.setState(this.calculateState());
            });
    },
    calculateState: function() {
        var future = [];
        var past = [];
        for(var i in eventsStore.get().events) {
            var event =  eventsStore.get().events[i]
            if(event.date  >= new Date().getTime() - (1000*60*60*24)) {
                future.push(event);
            }
            if(event.date  <= new Date().getTime()) {
                past.push(event);
            }
        }

        past.reverse();

        return {pastDataSource: ds.cloneWithRows(past), futureDataSource: ds.cloneWithRows(future)};
    },
    getInitialState: function() {
        return this.calculateState();
     },
     render: function() {
         return (
             <View  style={{flex: 1}}>

            {(() => {
                if(this.state.page == "future") {
                    return <ListView  ref={c => this.listView = c}
                        style={s.listView}
                        dataSource={this.state.futureDataSource} renderRow=
                    {(event) => <EventRow event={event}/>} />
                }
                else {
                    return <ListView
                        ref={c => this.listView = c}
                        dataSource={this.state.pastDataSource}
                        renderRow={(event) => <EventRow event={event}/>}
                        style={s.listView}/>
                }
            })()}
            <Tabs selected="back" style={s.tabBar}
             onSelect={(el) => {this.setState({page: el.props.name});return {style:{color:baseStyle.colors.main}}}}>
                <Text name="back">Vergangene Anlässe</Text>
                <Text name="future">Zukünftige Anlässe</Text>
           </Tabs>
            </View>
        );
    },
});

export default eventsList;
