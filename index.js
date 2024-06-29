const express = require('express');
const app = express()

const clientsRoutes = require('./src/routes/clients.routes');


app.use(express.json())
app.use('/clients',clientsRoutes)


app.listen(3000, () => { console.log("servidor online")})