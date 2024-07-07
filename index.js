const express = require('express');
const app = express()

const clientsRoutes = require('./src/routes/clients.routes');
const productsRoutes = require('./src/routes/products.routes');


app.use(express.json())
app.use('/clients',clientsRoutes)
app.use('/products',productsRoutes)


app.listen(3000, () => { console.log("servidor online")})