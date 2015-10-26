import React from 'react-native'
var {
    AsyncStorage
} = React;

var localStorage = {
    get: async function(key) {
        return await AsyncStorage.getItem(key);
    },
    set: async function(key, value) {
        await AsyncStorage.setItem(key, value);
    }
}

export default localStorage;
