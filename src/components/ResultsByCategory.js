import React from 'react-native'
var {
  Text,
  View,
  ScrollView,
  TouchableHighlight
} = React;

import app from '../App'

var ResultsByCategory = React.createClass({

    render: function() {
        var category = this.props.category;
        return <ScrollView>
            {category.runners.map((r) => {
                return <TouchableHighlight onPress={() => app.emit("openResultsForRunner", {results: this.props.results, runner: r})}>
                    <View>
                        <Text>{r.rank}</Text>
                        <Text>{r.fullName}</Text>
                        <Text>{r.time}</Text>
                    </View>
                </TouchableHighlight>
            })}
        </ScrollView>
    }
});

export default ResultsByCategory    ;
