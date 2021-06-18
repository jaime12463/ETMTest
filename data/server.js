const jsonServer = require("json-server");
const server = jsonServer.create();
const jsonDB = jsonServer.router("db.json");
const jsonConfiguracion = jsonServer.router("configuracion.json");
const middlewares = jsonServer.defaults();
const obtenerJsonConHash = require("./transformacionJson.js");

const PORT = 4000;

server.use(middlewares);

server.get("/femsa/tomapedidos", (req, res) => {
  const datos = jsonDB.db.valueOf();
  res.jsonp(obtenerJsonConHash.obtenerJsonConHash(datos));
});

server.get("/femsa/configuracion", (req, res) => {
  const datos = jsonConfiguracion.db.get("datos").valueOf();
  res.jsonp(datos);
});

server.use(jsonDB);
server.use(jsonConfiguracion);
server.listen(PORT, () => {
  console.log(`JSON Server is running in http://localhost:${PORT}`);
});
