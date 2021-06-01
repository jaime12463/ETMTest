import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { TProductoSolicitado } from "models";

type CardPedidoProps = {
  pedido: TProductoSolicitado[];
};

const useStyles = makeStyles({
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
});

export default function CardPedido({ pedido }: CardPedidoProps) {
  const [info, setInfo] = useState({ totalUnidades: 0, totalPrecio: 0 });
  const classes = useStyles();
  const { t } = useTranslation();

  useEffect(() => {
    let values = { totalUnidades: 0, totalPrecio: 0 };
    pedido.forEach((producto) => {
      values = {
        totalUnidades: values.totalUnidades + producto.unidades,
        totalPrecio: values.totalPrecio + producto.precio,
      };
    });
    setInfo({ ...values });
  }, [pedido]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography component="b" display="block" gutterBottom>
              {t('general.totalUnidades')}:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="b" display="block" gutterBottom>
              {info.totalUnidades}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="b" display="block" gutterBottom>
            {t('general.total')}:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="b" display="block" gutterBottom>
              $ {Number(info.totalPrecio).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.alignment}>
        <Link to="/detalle">
          <Button variant="contained" color="secondary">
            {t('general.verDetalle').toUpperCase()}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
