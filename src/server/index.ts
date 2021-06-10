import axios from "axios";
import { TDatos } from "models";
import { URL_API } from "utils/constants";

export const obtenerDatos: () => Promise<TDatos> = async () => {
    const response = await axios.get(`${URL_API}/femsa/tomapedidos`);
    return response.data;
}