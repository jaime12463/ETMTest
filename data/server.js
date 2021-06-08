const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = 4000;

server.use(middlewares);

server.get("/femsa/tomapedidos", (req, res) => {
  const datos = router.db.get("datos").valueOf();
  res.jsonp(datos);
});

server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running in http://localhost:${PORT}`);
});
