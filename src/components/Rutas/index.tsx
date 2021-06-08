import { BrowserRouter, Route, Switch } from "react-router-dom";
import Cascaron from "components/Cascaron";
import rutas from "routes"

const Rutas = () => {
  return (
    <BrowserRouter>
      <Switch>
        {rutas.map((ruta) => (
          <Route
            exact
            path={ruta.ruta}
            key={ruta.ruta}
          >
            <Cascaron
              titulo={ruta.titulo}
              esConFechaHaciaAtras={ruta.esConFechaHaciaAtras}
              esConLogoInferior={ruta.esConLogoInferior}
            >
              {ruta.componente}
            </Cascaron>
          </Route>
        ))}
      </Switch>
    </BrowserRouter>
  );
};

export default Rutas;