const joi = require('joi')

const validaInputIdCliente = joi.object({
    id: joi.number().required().messages({
        'any.required': 'É preciso informar um numero de ID de Cliente válido',
        'string.empty': 'É preciso informar um numero de ID de Cliente válido',
        'number.base': 'É preciso informar um numero de ID de Cliente válido'
    })
}).unknown(true);

module.exports = {
    validaInputIdCliente
}


