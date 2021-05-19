import { Route, Switch, Redirect } from "react-router-dom";
import TomaDePedidos from "../pages/TomaDePedidos.js";
import Splash from "../pages/Splash.js";
import { DetallePedido } from "../pages/DetallePedido.js";

const Routes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/detalle" component={DetallePedido} />
        <Route path="/TomaDePedidos" component={TomaDePedidos} />
        <Route path="/Splash" component={Splash} />
        <Redirect from="/" to="/Splash" />
      </Switch>
    </>
  );
};

export default Routes;
