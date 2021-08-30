const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const midd = require('../middlewares/middlewares');
chai.use(chaiHttp);
const url = 'http://127.0.0.1:3000';

//Testeo del middleware en la ruta usuario
describe('Given an invalid register user data', () => {
	it('when passing by register middleware should return 400 status', (done) => {
		chai.request(url)
			.post('/user')
			.send(
				{
                    names:"Emmanuel",
                    last_names:"Pérez",
                    userName:"emmaprz",
                    email:"emmanuelprz17@gmail.com",
                    password:"prueba1234",
                    phone_number:"5512345678",
                    active:1,
                    role:"user"
				}
			).end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
});

//Requiere autentificación el inicio de sesión
describe('Given an malformed login data', () => {
	it('when passing by login middleware should return 400 status', (done) => {
		chai.request(url)
			.post('/users/login')
			.send(
				{
					"email": "emmanuelprz17@gmail.com",
                    "password": "prueba1234",
                    "role": "user"
                 }
			).end((err, res) => {
				expect(res).to.have.status(400);
				done();
			});
	});
});
