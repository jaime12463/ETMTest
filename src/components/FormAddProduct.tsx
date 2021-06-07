import React from "react";
import { Button, Grid, makeStyles, TextField } from "@material-ui/core";
import InputField from "components/InputField";
import { useTranslation } from "react-i18next";
import { TProductoPedido } from "models";

type FormAddProductProps = {
  handleAddToPedido: React.FormEventHandler<HTMLFormElement>;
  focusProduct: TProductoPedido;
  handleIncrementValue: React.ChangeEventHandler<HTMLInputElement>;
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
}: FormAddProductProps) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.paper}>
      <form className={classes.form} noValidate onSubmit={handleAddToPedido}>
        <Grid container spacing={1}>
          <Grid item xs={6} sm={6}>
            <InputField
              label={t('general.producto')}
              value={focusProduct.codigoProducto}
              disabled
            />
          </Grid>
          <Grid item xs={6} sm={6}>
            <TextField
              name="unidades"
              size="small"
              variant="outlined"
              fullWidth
              label={t('general.unidades')}
              type="number"
              value={focusProduct.unidades === 0 ? "" : focusProduct.unidades}
              onChange={handleIncrementValue}
              disabled={focusProduct.unidades === 0 && focusProduct.codigoProducto === ""}
              inputRef={(input) => {if (input != null) input.focus();}}
            />
          </Grid>
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
