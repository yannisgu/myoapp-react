import base from './BaseStyle'
import React from 'react-native';
var {
    Platform
} = React;

var top;
var lvPaddingTop;
if(Platform.OS == "android") {
    top =  0;
    lvPaddingTop= 40;
}

var style = {
    tabBar: {
        backgroundColor: base.colors.secondBack,
        top
    },
    listView: {
        paddingTop: lvPaddingTop
    }
}

export default style;
