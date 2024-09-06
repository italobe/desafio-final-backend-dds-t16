const multer = require('../../middlewares/multer')
const aws = require('aws-sdk')
const { uploadArquivos } = require('../../services/auxiliarArquivos/uploadArquivo')
const { validaInputIdProduto } = require('../../validations/validaIdProduto')
const { knex } = require('../../connection/conexao')


const adicionarImagem = async (req, res) => {

    const a = a

    return req.status(200).json(a)

}

module.exports = {
    adicionarImagem
}