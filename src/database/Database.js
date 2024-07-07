const {Pool} = require('pg');

class Database{
    constructor(){
        this.database = new Pool({
            host: 'localhost',
            port: 5432,
            user: 'postgres',
            password: 'senac',
            database: 'carrinho_compras'
        })
    }
}
module.exports = Database