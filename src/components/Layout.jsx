import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "3rem",
  },
}));

export const Layout = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container>
        <Grid container direction="row" alignItems="center">
          {props.children}
        </Grid>
      </Container>
    </div>
  );
};
