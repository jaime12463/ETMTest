import axios from "axios";

const baseURL = "./data"

export const obtenerDB = () => axios.get(`${baseURL}/precios_cliente.json`);