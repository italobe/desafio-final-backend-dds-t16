const joi = require('joi')
const validaInputCadastroPedidos = joi.object({
    cliente_id: joi.string().max(500).required().messages({
        'any.required': 'O campo cliente_id  é obrigatório ',
        'string.empty': 'O campo cliente_id  é obrigatório',
    }),
    pedido_produtos: joi.string().max(500).email().required().messages({
        'any.required': 'O campo pedido_produtos é obrigatório ',
        'string.empty': 'O campo pedido_produtos é obrigatório',
    })
})

module.exports = {
    validaInputCadastroPedidos
}