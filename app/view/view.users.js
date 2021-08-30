const controlUsers = require('../controller/controlUsers');
const middlewares = require('../../middlewares/middlewares');

module.exports = async (app)=>{

    //Validación de usuario y obtención de token
    app.post('/user/login', middlewares.validateLoginInfo, async (req, res) => {
		let user = req.body;
		try {
            console.log(req.body)
			const ok = await controlUsers.validateUser(user);
			if (ok) {
				let sessionToken = await controlUsers.generateUserToken(user);
				res.json(sessionToken);
			} else
				throw new Error("Invalid user, if deactivated please contact adminsitrator to reactivate it");
		} catch (error) {
			console.log('error: ' + error.message);
			res.status(400).send(error.message);
		}
	});

	//Obtener los datos del usuario
	app.get('/user', middlewares.validateToken, async (req, res) =>{
        try {
			let user = await controlUsers.retrieveUser(req.params.user);
			res.status(200).json(user);
        } catch (error) {
            res.status(500).json('error in the request views user or authentication fails')
        }
     });

	 //Actualización de contraseña
	 app.post('/user/pass', middlewares.validateToken,middlewares.chamgePassInfor, async (req, res) =>{
        try {
			let ok = await controlUsers.updatePassword(req.body);
			if(ok){
				res.status(200).json('password changed !');
			}
        } catch (error) { 
            res.status(500).json('error in the request views user')
        }
     });

	//Validar la creación de usuario
	 app.post('/user',middlewares.validateRegisterInfo, async (req, res) =>{
        try {
			let user = await controlUsers.createUser(req.body);
			res.status(200).json(user);
        } catch (error) {
            res.status(500).json('error in the request views user')
        }
     });
}