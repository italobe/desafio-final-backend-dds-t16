const { knex } = require('../../connection/conexao');
const { validaIdToken } = require('../../services/auxiliarValidacoes/validaIdToken');





const listarPedidos = async (req, res) => {
    try {

        const authorization = req.headers
        const idUsuarioToken = validaIdToken(authorization.authorization);


    } catch (error) {
        console.log(error)
        return res.status(400).json(error.message)

    }
    try {

        const pedidos_produtos = await knex('pedido_produtos').select('*');
        const pedidos = await knex('pedidos').select('*');

        return res.status(200).json([{ pedidos, pedidos_produtos }]);

    } catch (error) {

        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}


module.exports = { listarPedidos }
