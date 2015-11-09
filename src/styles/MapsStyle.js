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
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 5,
        marginTop: 6
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
