import React from 'react-native'
var {
  Text,
  View,
  ScrollView,
  TouchableHighlight
} = React;

import app from '../App'
import style from '../styles/ResultsStyle'


var ResultsByLeg = React.createClass({

    render: function() {
        var leg = this.props.leg;
        var category = this.props.category;
        var runners = [];
        for(var i in category.legs) {
            var l = category.legs[i];
            if(l.code == leg) {
                runners = l.runners;
            }
        }

        return <ScrollView>
            {runners.map((r) => {
                var fullRunner = category.runners.find((r2 => r2.fullName == r.fullName));
                return <TouchableHighlight underlayColor={style.colors.main}  key={r.fullName} onPress={() => app.emit("openResultsForRunner", {results: this.props.results, category: category, runner: fullRunner})}>
                    <View style={style.listViewRow}>
                        <Text style={style.listViewRowText}>
                            {r.splitRank}. {r.fullName} {r.split} {r.splitBehind}
                        </Text>

                    </View>
                </TouchableHighlight>
            })}
        </ScrollView>
    }
});

export default ResultsByLeg;
