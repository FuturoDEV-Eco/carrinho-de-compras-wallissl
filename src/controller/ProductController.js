const Database = require('../database/Database')

class ProductController extends Database{


    async listarUm(request, response){

        try{

            const id = request.params.id
            const produto = await this.database.query(`
                select * from products
                where id = $1    
                `, [id]
            )

            if(produto.rowCount === 0){
                return response.status(404).json(
                    {mensagem: 'Produto não encontrado'}
                )
            }

            response.json(produto.rows[0])

        }catch(erro){
            response.status(500).json({mensagem: 'Não foi possível listar o produto!'})
        }
    }

    async listarProdutos(request, response){
        const dados = request.query

        if(dados.filtro){
            const campo = await this.database.query(`
                select * from products
                where
                name ilike $1
                or amount ilike $1
                or color ilike $1
                or voltage ilike $1
                or description ilike $1
                or category_id 
                `,
                [`%${dados.filtro}%`])
            response.json(campo.rows)
        }else{
            const dados = await this.database.query(`select * from products`);
            response.json(dados.rows)
        }
    }


    async cadastrar(request, response){

        try{

            const dados = request.body 

            if(!dados.name || !dados.amount || !dados.color || !dados.voltage || !dados.description || !dados.category_id){
                return response.status(400).json({
                    mensagem: 'Nome, quantidade, cor, voltagem, descrição e categoria são obrigatórios'
                })
            }

            const products = await this.database.query(
                `
                insert into products
                (name, amount, color, voltage, description, category_id)
                values
                ($1, $2, $3, $4, $5, $6)
                returning *
                `
                ,[dados.name, dados.amout, dados.color, dados.voltage, dados.description, dados.category_id]
                
            )

            response.status(201).json(products.rows[0])
            console.log(dados)

        }catch(erro){
            response.status(500).json({mensagem: 'Não foi possível cadastrar o serviço'})
        }
    }

    async atualizar(request, response){
        try{
            const dados = request.body 
            const id = request.params.id

            const dadosAtualizar = await this.database.query(`
                select * from products
                where id = $1
                `, [id])

            await this.database.query(
            `update products
            set name = $1,
            email = $2,
            cpf = $3,
            contact = $4 
            where id = $5`,
            [dados.name || dadosAtualizar.rows[0].name,
            dados.email || dadosAtualizar.rows[0].email,
            dados.cpf || dadosAtualizar.rows[0].cpf,
            dados.contact || dadosAtualizar.rows[0].contact,
            id])

        response.json({mensagem:'Dados do cliente atualizados com sucesso'})
        }catch(erro){
            response.json({mensagem: 'Não foi possível atualizar os dados do cliente!'})
        }
    }

    async deletar(request, response){
        try{
            const id = request.params.id
            const clientes = await this.database.query(`
                delete from products
                where id = $1`,
            [id])

            if(clientes.rowCount === 0){
                return response.status(404).json({mensagem: 'Não foi possível encontrar o id'})
            }

            response.status(204).json({mensagem: 'Cliente deletado com sucesso!'});
        }catch(error){
            response.status(500).json({mensagem: 'Não foi possível deletar o cliente'})
        }
    }

}
module.exports = new ProductController()