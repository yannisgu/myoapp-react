import base from './BaseStyle'


var style = {
    row: {
        ...base.listViewRow,
        flexDirection: 'row'
    },
    label: {
        ...base.text,
        width: 60,
    },
    value: {
        ...base.text,
        flex: 1,
        fontWeight: 'bold'
    },
    linkText: {
        ...base.text,
        fontWeight: 'bold',
    },
    colors: {
        ...base.colors
    }
}

export default style;
