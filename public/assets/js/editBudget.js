var budget;
var dataSession
//Traer los datos de un usuario con token
window.onload = async function (){
    try {
      dataSession=  await JSON.parse(sessionStorage.getItem('dataSession'))
     if (sessionStorage['dataSession'] && dataSession.role==="user"){
        try {
        let result = await fetch('http://localhost:3000/user', {
         method: 'get',
         headers: {
             'Accept': 'application/json, text/plain, */*',
             'Content-Type': 'application/json',
             'Authorization': 'Bearer ' + dataSession.token
           }
     })

     const dataUser = await result.json();
         budget= new Budget(dataUser);
         await initBudgetUser();
         getResumeFin();
     } catch (error) {
        console.log(error)     
     }
     }else{
         location.href = '/login.html'
     }} catch (error) {  
         console.log(error)   
     } 
 }

//Inicar clase de presupuestos
class Budget{
    constructor(dataUser){
        this.cont=0;
        this.monthInit;
        this.anio;
        this.period=[]
        this.direct_cost=[]
        this.incomes=[]
        this.resources=[]
        this.admin_expens=[]
        this.dataUser=dataUser;
    }
    
}

var  months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

let addcol = document.getElementById('addcol')
let initBud = document.getElementById('initBud')
let addIncome = document.getElementById('addincome')

//Agrega columna mes y desHabilita el de mes inicial
addcol.addEventListener('click', async ()=> {
    createColumnMonth()
    createColumnMonthRes()
    createColMonthIncome()
    this.cont++
    this.monthInit++
    if(this.monthInit>11){
        this.monthInit=0
        this.anio++
    }
})

//Obtención de datos del presupuesto
async function initBudgetUser(){
    let dataBuget;
    var loc = document.location.href;
    if(loc.indexOf('?')>0)
    {
        var id_budget = loc.split('?')[1];
    }
    try {
        let result = await fetch(`http://127.0.0.1:3000/budget/detail/${id_budget}`, {
            method: 'get',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  dataSession.token
              }
        })
        dataBuget = await result.json();
        document.getElementById('nameProyect').value=dataBuget[0].proyect
        document.getElementById('version').value=dataBuget[0].version
        document.getElementById('dateCreate').value=dataBuget[0].createdAt
        this.periods =dataBuget[0].periods //agrega periodos a la clase
        
    } catch (error) {
        console.log(error)
    }
}

//Calcula las ventas
function getResumeFin(){
    let ventas = 0
    let costos=0
    for(let p in this.periods){
        for(i in this.periods[p].incomes){  
               ventas =+ parseFloat(this.periods[p].incomes[i].value )
        }
        costos=+ createColumnPeriodEgre(this.periods[p].direct_costs,this.periods[p].adminExpenses,this.periods[p].incomes,this.periods[p])
    }
    document.getElementById('per').appendChild(document.createTextNode(((ventas-costos)/ventas*100).toFixed(2)))
    document.getElementById('margin').appendChild(document.createTextNode(Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(ventas-costos)))
    document.getElementById('sales').appendChild(document.createTextNode(Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(ventas)))
    document.getElementById('expenses').appendChild(document.createTextNode(Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(costos)))
}
 addincome.addEventListener('click', async ()=> {
    let inc=0
    let t_ING= document.getElementById('T_ING');
    let tr= document.createElement("tr")
    tr.setAttribute('id',`I${inc}`);
    let tdc= document.createElement('td')
    let tdb= document.createElement('td')
    tdc.appendChild(document.createTextNode('concepto'))
    tr.appendChild(tdc);
    
    let butDel=document.createElement('button');
    butDel.classList.add("btn");
    butDel.classList.add("btn-danger");
    butDel.setAttribute("onclick", `deleteRowIcome('I${inc}')`);
    butDel.appendChild(document.createTextNode('Eliminar'))
    tdb.appendChild(butDel)


    for(var i = 0; i <  this.cont; i++){

    let tdi= document.createElement('td')
    tdi.setAttribute('contenteditable','true')
   
    tr.appendChild(tdi);
    tr.appendChild(tdb);
    t_ING.appendChild(tr);
    
    }
    inc++
})

function deleteRowIcome(id){
    deletNodeId(id);
}

