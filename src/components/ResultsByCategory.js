import React from 'react-native'
var {
  Text,
  View,
  ScrollView,
  TouchableHighlight
} = React;

import app from '../App'
import s from '../styles/ResultsStyle';

var ResultsByCategory = React.createClass({

    render: function() {
        var category = this.props.category;
        return <ScrollView>
            {category.runners.map((r) => {
                return <TouchableHighlight onPress={() => app.emit("openResultsForRunner", {results: this.props.results, runner: r, category: category})}>
                    <View style={s.listViewRow}>
                        <Text style={s.listViewRowText}>{r.rank}. </Text>
                        <Text style={s.listViewRowText}>{r.fullName} </Text>
                        <Text style={s.listViewRowText}>{r.time}</Text>
                    </View>
                </TouchableHighlight>
            })}
        </ScrollView>
    }
});

export default ResultsByCategory    ;
