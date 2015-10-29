import React from 'react-native'
var {
  Text,
  View,
  ScrollView,
  TouchableHighlight
} = React;

var ResultsByCategory = React.createClass({

    render: function() {
        var category = this.props.category;
        return <ScrollView>
            {category.runners.map((r) => {
                return <TouchableHighlight onPress={() => app.emmit("openResultsForRunner", r)}>
                    <Text>{r.fullName}</Text>
                </TouchableHighlight>
            })}
        </ScrollView>
    }
});

export default ResultsByCategory    ;
