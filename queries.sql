/*Uso de la DB budget_system*/
USE [budget_system]
GO

SELECT * FROM periods

SELECT * FROM budgets
WHERE id_user = 1 and active =1
GO

SELECT * FROM adminExpenses

SELECT * FROM concepts

SELECT * FROM periods

SELECT * FROM users

SELECT * FROM incomes

SELECT * FROM direct_costs

SELECT * FROM budgets

SELECT * FROM resources

/*Presupuestos por usuario*/
SELECT users.userName, budgets.proyect, budgets.createdAt, budgets.version, budgets.id_budget
FROM users
INNER JOIN budgets ON users.id_user = budgets.id_user
where users.id_user =1 




