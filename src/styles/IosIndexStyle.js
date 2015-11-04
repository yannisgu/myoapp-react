import baseStyle from "./BaseStyle"

let style = {
    titleBar: {
        borderBottomColor: "black",
        height: 60,
        backgroundColor: baseStyle.colors.secondBack,
        borderBottomColor: baseStyle.colors.border,
        borderBottomWidth: 1
    },
    titleBarTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10
    },
    titleBarButton: {
        ...baseStyle.button,
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10
    },
    scene: {
        paddingTop: 60,
        flex: 1
    }
}

export default style;
