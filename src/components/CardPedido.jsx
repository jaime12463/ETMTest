import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
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

export default function CardPedido({ pedido }) {
  const [info, setInfo] = useState({ totalUnidades: "", totalPrecio: "" });
  const classes = useStyles();

  console.log(pedido);

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
              Total Unidades:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="b" display="block" gutterBottom>
              {info.totalUnidades}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="b" display="block" gutterBottom>
              Total:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="b" display="block" gutterBottom>
              $ {info.totalPrecio}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.alignment}>
        <Button variant="contained" color="secondary">
          VER DETALLE
        </Button>
      </CardActions>
    </Card>
  );
}
