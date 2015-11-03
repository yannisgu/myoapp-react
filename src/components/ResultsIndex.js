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
        resultsStore.on("update", (value) => this.setState({results: value.events[this.props.event.id] || {categories: []}}));
    },
    getInitialState: function() {
        return {results: resultsStore.get().events[this.props.event.id] || {categories: []}};
    },
    render: function() {
        return <ScrollView>
            {this.state.results.categories.map((c) => {
                return <TouchableHighlight onPress={() => app.emit("openResultsForCategory", {results: this.state.results, category: c})}>
                    <View style={style.listViewRow}>
                        <Text style={style.listViewRowText}>{c.name}</Text>
                    </View>
                </TouchableHighlight>
            })}
        </ScrollView>
    }
});



export default ResultsIndex;
