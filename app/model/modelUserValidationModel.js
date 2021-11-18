const Joi = require('joi');

module.exports = {
	//Se valida el inicio de sesión
	loginModel: Joi.object().keys(
		{
			email: Joi.string().email().required(),
			role: Joi.string().alphanum().required(),
			password: Joi.string().regex(/^[a-zA-Z0-9]{4,16}$/).min(4).required(50)
		}).with('email', 'password'),

	//Se valida el registro	
	registerModel: Joi.object().keys(
		{
			names: Joi.string().regex(/^[a-zA-Z\s]*$/).min(4).max(20).required(),
			last_names: Joi.string().regex(/^[a-zA-Z\s]*$/).min(4).max(20).required(),
			email: Joi.string().email().required(),
			userName: Joi.string().alphanum().min(4).max(20).required(),
			phone_number: Joi.string().length(10).required(),
			password: Joi.string().regex(/^[a-zA-Z0-9]{4,16}$/).min(4).max(20).required(),
            active: Joi.string().min(1).max(1).required(),
            role: Joi.string().min(4).max(10).required()
		}).with('userName', 'password'),

		//Se valida los cambios de contraseña
        changePassInfo: Joi.object().keys(
            {
            id_user:Joi.string().min(1).max(2).required(),
            password: Joi.string().regex(/^[a-zA-Z0-9]{4,16}$/).min(4).max(20).required(),
        }).with('id_user', 'password')    
};