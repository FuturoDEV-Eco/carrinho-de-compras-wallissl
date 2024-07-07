const Database = require('../database/Database')

class PedidoController extends Database{


    async criar(request, response) {
        try {
            const dados = request.body;
            let total = 0;

            for (const item of dados.products) {
                const produtoAtual = await this.database.query(`
                    SELECT price FROM products
                    WHERE id = $1
                `, [item.product_id]);

                total += produtoAtual.rows[0].price * item.amount;
            }

            response.json({ total });

            const meuPedido = await this.database.query(`
                INSERT into orders (client_id, address, observations, total)
                values ($1, $2, $3, $4)
                returning *
                `,[dados.client_id, dados.address, dados.observations, total])

                dados.products.forEach(async item => {
                    const produtoAtual = await this.database.query(`
                        SELECT price from products
                        where id = $1
                        `, [item.product_id])

                    this.database.query(`
                        INSERT into orders_items (order_id, product_id, amount, price)
                        values ($1, $2, $3, $4)
                        returning *
                        `, [
                            meuPedido.rows[0].id,
                            item.product_id,
                            item.amount,
                            produtoAtual.rows[0].price
                        ])
                })

        } catch (erro) {
            response.status(500).json({ mensagem: 'Não foi possível criar o pedido!' });
        }
    }

}
module.exports = new PedidoController()