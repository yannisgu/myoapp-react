import React from 'react-native'
var {
  Text,
  View,
  ScrollView,
  TouchableHighlight
} = React;

import app from '../App'
import style from '../styles/ResultsStyle'


var ResultsByRunner = React.createClass({

    render: function() {
        var runner = this.props.runner;
        var results = this.props.results;
        console.log(this.props.category)
        return <ScrollView>
            {runner.splits.map((s) => {
                return <TouchableHighlight onPress={() => app.emit("openResultsLeg", {results, leg: s.leg, category: this.props.category})}>
                    <View style={style.listViewRow}>
                        <Text style={style.listViewRowText}>{s.number}</Text>
                        <View  style={style.listViewCell}>
                            <Text  style={style.listViewRowText}> {s.split} ({s.splitRank}.)</Text>
                            <Text style={style.listViewRowText}>+{s.splitBehind}</Text>
                        </View>
                        <View  style={style.listViewCell}>
                            <Text  style={style.listViewRowText}> {s.time} ({s.overallRank}.)</Text>
                            <Text style={style.listViewRowText}>+{s.overallBehind}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            })}
        </ScrollView>
    }
});

export default ResultsByRunner;
