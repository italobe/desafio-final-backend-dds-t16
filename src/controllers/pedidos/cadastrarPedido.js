const { knex } = require('../../connection/conexao')
const { validaIdToken } = require('../../services/auxiliarValidacoes/validaIdToken')

const { validaInputCadastroPedidos } = require('../../validations/validaCamposPedido')



const cadastrarPedido = async (req, res) => {
    const { cliente_id, observacao, pedido_produtos } = req.body

    try {

        const authorization = req.headers
        const idUsuarioToken = validaIdToken(authorization.authorization);
        await validaInputCadastroPedidos.validateAsync(req.body);

    } catch (error) {
        return res.status(400).json(error.message)

    }

    try {
        const cliente_idEncontrado = await knex('clientes').where({ cliente_id }).first();

        if (!cliente_idEncontrado) {
            return res.status(400).json({
                mensagem: "O cliente não foi cadastrado cadastrado"
            })
        }

        const pedidoFeito = await knex('pedidos').insert({
            cliente_id,
            observacao,
            valor_total: 0
        });

        // FALTA PEGAR O PEDIDO ID PARA INSERIR NOS PEDIDOS DOS PRODUTOS

        let soma = 0;

        for (let pedido of pedido_produtos) {

            let { quantidade_produto, produto_id } = pedido

            if (!quantidade_produto || !produto_id) {
                return res.status(400).json({
                    mensagem: "O produto e a quantidade precisam ser lançados"
                })
            }

            // FALTA PUXAR DO BANCO O VALOR DO PRODUTO PARA UTILIZAR NA FORMULA

            soma = soma + (quantidade_produto * valor_produto);



            await knex('pedido_produtos').insert({
                quantidade_produto,
                valor_produto,
                pedido_id,
                produto_id,
            });


        }

        //FAZER UPDATE NO VALOR TOTAL COM O "SOMA"






        return res.status(201).json({ mensagem: 'Pedido cadastrado com sucesso' })

    } catch (error) {
        console.log(error)
        return res.status(500).json(error.message)
    }
}



module.exports = {
    cadastrarPedido
}