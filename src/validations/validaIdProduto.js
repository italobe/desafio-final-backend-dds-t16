const joi = require('joi')

const validaInputIdProduto = joi.object({
    id: joi.number().required().messages({
        'any.required': 'É preciso informar um numero de ID válido',
        'string.empty': 'É preciso informar um numero de ID válido',
        'number.base': 'É preciso informar um numero de ID válido'
    })
}).unknown(true);

module.exports = {
    validaInputIdProduto
}


