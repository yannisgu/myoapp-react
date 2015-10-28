import base from "./BaseStyle"

let style = {
    row: {
        flexDirection: 'row'
    },
    image: {
        width: 40,
        height: 40
    },
    label: {
        ...base.text,
        flex: 1
    }
}

export default style;
