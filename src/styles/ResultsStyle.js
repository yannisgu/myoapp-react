import base from './BaseStyle'

let style = {
    listViewRow: {
        ...base.listViewRow
    },
    listViewRowText: {
        ...base.listViewRowText,
        fontSize: 20
    },
    listViewCell: {
        ...base.listViewCell

    },
    colors: {
        ...base.colors
    },
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    }
}

export default style;
