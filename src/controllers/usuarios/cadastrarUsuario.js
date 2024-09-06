const { knex } = require('../../connection/conexao')
const bcrypt = require('bcrypt')
const { validaInputEmail, validaInputNome, validaInputSenha } = require('../../validations/validaEmailSenhaUsuario')


const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {

        await validaInputEmail.validateAsync(req.body);
        await validaInputNome.validateAsync(req.body);
        await validaInputSenha.validateAsync(req.body);

    } catch (error) {
        return res.status(400).json(error.message)
    }


    try {
        const usuarioEncontrado = await knex('usuarios').where({ email }).first();



        if (usuarioEncontrado) {
            return res.status(400).json({
                mensagem: "O email já existe"
            })
        }

        const senhaCriprografada = await bcrypt.hash(senha, 10)

        const resultado = await knex('usuarios').insert({
            nome,
            email,
            senha: senhaCriprografada
        });


        return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso' })

    } catch (error) {
        return res.status(500).json(error.message)
    }
}



module.exports = {
    cadastrarUsuario
}