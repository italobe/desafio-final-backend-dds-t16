const { knex } = require('../../connection/conexao');
const { excluirArquivo } = require('../../services/auxiliarArquivos/excluirArquivo');
const { validaInputIdProduto } = require('../../validations/validaIdProduto');


const excluirProduto = async (req, res) => {
    const { id } = req.params



    try {
        await validaInputIdProduto.validateAsync(req.params);

        const localizaProduto = await knex('produtos').select('*').where('id', id)

        if (localizaProduto.length < 1) {
            return res.status(400).json({
                mensagem: "O Produto não está cadastrado"
            })
        }

        if (localizaProduto[0].imagem_url !== undefined) {

            const url = new URL(localizaProduto[0].imagem_url)
            const path = url.pathname.substring(1)

            await excluirArquivo(path)

        }

        const deletar = await knex('produtos').where('id', id).delete()


        return res.status(201).json({ mensagem: 'Produto Excluído com sucesso' })

    } catch (error) {
        return res.status(500).json(error.message)
    }
}



module.exports = {
    excluirProduto
}
