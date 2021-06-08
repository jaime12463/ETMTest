import { makeStyles } from "@material-ui/core/styles";
const usarEstilos = makeStyles({
    root: {
        minWidth: 275,
        marginTop: 20,
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    alignment: {
        justifyContent: "center",
    },
    sectionCardInfo: {
        paddingBottom: "0px",
    },
    sectionButtonDetail: {
        textDecoration: "none",
    },
});
export default usarEstilos;