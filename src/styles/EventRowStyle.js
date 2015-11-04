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
    }
}

export default style;
