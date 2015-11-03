import base from './BaseStyle'


var style = {
    row: {
        flexDirection: 'row',
        height: 30
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
    }
}

export default style;
