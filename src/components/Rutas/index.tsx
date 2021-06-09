import { BrowserRouter, Route, Switch } from "react-router-dom";
import Estructura from "components/Estructura";
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
            <Estructura
              titulo={ruta.titulo}
              esConFechaHaciaAtras={ruta.esConFechaHaciaAtras}
              esConLogoInferior={ruta.esConLogoInferior}
            >
              {ruta.componente}
            </Estructura>
          </Route>
        ))}
      </Switch>
    </BrowserRouter>
  );
};

export default Rutas;