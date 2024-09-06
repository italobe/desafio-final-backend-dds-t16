const { knex } = require('../../connection/conexao')

const listarProduto = async (req, res) => {
    try {

        const produto = await knex('produtos').select('*');

        return res.status(200).json(produto);

    } catch (error) {

        return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }
}


module.exports = { listarProduto }
