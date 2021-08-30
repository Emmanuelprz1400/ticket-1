const expect = require('chai').expect;
const modelsBudget= require('../app/model/modelBudgets');

//Declaración del testeo presupuesto 
describe('Given a budget object', () => {
    let id_user = 1;
    let id_budget = 2;
    let Budget = {
        "proyect": "Tienda online",
        "version": "1.0.0",
        "id_user": "1",
        "periods": [
          {
            "date": "2021-02",
            "income": "2500",
            "incomes":[
                {
                "value":"3500",
                "id_concept":"2"
            },{
                "value":"3500",
                "id_concept":"2"
            }
            ],
             "direct_cost":[
                {
                "value":"3500",
                "id_concept":"2"
            },{
                "value":"3500",
                "id_concept":"2"
            }
            ],
             "admin_expenses":[
                {
                "value":"5660",
                "id_concept":"2"
            },{
                "value":"5660",
                "id_concept":"2"
            }
            ], 
            "resources":[
                {
                "role":"rol 1",
                "cost":"5660",
                "percentage":"50"
            },{
                "role":"rol 2",
                 "cost":"5660",
                "percentage":"10"
                 }
             ]
          },
          {
            "date": "2021-02",
            "income": "2800",
            "incomes":[
                {
                "value":"5660",
                "id_concept":"2"
            },{
                "value":"5660",
                "id_concept":"2"
            }
            ],
              "direct_cost":[
                {
                "value":"5895",
                "id_concept":"2"
            },{
                "value":"5895",
                "id_concept":"2"
            }
            ],
             "admin_expenses":[
                {
                "value":"5895",
                "id_concept":"2"
            },{
                "value":"5895",
                "id_concept":"2"
            }
            ],
              "resources":[
                {
                "role":"rol 1",
                "cost":"5660",
                "percentage":"50"
            },{
                "role":"rol 2",
                 "cost":"5660",
                "percentage":"10"
                 }
             ]
            }
        ]
    }
	describe('with missing orid_user field or error in the parameters', async () => {
		it('should get error when passing by createBudget function', async () => {
			try {
				let result = await modelsBudget.createBudget(Budget);
			} catch (error) {
				expect(error.message).to.be.equals('WHERE parameter "Budget" has invalid "undefined" value');
			}
		});
        it('should get error when passing by retrieveBudget function', async () => {
			try {
				let result = await modelsBudget.retrieveBudget(id_user);
			} catch (error) {
				expect(error.message).to.be.equals('WHERE parameter "id_user" has invalid "undefined" value');
			}
		});
        it('should get error when passing by deleteBudget function', async () => {
			try {
				let result = await modelsBudget.deleteBudget(id_user);
			} catch (error) {
				expect(error.message).to.be.equals('WHERE parameter "id_user" has invalid "undefined" value');
			}
		});
        it('should get error when passing by getAllConcepts function', async () => {
			try {
				let result = await modelsBudget.getAllConcepts();
			} catch (error) {
				expect(error.message).to.be.equals('the request could not be completed');
			}
		});
        it('should get error when passing by getBudgetDetails function', async () => {
			try {
				let result = await modelsBudget.getBudgetDetails(id_budget);
			} catch (error) {
				expect(error.message).to.be.equals('WHERE parameter "id_budget" has invalid "undefined" value');
			}
		});
	});
});