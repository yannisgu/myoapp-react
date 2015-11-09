import React from 'react-native';
var {Platform} = React;

let colors = {
    main: '#ff9800',
    accent: '#b2ff59',
    border: '#353535',
    secondBack: '#f0f0f0'
}

var text = {
    color: 'black',
    fontSize: 16
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
        fontSize: 16,
    },
    listViewRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.border,
        paddingLeft: 16,
        paddingTop: 16,
        paddingBottom: 20

    },
    listViewCell: {
        flowDirection: 'column',
        paddingLeft: 10
    }
}

export default style;
