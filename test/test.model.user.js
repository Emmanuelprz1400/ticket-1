const expect = require('chai').expect;
const modelsUsers = require('../app/model/modelUsers');

//Declaración del testeo usuario
describe('Given a user object', () => {
	let user = {
		id_user:3,
        names:"Emmanuel",
        last_names:"Perez",
        userName:"Emmaprz",
        email:"emmanuelprz@admin.com",
        password:"prueba1234",
        phone_number:"5512345678",
        active:"1",
        role:"user"
	};
	describe('with missing id_user, email or password field', async () => {
		it('should get error when passing by createUser function', async () => {
			try {
				let result = await modelsUsers.createUser(user);
			} catch (error) {
				expect(error.message).to.be.equals('WHERE parameter "user.params" has invalid "undefined" value');
			}
		});
		it('should get error when passing by retrieveUser function', async () => {
			try {
				let result = await modelsUsers.retrieveUser(user);
			} catch (error) {
				expect(error.message).to.be.equals('WHERE parameter "id_user" has invalid "undefined" value');
			}
		});
		it('should get error when passing by UserExists function', async () => {
			try {
				let result = await modelsUsers.UserExists(user);
			} catch (error) {
				expect(error.message).to.be.equals('WHERE parameter "id_user" has invalid "undefined" value');
			}
		});
		it('should get error when passing by updatePassword function', async () => {
			try {
				let result = await modelsUsers.updatePassword(user);
			} catch (error) {
				expect(error.message).to.be.equals('WHERE parameter "id_user" has invalid "undefined" value');
			}
		});
	});
});
