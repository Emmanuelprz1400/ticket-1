
var budget;

window.onload = async function (){
    try {
     let dataSession=  await JSON.parse(sessionStorage.getItem('dataSession'))
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

     budget= new Budget(dataSession,dataUser);
         
    } catch (error) {
        console.log(error)     
     }
     }else{
         location.href = '/login.html'
     }} catch (error) {  
         console.log(error)   
     } 
 }

//Inicar la clase presupuesto 
class Budget{
    constructor(dataSession,dataUser){
        this.cont=0;
        this.monthInit;
        this.anio;
        this.period=[] 
        this.direct_cost=[]
        this.incomes=[]
        this.resources=[]
        this.admin_expens=[]
        this.dataSession=dataSession;
        this.dataUser=dataUser;
    }
    
}
var  months=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

let addcol = document.getElementById('addcol')
let initBud = document.getElementById('initBud')
let addIncome = document.getElementById('addincome')

//Agrega columna mes y deshabilita el del mes inicial
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

//Agrega mes inicial y habilita el init
initBud.addEventListener('click', async ()=> {
    addcol.disabled = false;
    monthInit.disabled = true;
    ageInit.disabled = true;
    initBud.disabled = true;
    addincome.disabled=false;
    this.monthInit=monthInit.value-1;
    this.anio=ageInit.value;
    createColumnMonth()
    createColumnMonthRes()
    createColMonthIncome()
    this.cont=1
    this.monthInit++
    if(this.monthInit>11){
        this.monthInit=0
        this.anio++
    }
 })

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

//Columna de estado de resultados
function createColumnMonthRes(){
   
    let c= document.getElementById('EH').appendChild(document.createElement('th'))
    c.setAttribute("id", `EH${months[this.monthInit]}${this.anio}`);
    c.appendChild(document.createTextNode(months[this.monthInit]+' '+this.anio))
    document.getElementById('EV').appendChild(document.createElement('th')).setAttribute("id", `EV${months[this.monthInit]}${this.anio}`)
    document.getElementById('EC').appendChild(document.createElement('th')).setAttribute("id", `EC${months[this.monthInit]}${this.anio}`)
    document.getElementById('EM').appendChild(document.createElement('th')).setAttribute("id", `EM${months[this.monthInit]}${this.anio}`)
    document.getElementById('ES').appendChild(document.createElement('th')).setAttribute("id", `ES${months[this.monthInit]}${this.anio}`)
 }

 //Creación de columna de mes en dom para las sesiones necesarias
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
 let cancel = document.getElementById('cancel')
//Cancelar lo editado
cancel.addEventListener('click', async ()=> {
    var opcion = confirm("Desea eliminar cancelar?");
    if (opcion == true) {
        location.href ="/"
    }    

})
