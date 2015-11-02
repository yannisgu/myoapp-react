import React from 'react-native'
var {
  Text,
  View,
  ScrollView,
  TouchableHighlight
} = React;

import app from '../App'

var ResultsByRunner = React.createClass({

    render: function() {
        var runner = this.props.runner;
        var results = this.props.results;
        return <ScrollView>
            {runner.splits.map((s) => {
                return <TouchableHighlight onPress={() => app.emit("openResultsLeg", {results, leg: s.leg})}>
                    <View>
                        <Text>{s.number}</Text>
                        <Text>{s.split}</Text>
                        <Text>+{s.splitBehind}</Text>
                    </View>
                </TouchableHighlight>
            })}
        </ScrollView>
    }
});

export default ResultsByRunner;
