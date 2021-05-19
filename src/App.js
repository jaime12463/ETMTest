import { useState } from "react";
import { AppContext } from "./context/AppContext";
import RoutesWeb from "./components/RoutesWeb";
import Layout from "./components/Layout";

function App() {
  const [title, setTitle] = useState("Bienvenido");
  const [cliente, setCliente] = useState({});
  const [listaProductosPedido, setlistaProductosPedido] = useState([]);
  const [viewFooter, setViewFooter] = useState(0);

  return (
    <AppContext.Provider
      value={{
        title,
        setTitle,
        cliente,
        setCliente,
        listaProductosPedido,
        setlistaProductosPedido,
        viewFooter,
        setViewFooter,
      }}
    >
      <Layout>
        <RoutesWeb />
      </Layout>
    </AppContext.Provider>
  );
}

export default App;
