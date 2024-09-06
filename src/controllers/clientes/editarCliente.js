const { knex } = require('../../connection/conexao')
const bcrypt = require('bcrypt')
const { validaIdToken } = require('../../services/auxiliarValidacoes/validaIdToken')
const { validaInputAtualizaClientes } = require('../../validations/validaCamposCliente')
const { validaInputIdCliente } = require('../../validations/validaIdCliente')


const editarCliente = async (req, res) => {
    const { nome, email, cpf,
        cep, rua, numero, bairro
        , cidade, estado } = req.body

    const { id } = req.params

    try {

        await validaInputAtualizaClientes.validateAsync(req.body);
        await validaInputIdCliente.validateAsync(req.params)


        const encontraCliente = await knex('clientes').where({ id }).first();
        if (encontraCliente === undefined) {
            return res.status(400).json({
                mensagem: "O campo id do produto precisa ser válido"
            })
        }


        if (email !== undefined) {
            const encontraEmail = await knex('clientes').select('email').where('email', email).first();
            if (encontraEmail !== undefined && encontraEmail.email === email) {
                return res.status(400).json({
                    mensagem: "O email já cadastrado"
                })
            }
        }

        if (cpf !== undefined) {
            const encontraCpf = await knex('clientes').select('cpf').where('cpf', cpf).first();
            if (encontraCpf !== undefined && encontraCpf.cpf === cpf) {
                return res.status(400).json({
                    mensagem: "O cpf já cadastrado"
                })
            }
        }



        if (nome) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    nome
                });

        }

        if (email) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    email
                });

        }

        if (cpf) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    cpf
                });

        }

        if (cep) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    cep
                });

        }

        if (rua) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    rua
                });

        }

        if (numero) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    numero
                });

        }

        if (bairro) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    bairro
                });

        }

        if (cidade) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    cidade
                });

        }

        if (estado) {
            const atualizacaoUsuario = await knex('clientes')
                .where('id', id)
                .update({
                    estado
                });

        }


        const resultado = await knex('clientes')
            .select('*')
            .where('id', id);


        return res.status(200).json({ mensagem: "Dados atualizados" })


    } catch (error) {
        console.log(error)
        return res.status(500).json(error.message)
    }
}


module.exports = {
    editarCliente
}