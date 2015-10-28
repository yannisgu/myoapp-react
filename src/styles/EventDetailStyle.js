import base from './BaseStyle'

var text = {
    ...base.text,
    fontSize: 18
}

var style = {
    row: {
        flexDirection: 'row',
        height: 30
    },
    label: {
        ...text,
        width: 60,
        marginLeft: 10
    },
    value: {
        ...text,
        flex: 1,
        fontWeight: 'bold'
    },
    linkText: {
        ...text,
        fontWeight: 'bold',
        marginLeft: 10
    }
}

export default style;
