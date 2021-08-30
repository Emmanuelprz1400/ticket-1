const Budget = require('../../db/db.budget.model');
const Period = require('../../db/db.period.model');
const Concept = require('../../db/db.concept.model');
const Income = require('../../db/db.income.model');
const DirectCost = require('../../db/db.directCost.model');
const AdminExpenses = require('../../db/db.adminexpenses.model');
const Resources = require('../../db/db.resources.model');

//Se crea el presupuesto y guardamos ID del presupuesto, donde recorre los meses, agrega el período  y el ingreso
module.exports.createBudget = async (budget)=>{
    try {
      const budgetC = await Budget.create({ proyect: budget.proyect, version: budget.version, active:1, id_user:budget.id_user });
        for (let p in budget.periods) {
            try {
              let periodsC = await Period.create({age: budget.periods[p].age, month: budget.periods[p].month, income: budget.periods[p].income, id_budget:budgetC.id_budget });               
               
            for (let i in budget.periods[p].incomes) {
                try {         
                  let incomeC = await Income.create({ value: budget.periods[p].incomes[i].value, id_date: periodsC.id_date , id_concept:'2' });
                } catch (error) {
                     throw new Error(error+' '+'error creating budget- model budget')         
                }
            }
            for (let i in budget.periods[p].direct_cost) {
              try{
                    let costD = await DirectCost.create({ value: budget.periods[p].direct_cost[i].value, id_date: periodsC.id_date , id_concept:'2' });
                } catch (error) {
                    throw new Error(error+' '+'error creating budget- model budget')         
               }
            }
            for (let i in budget.periods[p].admin_expenses) {
                try{
                    let expensesC = await AdminExpenses.create({ value: budget.periods[p].admin_expenses[i].value, id_date:periodsC.id_date , id_concept:'2' });
                } catch (error) {
                    throw new Error(error+' '+'error creating budget- model budget')          
               }
            }
            for (let i in budget.periods[p].resources) {
                try{
                    let resour = await Resources.create({role: budget.periods[p].resources[i].role  ,cost: budget.periods[p].resources[i].cost,percentage: budget.periods[p].resources[i].percentage , id_date:periodsC.id_date }); 
                } catch (error) {
                    throw new Error(error+' '+'error creating budget- model budget')      
               }  
                }
            } catch (error) {
                throw new Error(error+' '+'error creating budget- model budget')   
            }
        }
 
        return budgetC;
    } catch (error) {
        throw new Error('error creating budget- model budget');
    }
}

//Recuperación de presupuesto
module.exports.retrieveBudget = async (id_user) => {
	try {
		let budget = await Budget.findAll({
                        where: {
                        id_user:id_user,
                        active: 1
		        }
		});
       
		if (budget != null) {
			return budget;
		}
		throw new Error('Budget no longer exists or is inactive');
	} catch (error) {
        console.log(error)
		throw error;
	}
};

//Borra un presupuesto
module.exports.deleteBudget = async (param) => {
	try {
		let budget = await Budget.update({
			active: 0,
		}, {
			where: {
				id_user: param.id_user,
                                id_budget: param.id_budget
			}
		});
       
		if (budget != null) {
			return budget;
			
		}
		throw new Error('Budget no longer exists or is inactive');
	} catch (error) {
        console.log(error)
		throw error;
	}
};

//Creación de concepto
module.exports.createConcept = async (concept)=> { 
    try{
        let result = await Concept.create({
            name:concept.name
		})
        return result;

    }catch(err){
        console.log(err)
        throw new Error (err + 'problem in product models')
    }
}

//Obtener todo los conceptos
module.exports.getAllConcepts = async ()=> { 
    try{
        let result = await Concept.findAll()
        return result;

    }catch(err){
        console.log(err)
        throw new Error (err+ 'problem in product models')
    }
}

//Obtenemos los detalles de un presupuesto
module.exports.getBudgetDetails = async (budget)=> { 

    try{
        let result = await Budget.findAll({
			include: { model: Period, as: 'periods',include:[{model: Income, as: 'incomes'},
															 {model: AdminExpenses, as: 'adminExpenses'},
															 {model: DirectCost, as: 'direct_costs'},
															 {model: Resources, as: 'resources'}], where: {
				id_budget:budget
			  } }
		  })
		return result;
    }catch(err){
        console.log(err)
        throw new Error (err+ 'problem in product models')
    }
}