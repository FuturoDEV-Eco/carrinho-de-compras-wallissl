const {Router} = require('express');
const ProductController = require('../controller/ProductController')

const productsRoutes = new Router();

productsRoutes.get("/:id", ProductController.listarUm.bind(ProductController))

productsRoutes.get("/", ProductController.listarProdutos.bind(ProductController));

productsRoutes.post("/", ProductController.cadastrar.bind(ProductController));

productsRoutes.put("/:id", ProductController.atualizar.bind(ProductController));

productsRoutes.delete("/:id", ProductController.deletar.bind(ProductController));


module.exports = productsRoutes;