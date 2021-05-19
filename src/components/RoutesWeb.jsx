import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import GlobalState from "../context/GlobalState";
import TomaDePedidos from "../pages/TomaDePedidos.js"
import Splash from "../pages/Splash.js"

const Routes = () =>
{
    return (
        <GlobalState>
             <BrowserRouter basename={'/'}>
                <Switch>
                    <Route path="/TomaDePedidos" component={TomaDePedidos}/>
                    <Route path="/Splash" component={Splash}/>
                    <Redirect from="/"  to="/Splash"/>
                </Switch>
            </BrowserRouter>
        </GlobalState>
    )
};

export default Routes;