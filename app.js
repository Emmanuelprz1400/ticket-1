//Modulos requeridos
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const middlewares = require('./middlewares/middlewares');

//Importación DB
const db = require('./db/db.connection');
const Budget = require('./db/db.budget.model');
const Period = require('./db/db.period.model');
const Concept = require('./db/db.concept.model');
const Income = require('./db/db.income.model');
const DirectCost = require('./db/db.directCost.model');
const AdminExpenses = require('./db/db.adminexpenses.model');
const Resources = require('./db/db.resources.model');
const Users =  require('./db/db.users.model')

const viewsRutes = require('./routes/routes');
const viewBudgets =  require ('./app/view/view.budget');
const viewUsers =  require ('./app/view/view.users');

const bodyParser = require('body-parser');

//Utilización de middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Middlewares globales
app.use(cors());
app.use(express.json());
app.use(middlewares.limiter);

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//Iniciar el servidor
async function startServer(){
    try {
        await Users.sync({ alter: true });
        await Budget.sync({ alter: true });
        await Period.sync({ alter: true });
        await Concept.sync({ alter: true });
        await AdminExpenses.sync({ alter: true });
        await Income.sync({ alter: true });
        await DirectCost.sync({ alter: true });
        await Resources.sync({ alter: true });
       
        
        await db.authenticate();
        console.log('Conected to Database'); 
        app.listen(process.env.PORT, process.env.HOST, () =>{ 
            console.log(`Server started at http://${process.env.HOST}:${process.env.PORT}`);
        });
    } catch (error) {
        console.error('Conection to Database failed: ' + error.message);
    }
}
startServer();

//Iniciar rutas del las API
viewsRutes(app);
viewBudgets(app);
viewUsers(app);