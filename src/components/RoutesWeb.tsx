import { BrowserRouter, Route, Switch } from "react-router-dom";
import TomaDePedidos from "pages/TomaDePedidos";
import DetallePedido from "pages/DetallePedido";
import Splash from "pages/Splash";
import Layout from "components/Layout";
import routes from "routes"

const RoutesWeb = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path={routes.ingresarpedido} component={TomaDePedidos} />
          <Route exact path={routes.detalle} component={DetallePedido} />
          <Route path={routes.home} component={Splash} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default RoutesWeb;
