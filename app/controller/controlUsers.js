const modelUsers = require ('../model/modelUsers');
const jwt = require('jsonwebtoken');

//Recuperar un usuario
module.exports.retrieveUser = async (user) =>{
    try {
        const result = await modelUsers.retrieveUser(user);
        return result;
    } catch (error) {
        console.log(error)
        throw  Error (error)      
    }
}

//Actualizar un usuario
module.exports.updatePassword = async (user) =>{
    try {
        const result = await modelUsers.updatePassword(user);
        return result;
    } catch (error) {
        console.log(error)
        throw  Error (error)      
    }
}

//Validar un usuario
module.exports.validateUser = async (usr) => {
	try {
		const ok = await modelUsers.UserExists(usr);
		if (ok) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		throw error;
	}
};

//Generar el token
module.exports.generateUserToken = async (user) => {
	const token = jwt.sign(
		{ data: user },
		process.env.SECRET_KEY
	);
	return token;
};

//Verifcar el token del usuario
module.exports.verifyUserToken = async (token) => {
	try {
		const decodedUser = jwt.verify(token, process.env.SECRET_KEY);
		if (decodedUser) {
			return decodedUser;
		}
	} catch (error) {
		throw error;
	}
};

//Crear un usuario
module.exports.createUser = async (user) => {
	try {
        const result = await modelUsers.createUser(user);
        return result;
    } catch (error) {
        console.log(error)
        throw  Error (error)      
    }
};