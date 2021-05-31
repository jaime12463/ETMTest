import { BrowserRouter, Route, Switch } from "react-router-dom";
import TomaDePedidos from "../pages/TomaDePedidos";
import DetallePedido from "../pages/DetallePedido";
import Splash from "../pages/Splash";
import Layout from "./Layout";

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
