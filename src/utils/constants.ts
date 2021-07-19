export const URL_API: string =
  process.env.REACT_APP_API_URL ?? "http://localhost:4000";

export enum EstadosDeUnPedido {
  Cancelado = "CANCELADO",
  Activo = "ACTIVO",
}