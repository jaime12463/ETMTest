import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import { useEffect, useRef } from "react";
import InputField from "./InputField";

type FormAddProductProps = {
  handleAddToPedido: React.FormEventHandler<HTMLFormElement>;
  focusProduct: {
    producto: string;
    unidades: string;
    precio: string;
  };
  handleIncrementValue: React.ChangeEventHandler<HTMLInputElement>;
  autoFocus: boolean;
  inputRef: any;
};

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
  inputRef,
}: FormAddProductProps) => {
  const classes = useStyles();

  console.log(autoFocus);
  console.log("unidadRef=" + inputRef);
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

          <Grid item xs={6} sm={6}>
            <TextField
              name="unidades"
              size="small"
              variant="outlined"
              fullWidth
              label="Unidades"
              type="number"
              value={focusProduct.unidades}
              onChange={handleIncrementValue}
              disabled={
                focusProduct.unidades === "" && focusProduct.producto === ""
              }
              // InputProps={{ref:inputRef}}
              inputRef={(input) => {
                if (input != null) {
                  input.focus();
                }
              }}
            />
          </Grid>
          {/* <InputField
            label="Unidades"
            size="small"
            xs={6}
            sm={6}
            min={0}
            type="number"
            value={focusProduct.unidades}
            onChange={handleIncrementValue}
            disabled={focusProduct.unidades === ""}
            inputRef={inputRef}
            autoFocus={autoFocus}
          /> */}
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
