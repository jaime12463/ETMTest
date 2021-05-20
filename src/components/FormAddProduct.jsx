import { Button, Grid, makeStyles } from "@material-ui/core";
import InputField from "./InputField";

const useStyles = makeStyles((theme) => ({
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

export const FormAddProduct = ({
  handleAddToPedido,
  focusProduct,
  handleIncrementValue,
  autoFocus,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.paper}>
      <form className={classes.form} noValidate onSubmit={handleAddToPedido}>
        <Grid container spacing={1}>
          <InputField
            label="Producto"
            size="small"
            xs={6}
            sm={6}
            value={focusProduct.producto}
            disabled
          />
          <InputField
            label="Unidades"
            size="small"
            xs={6}
            sm={6}
            min={0}
            type="number"
            value={focusProduct.unidades}
            onChange={handleIncrementValue}
            disabled={focusProduct.unidades === ""}
            inputProps={{ min: 0 }}
          />

          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ display: "none" }}
          >
            +
          </Button>
        </Grid>
      </form>
    </div>
  );
};
