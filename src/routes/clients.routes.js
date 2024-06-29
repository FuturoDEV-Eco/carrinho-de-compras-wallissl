const {Router} = require('express');
const ClientController = require('../controller/ClientController')

const clientsRoutes = new Router();

clientsRoutes.get("/:id", ClientController.listarUm.bind(ClientController))

clientsRoutes.get("/", ClientController.listarClientes.bind(ClientController));

clientsRoutes.post("/", ClientController.cadastrar.bind(ClientController));

clientsRoutes.put("/:id", ClientController.atualizar.bind(ClientController));

clientsRoutes.delete("/:id", ClientController.deletar.bind(ClientController));


module.exports = clientsRoutes;