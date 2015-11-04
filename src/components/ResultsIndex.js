import React from 'react-native'
var {
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight
} = React;

import resultsStore from '../stores/ResultsStore'
import app from '../App'

import style from '../styles/ResultsStyle';

var ResultsIndex = React.createClass({
    componentDidMount: function() {
        resultsStore.on("update", (value) => this.setState({results: value.events[this.props.event.id]}));
    },
    getInitialState: function() {
        return {results: resultsStore.get().events[this.props.event.id]};
    },
    render: function() {
        if(this.state.results) {
            return <ScrollView>
                {this.state.results.categories.map((c) => {
                    return <TouchableHighlight underlayColor={style.colors.main} key={c.name} onPress={() => app.emit("openResultsForCategory", {results: this.state.results, category: c})}>
                        <View style={style.listViewRow}>
                            <Text style={style.listViewRowText}>{c.name}</Text>
                        </View>
                    </TouchableHighlight>
                })}
            </ScrollView>
        }
        else {
            return <View><Text>Loading...</Text></View>
        }
    }
});



export default ResultsIndex;
