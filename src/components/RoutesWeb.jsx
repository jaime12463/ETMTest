import { BrowserRouter, Route, Switch } from "react-router-dom";
import TomaDePedidos from "../pages/TomaDePedidos.js";
import DetallePedido from "../pages/DetallePedido.js";
import Splash from "../pages/Splash.js";

const RoutesWeb = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/ingresarpedido" component={TomaDePedidos} />
        <Route exact path="/detalle" component={DetallePedido} />
        <Route path="/" component={Splash} />
      </Switch>
    </BrowserRouter>
  );
};

export default RoutesWeb;
