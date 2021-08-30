const Users = require('../../db/db.users.model');

//Recuperar usuario
module.exports.retrieveUser = async (user) => {
	try {
		let User = await Users.findOne({
			where: {
                email:user.email,
                password:user.password,
                active: 1
			}
		});
      
		if (User != null) {
			return User.dataValues;
		}
		throw new Error('User no longer exists or is inactive');
	} catch (error) {
        console.log(error)
		throw error;
	}
};

//Encontrar usuario existente
module.exports.UserExists = async (user) => {
	try {
		let exists = await Users.findOne({
			where: {
				email: user.email,
				password: user.password,
                role:  user.role,
				active: 1
				
			}

		});
		if (exists != null) {
			return true;
		}
		return false;
	} catch (error) {
		throw error;
	}
};

//Actualizar la contraseña
module.exports.updatePassword = async (user) => {
	try {
		let User = await Users.update({
			password: user.password,
		}, {
			where: {
				id_user: user.id_user,
			}
		});
       
		if (User != null) {
			return User;
			
		}
		throw new Error('User no longer exists or is inactive');
	} catch (error) {
        console.log(error)
		throw error;
	}
}

//Creación de usuario
module.exports.createUser = async (user) => {
	try {
		let User = await Users.create({
			names:user.names,
			last_names:user.last_names,
			email:user.email,
			userName:user.userName,
			password:user.password,
			phone_number:user.phone_number,
			active:user.active,
			role:user.role
		});
       
		if (User != null) {
			return User;			
		}
		throw new Error('User no longer exists or is inactive');
	} catch (error) {
        console.log(error)
		throw error;
	}
}