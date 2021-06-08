import { makeStyles } from "@material-ui/core";
const usarEstilos = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    sectionAlert: {
        marginTop: "1rem",
    },
    sectionRazonSocial: {
        display: "flex",
        alignItems: "center",
    },
    colorTextLabel: {
        color: "black",
    },
}));
export default usarEstilos;