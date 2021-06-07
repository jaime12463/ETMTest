const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = 4000;

server.use(middlewares);

/**
 * Endpoint que recibe los parámetros
 * @param fecha: Tipo de Dato Fecha.
 * @param ruta: Código de ruta.
 * @param usuario: Código de usuario.
 */
server.get("/femsa/tomapedidos", (req, res) => {
  const datos = router.db.get("datos").valueOf();

  const { fecha, ruta, usuario } = req.query;

  console.log("Parámetros de entrada ", fecha, ruta, usuario);

  res.jsonp(datos);
});

server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running in http://localhost:${PORT}`);
});
