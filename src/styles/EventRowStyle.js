import base from "./BaseStyle"

let style = {
    subRow: {
        height: 20
    },
    subRowText: {
        color: 'black'
    },
    mainRow: {
        height: 26,
        overflow: 'hidden'
    },
    mainRowText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black'
    },
    colors: {
        ...base.colors
    },
    listViewRow: {
        ...base.listViewRow,
        flexDirection: 'column'
    }
}

export default style;
