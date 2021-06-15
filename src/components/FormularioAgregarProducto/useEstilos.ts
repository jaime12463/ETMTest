import { makeStyles } from "@material-ui/core/styles";
const usarEstilos = makeStyles((theme) => ({
    paper: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%",
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    sectionAlert: {
        marginTop: "1rem",
    },
}));
export default usarEstilos;