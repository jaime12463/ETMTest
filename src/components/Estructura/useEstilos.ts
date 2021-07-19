import { makeStyles } from "@material-ui/core/styles";
const useEstilos = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      },
      main: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
      },
    footer: {
        padding: theme.spacing(2),
        marginTop: 'auto',
    },
}));
export default useEstilos;
