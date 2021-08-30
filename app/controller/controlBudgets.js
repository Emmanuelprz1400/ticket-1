const modelBudgets = require ('../model/modelBudgets');

//Creación de un presupuesto
module.exports.createBudget = async (budget) =>{
    try {
        const result = await modelBudgets.createBudget(budget);
        return result;
    } catch (error) {
        throw new Error ('budgets controller error')      
    }
}

//Recuperar de un presupuesto
module.exports.retrieveBudget = async (id_user) =>{
    try {
        const result = await modelBudgets.retrieveBudget(id_user);
        return result;
    } catch (error) {
        throw new Error ('budgets controller error')      
    }
}

//Borrar de un presupuesto
module.exports.deleteBudget = async (param) =>{
    try {
        const result = await modelBudgets.deleteBudget(param);
        return result;
    } catch (error) {
        throw new Error ('budgets controller error')      
    }
}

//Creación un concepto
module.exports.createConcept = async (concept) =>{
    try {
        const result = await modelBudgets.createConcept(concept);
        return result;
    } catch (error) {
        throw new Error ('budgets controller error')      
    }
}

//Obtener todos los conceptos
module.exports.getAllConcepts = async () =>{
    try {
        const result = await modelBudgets.getAllConcepts();
        return result;
    } catch (error) {
        throw new Error ('budgets controller error')      
    }
}

//Obtener los detalles de un presupuesto
module.exports.getBudgetDetails = async (budget) =>{
    try {
        const result = await modelBudgets.getBudgetDetails(budget);
        return result;
    } catch (error) {
        throw new Error ('budgets controller error')      
    }
}