import axios from "axios";
import { TCliente } from "models";
import { URL_API } from "utils/constants";

export const obtenerClientes: () => Promise<TCliente[]> = async () => {
    const response = await axios.get(`${URL_API}/femsa/tomapedidos`);
    return response.data;
}