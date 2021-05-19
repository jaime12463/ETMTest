import React ,{useState} from 'react';
import AppContext from './AppContext';

function GlobalState(props)
{
    const [title, setTitle]=useState("Bienvenido");
    const [cliente, setCliente] = useState({});
    const [listaProductosPedido, setlistaProductosPedido] = useState([{Codigoproducto:"1882",unidades:"10"}]);
    const [viewFooter, setViewFooter] = useState(0);
    return (
        <AppContext.Provider
            value={{
                    title:title,
                    setTitle:setTitle,
                    cliente:cliente,
                    setCliente:setCliente,
                    listaProductosPedido:listaProductosPedido,
                    setlistaProductosPedido:setlistaProductosPedido,
                    viewFooter: viewFooter,
                    setViewFooter:setViewFooter
                }}>
            {props.children}
        </AppContext.Provider>
    );
}

export default GlobalState;