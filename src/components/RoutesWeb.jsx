import { BrowserRouter, Route, Switch } from "react-router-dom";
import TomaDePedidos from "../pages/TomaDePedidos.js";
import DetallePedido from "../pages/DetallePedido.js";
import Splash from "../pages/Splash.js";
import Layout from "./Layout.jsx";

const RoutesWeb = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/ingresarpedido" component={TomaDePedidos} />
          <Route exact path="/detalle" component={DetallePedido} />
          <Route path="/" component={Splash} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default RoutesWeb;