//Crea columna de estado de resultados
function createColumnMonthRes(){
   
    let c= document.getElementById('EH').appendChild(document.createElement('th'))
    c.setAttribute("id", `EH${months[this.monthInit]}${this.anio}`);
    c.appendChild(document.createTextNode(months[this.monthInit]+' '+this.anio))
    document.getElementById('EV').appendChild(document.createElement('th')).setAttribute("id", `EV${months[this.monthInit]}${this.anio}`)
    document.getElementById('EC').appendChild(document.createElement('th')).setAttribute("id", `EC${months[this.monthInit]}${this.anio}`)
    document.getElementById('EM').appendChild(document.createElement('th')).setAttribute("id", `EM${months[this.monthInit]}${this.anio}`)
    document.getElementById('ES').appendChild(document.createElement('th')).setAttribute("id", `ES${months[this.monthInit]}${this.anio}`)
    
 }

 //Creación de columnas necesarias para el mes en dom
 function createColumnMonth(){

    let butDel=document.createElement('button');
    butDel.classList.add("btn");
    butDel.classList.add("btn-danger");
    butDel.setAttribute("id", `${months[this.monthInit]}${this.anio}`);
    butDel.setAttribute("onclick", `deleteColFlu(this.id)`);
    butDel.appendChild(document.createTextNode('Eliminar'))

    let c= document.getElementById('FH').appendChild(document.createElement('th'))
    c.setAttribute("id", `FH${months[this.monthInit]}${this.anio}`);
    c.appendChild(document.createTextNode(months[this.monthInit]+' '+this.anio))
    document.getElementById('FI').appendChild(document.createElement('th')).setAttribute("id", `FI${months[this.monthInit]}${this.anio}`)
    document.getElementById('FE').appendChild(document.createElement('th')).setAttribute("id", `FE${months[this.monthInit]}${this.anio}`)
    document.getElementById('FT').appendChild(document.createElement('th')).setAttribute("id", `FT${months[this.monthInit]}${this.anio}`)
    document.getElementById('FA').appendChild(document.createElement('th')).setAttribute("id", `FA${months[this.monthInit]}${this.anio}`)
    c=document.getElementById('FB').appendChild(document.createElement('th'))
    c.setAttribute("id", `FB${months[this.monthInit]}${this.anio}`)
    c.appendChild(butDel)

 }

 function deleteColFlu(idcol){
    deletNodeId(`FH${idcol}`);
    deletNodeId(`FI${idcol}`);
    deletNodeId(`FE${idcol}`);
    deletNodeId(`FT${idcol}`);
    deletNodeId(`FA${idcol}`);
    deletNodeId(`FB${idcol}`);

    deletNodeId(`EH${idcol}`);
    deletNodeId(`EV${idcol}`);
    deletNodeId(`EC${idcol}`);
    deletNodeId(`EM${idcol}`);
    deletNodeId(`ES${idcol}`);

    deletNodeId(`IM${idcol}`);
 }

function createColMonthIncome(){
    let c= document.getElementById('IM').appendChild(document.createElement('th'))
    c.setAttribute("id", `IM${months[this.monthInit]}${this.anio}`);
    c.appendChild(document.createTextNode(months[this.monthInit]+' '+this.anio))
}

 function deletNodeId(id){
    var item = document.getElementById(id);
    item.parentNode.removeChild(item);
 }

 //Totales del costo directo, gastos y total de ingresos
  function createColumnPeriodEgre(direct_cost,admin_expenses,incomes,periodp){
   let period=periodp.month
    let age=periodp.age
    let egresos=0
    let ingresos=0
    for (let d in direct_cost){
       egresos=+ direct_cost[d].value
    }
    for(let a in admin_expenses){
       egresos=+ admin_expenses[a].value
    }
    for (let d in incomes){ 
      ingresos=+ incomes[d].value
     }
    let butDel=document.createElement('button');
    butDel.classList.add("btn");
    butDel.classList.add("btn-danger");
    butDel.setAttribute("id", `${period}${age}`);
    butDel.setAttribute("onclick", `deleteColFlu(this.id)`);
    butDel.appendChild(document.createTextNode('Eliminar'))

    let c= document.getElementById('FH').appendChild(document.createElement('th'))
    c.setAttribute("id", `FH${period}${age}`);
    c.appendChild(document.createTextNode(period+' '+age))

     c= document.getElementById('FI').appendChild(document.createElement('th'))
    c.setAttribute("id", `FI${period}${age}`);
    c.appendChild(document.createTextNode(Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(ingresos)))

    c= document.getElementById('FE').appendChild(document.createElement('th'))
    c.setAttribute("id", `FE${period}${age}`);
    c.appendChild(document.createTextNode(Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(egresos)))
    
    c= document.getElementById('FT').appendChild(document.createElement('th'))
    c.setAttribute("id", `FT${period}${age}`);
    c.appendChild(document.createTextNode(Intl.NumberFormat('en-EN', { style: "currency", currency: "MXN", }).format(ingresos-egresos)))

    document.getElementById('FA').appendChild(document.createElement('th')).setAttribute("id", `FA${period}${age}`)
    c=document.getElementById('FB').appendChild(document.createElement('th'))
    c.setAttribute("id", `FB${period}${age}`)
    c.appendChild(butDel)
    return egresos
 }

 let cancel = document.getElementById('cancel')
 
//Cancelar lo editado
cancel.addEventListener('click', async ()=> {
    var opcion = confirm("Desea eliminar cancelar?");
    if (opcion == true) {
        location.href ="/"
    }    

})