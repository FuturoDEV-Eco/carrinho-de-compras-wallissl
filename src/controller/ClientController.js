const Database = require('../database/Database')

class ClientController extends Database{


    async listarUm(request, response){

        try{

            const id = request.params.id
            const cliente = await this.database.query(`
                select * from clients
                where id = $1    
                `, [id]
            )

            if(cliente.rowCount === 0){
                return response.status(404).json(
                    {mensagem: 'Cliente não encontrado'}
                )
            }

            response.json(cliente.rows[0])

        }catch(erro){
            response.status(500).json({mensagem: 'Não foi possível listar o cliente!'})
        }
    }

    async listarClientes(request, response){
        const dados = request.query

        if(dados.filtro){
            const campo = await this.database.query(`
                select * from clients
                where
                name ilike $1
                or email ilike $1
                or cpf ilike $1
                or contact ilike $1
                `,
                [`%${dados.filtro}%`])
            response.json(campo.rows)
        }else{
            const dados = await this.database.query(`select * from clients`);
            response.json(dados.rows)
        }
    }


    async cadastrar(request, response){

        try{

            const dados = request.body 

            if(!dados.name || !dados.email || !dados.cpf || !dados.contact){
                return response.status(400).json({
                    mensagem: 'Nome, email, cpf e contatos, são dados obrigatórios'
                })
            }

            const clients = await this.database.query(
                `
                insert into clients
                (name, email, cpf, contact)
                values
                ($1, $2, $3, $4)
                returning *
                `
                ,[dados.name, dados.email, dados.cpf, dados.contact]
                
            )

            response.status(201).json(clients.rows[0])
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
                select * from clients
                where id = $1
                `, [id])

            await this.database.query(
            `update clients
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
                delete from clients
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
module.exports = new ClientController()