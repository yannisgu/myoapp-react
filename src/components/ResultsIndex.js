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
                return <TouchableHighlight onPress={() => app.emit("openResultsForCategory", c)}>
                    <Text>{c.name}</Text>
                    <Text>{c.time}</Text>
                </TouchableHighlight>
            })}
        </ScrollView>
    }
});



export default ResultsIndex;
