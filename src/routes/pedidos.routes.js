const {Router} = require('express');
const PedidoController = require('../controller/PedidoController')

const pedidosRoutes = new Router();

/* clientsRoutes.get("/:id", ClientController.listarUm.bind(ClientController))

clientsRoutes.get("/", ClientController.listarClientes.bind(ClientController));

clientsRoutes.post("/", ClientController.cadastrar.bind(ClientController));

clientsRoutes.put("/:id", ClientController.atualizar.bind(ClientController));

clientsRoutes.delete("/:id", ClientController.deletar.bind(ClientController)); */

pedidosRoutes.post("/", PedidoController.criar.bind(PedidoController))


module.exports = pedidosRoutes;