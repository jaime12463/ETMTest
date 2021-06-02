import axios from "axios";
import { TCliente } from "models";

const baseURL = "./data"

export const obtenerClientes: () => Promise<TCliente[]> = async () =>{
    const response = await axios.get(`${baseURL}/precios_cliente.json`);
    return response.data;
}