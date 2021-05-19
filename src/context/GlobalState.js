import React ,{useState} from 'react';
import AppContext from './AppContext';

function GlobalState(props)
{
    const [title, setTitle]=useState("Bienvenido");
    const [cliente, setCliente] = useState({});
    const [listaProductos, setlistaProductos] = useState([]);
    return (
        <AppContext.Provider
            value={{
                    title:title,
                    setTitle:setTitle,
                    cliente:cliente,
                    setCliente:setCliente,
                    listaProductos:listaProductos,
                    setlistaProductos:setlistaProductos,
                }}>
            {props.children}
        </AppContext.Provider>
    );
}

export default GlobalState;