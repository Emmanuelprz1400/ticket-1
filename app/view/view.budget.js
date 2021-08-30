const controlBudgets = require('../controller/controlBudgets');
const middlewares = require('../../middlewares/middlewares');

module.exports = async (app)=>{

    //Creación de nuevo presupuesto
    app.post('/budget',middlewares.validateToken, async (req, res) =>{
        try {
            let result = await controlBudgets.createBudget(req.body)
            res.json(result);
        } catch (error) {
            res.status(500).json('error in the request rutes budgets')
        }
     });

     //Obtener los presupuestos para cada uso
     app.get('/budget/:id_user', middlewares.validateToken, async (req, res) =>{
        let id_user = req.params.id_user
        try {
            let result = await controlBudgets.retrieveBudget(id_user);
			res.status(200).json(result);
        } catch (error) {
            res.status(500).json('error in the request rutes budgets')
        }
     });

     //Eliminar el presupuesto
     app.post('/delete', middlewares.validateToken, async (req, res) =>{
        try {
            let ok = await controlBudgets.deleteBudget(req.body);
			if(ok){
                res.status(200).json('Budget deleted !');
            }
        } catch (error) {
            res.status(500).json('error in the request rutes budgets')
        }
     });

     //Creación de concepto
     app.post('/concept', middlewares.validateToken, async (req, res) =>{
        try {
			let ok = await controlBudgets.createConcept(req.body);
			if(ok){
				res.status(200).json(ok);
			}
        } catch (error) { 
            res.status(500).json('error in the request views budgets')
        }
     });

     //Validación del token
     app.get('/concepts', middlewares.validateToken, async (req, res) =>{
        try {
			let ok = await controlBudgets.getAllConcepts();
			if(ok){
				res.status(200).json(ok);
			}
        } catch (error) { 
            res.status(500).json('error in the request views budgets')
        }
     });

     //Obtener los detalles de cada presupuesto
     app.get('/budget/detail/:id_budget', middlewares.validateToken, async (req, res) =>{
        try {
			let ok = await controlBudgets.getBudgetDetails(req.params.id_budget);
			if(ok){
				res.status(200).json(ok);
			}
        } catch (error) { 
            res.status(500).json('error in the request views budgets')
        }
     });
}