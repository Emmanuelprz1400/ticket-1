var indexUser;
//Salir de la sesión
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
    document.getElementById('nameUser').textContent = dataUser.names ;
    document.getElementById('gmailUser').textContent  =dataUser.email ;
    document.getElementById('phone').textContent  =dataUser.phone_number ;

        indexUser= new Index(dataSession,dataUser);
        indexUser.retriveBudgets();    
    } catch (error) {
       console.log(error)     
    }
    }else{
        location.href = '/login.html'
    }} catch (error) {  
        console.log(error)   
    } 
}

//Inicar la clase index
class Index{
    constructor(dataSession,dataUser){
        this.dataSession=dataSession;
        this.dataUser=dataUser;
        this.budgets=[];
    }

    async retriveBudgets(){
        let result = await fetch(`http://localhost:3000/budget/${this.dataUser.id_user}`, {
        method: 'get',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  this.dataSession.token
          }
        })
        const budgets = await result.json();
        for (let b in budgets) {
            this.createElement(budgets[b]);
        }
    }

    async changepassword(){

        let pass1 = document.getElementById('pass1').value;
        let pass2 = document.getElementById('pass2').value;
    
        var noValido = /\s/;
    
        if( (!noValido.test(pass1) && !noValido.test(pass2)) && ( pass2 != '' && pass1 != '') &&(pass2===pass1)){
           try {
            let resultado = await fetch('http://127.0.0.1:3000/user/pass', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' +  this.dataSession.token
            },
            body: JSON.stringify({
                "id_user": this.dataUser.id_user,
                "password" : pass1,
            })
        })
          if(resultado){sessionStorage.clear();alert('password changed'); location.href ="./"; }
        } catch (error) {
            console.log(error)
        }  
        }else{
           alert('password no valido');
        }      
}
    async createElement(budget){

       let tableBody=  document.getElementById('tableBody');
       
        let tr = document.createElement("tr");
		
        let th = document.createElement("th");
        th.appendChild(document.createTextNode(budget.id_budget));

        let td1 = document.createElement("td");
        td1.appendChild(document.createTextNode(budget.createdAt));

        let td2 = document.createElement("td");
        td2.appendChild(document.createTextNode(budget.proyect))

        let td3 = document.createElement("td");
        td3.appendChild(document.createTextNode(budget.version));

        let tdButtDel = document.createElement("td");
        let tdButtEdit = document.createElement("td");
        let tdButtSend = document.createElement("td");

        let buttonDel = document.createElement("button");
        buttonDel.classList.add("btn");
        buttonDel.classList.add("btn-danger");
        buttonDel.setAttribute("onclick", `deleteBud('${budget.id_budget}')`);
        buttonDel.appendChild(document.createTextNode('Eliminar'))

        let buttonEdit= document.createElement("button");
        buttonEdit.classList.add("btn");
        buttonEdit.classList.add("btn-success");
        buttonEdit.setAttribute("onclick", `editBudget('${budget.id_budget}')`);
        buttonEdit.appendChild(document.createTextNode('Editar'))

        let buttonSend = document.createElement("button");
        buttonSend.classList.add("btn");
        buttonSend.classList.add("btn-secondary");
        buttonSend.setAttribute("onclick", `sendBudget('${budget.id_budget}')`);
        buttonSend.appendChild(document.createTextNode('Enviar'))


        tr.appendChild(th)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)

        tdButtDel.appendChild(buttonDel);
        tdButtEdit.appendChild(buttonEdit);
        tdButtSend.appendChild(buttonSend);
        tr.appendChild(tdButtDel)
        tr.appendChild(tdButtEdit)
        tr.appendChild(tdButtSend)
        tableBody.appendChild(tr);

    }

    async deleteBudget(id_budget){
    
        try {
        let ok = await fetch('http://127.0.0.1:3000/delete', {
        method: 'post',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' +  this.dataSession.token
        },
        body: JSON.stringify({
            "id_user": this.dataUser.id_user,
            "id_budget" : id_budget,
        })
    })
    if(ok){ location.href ="./"; }
    } catch (error) {
         console.log(error)       
    }
}  
}

//Borrar presupuesto
function deleteBud(id_budget){
    var opcion = confirm("Desea eliminar presupuesto?");
    if (opcion == true) {
    indexUser.deleteBudget(id_budget);
    }
}
    
//Cambiar contraseña
let changePass = document.getElementById('changePass');

changePass.addEventListener('click', async ()=>{
    indexUser.changepassword();

});

//Nuevo presupuesto
let newBudget = document.getElementById('newBudget');
newBudget.addEventListener('click', async ()=>{
    location.href ="./newBudget";

});

//Cerrar sesión
let logout = document.getElementById('logout');

logout.addEventListener('click', async ()=>{
    var opcion = confirm("Desea salir?");
    if (opcion == true) {
		sessionStorage.clear(); 
		location.href = '/login.html'
	}
});

//Editar presupuesto 
function editBudget(id_budget){
    location.href = './editBudget/?'+id_budget
}