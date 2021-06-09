import React, { useMemo } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStyles } from "./useTarjetaPedidoStyles";
import { TProductoPedido } from "models";

type CardPedidoProps = {
  pedido: TProductoPedido[];
};
   
type TTotal = {
  totalUnidades: number,
  totalPrecio: number
}
const totalCero: TTotal = { totalUnidades: 0, totalPrecio: 0 };
const reduceFunction = (total: TTotal, productoPedido: TProductoPedido): TTotal => (
  {
    totalUnidades: total.totalUnidades + productoPedido.unidades, 
    totalPrecio: total.totalPrecio + productoPedido.precio,
  }
)

// const (productoPedido, info)
export default function TarjetaPedido({ pedido }: CardPedidoProps) {

  const totales = useMemo(() => pedido.reduce(reduceFunction, totalCero), [pedido]);
  const classes = useStyles();
  const { t } = useTranslation();
  // Esto se puede simplificar
  /*
  const [info, setInfo] = useState({ totalUnidades: 0, totalPrecio: 0 });
  
  

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
*/
  return (
    <Card className={classes.root}>
      <CardContent className={classes.sectionCardInfo}>
        <Grid container>
          <Grid item xs={6}>
            <Typography component="b" display="block" gutterBottom>
              {t("general.totalUnidades")}:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="b" display="block" gutterBottom>
              {totales.totalUnidades}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="b" display="block" gutterBottom>
              {t("general.total")}:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography component="b" display="block" gutterBottom>
              $ {Number(totales.totalPrecio).toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions className={classes.alignment}>
        <Link to="/detalle" className={classes.sectionButtonDetail}>
          <Button variant="contained" color="secondary">
            {t("general.verDetalle").toUpperCase() /* no utilizar formateo en javascript, dejarlo al css */}
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
