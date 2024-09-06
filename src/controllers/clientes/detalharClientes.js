const { knex } = require('../../connection/conexao')
const { validaInputIdCliente } = require('../../validations/validaIdCliente');



const detalharCliente = async (req, res) => {

    const { id } = req.params

    try {
        await validaInputIdCliente.validateAsync(req.params);
    } catch (error) {
        return req.status(400).json(error.message)
    }

    try {

        const detalheCliente = await knex('usuarios').select('id', 'nome', 'email').where('id', id)
        return res.json(detalheCliente[0])


    } catch (error) {
        return res.status(500).json(error.message)
    }
}


module.exports = {
    detalharCliente
}