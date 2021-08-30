const fetch = require('node-fetch');

module.exports = async (app) => {

    //Ruta madre
    app.get('/', async (req, res) =>{
        try {
             res.render("index")
        } catch (error) {
            res.status(500).json('error in the request rutes budgets')
        }
     });

     //Ruta para creación de un nuevo presupuesto
     app.get('/newBudget', async (req, res) =>{
        try {
             res.render("budget")
        } catch (error) {
            res.status(500).json('error in the request rutes budgets')
        }
     });

     //Ruta para editar un presupuesto
     app.get('/editBudget', async (req, res) =>{
        try {
             res.render("editBudget")
        } catch (error) {
            res.status(500).json('error in the request rutes budgets')
        }
     });
}