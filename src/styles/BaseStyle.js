import React from 'react-native';
var {Platform} = React;

let colors = {
    main: '#f99f17',
    border: '#353535',
    secondBack: '#f0f0f0'
}

var text = {
    color: 'black',
    fontSize: 18
}

if(Platform.OS == "android") {
    text.fontFamily = "Roboto";
}

let style = {
    text: text,
    colors: colors,
    button: {
        color: colors.main,
        fontSize: 18
    },
    listViewRowText: {
        ...text,
        fontSize: 22,
        height: 40,
        lineHeight: 33
    },
    listViewRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingLeft: 10

    },
    listViewCell: {
        flowDirection: 'column',
        paddingLeft: 10
    }
}

export default style;
