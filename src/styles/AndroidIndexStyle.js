import base from './BaseStyle'

var titleBarHeigth = 55;

let style = {
    scene: {
        backgroundColor: "white",
        paddingTop: titleBarHeigth
    },
    titleBar: {
        backgroundColor: base.colors.main,
        color: "white"
    },
    titleBarTitle: {
        color: "white",
        fontSize: 18,
        marginTop: 16
    },
    titleBarButton: {
        marginTop: 16,
        marginRight: 16
    }
}

export default style;
