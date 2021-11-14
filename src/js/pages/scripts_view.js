/*
"Funció" que busca totes les tasques guardades en localStorage i obté la seva informació.
S'executarà cada cop que carregui la pàgina.
Author: Roger Casas Aisa (roger.casas)
*/
var tasks = [];

for(let i = 0; i < localStorage.length; i++){
        if(localStorage.key(i) != "modify"){
            let aux = localStorage.getItem(i);
            let task_id = localStorage.key(i);
            let task_name = aux.split('$')[0];
            let task_deadline = aux.split('$')[1];
            let task_category = aux.split('$')[2];
            let task_description = aux.split('$')[3];
            let task_completed = aux.split('$')[4];
            let task_logo = aux.split('$')[5];
            let selected = 0;
    
            tasks.push({ task_id: task_id, task_name: task_name, task_deadline: task_deadline, task_category: task_category, task_description: task_description, task_completed: task_completed, task_logo: task_logo, selected: selected});
        }
} 

pintarTasques();

/*
Escriu al HTML el codi de totes les tasques
Author: Roger Casas Aisa (roger.casas) & Lluis Farre Castan (lluis.farre)
*/
function pintarTasques(){
    for(i = 0; i < tasks.length; i++){

        let path_logo;
    
            switch(tasks[i].task_logo){
                case "1": path_logo="../src/media/img/la_salle_logo_big.png";
                    break;  
                case "2": path_logo="../src/media/img/lec_logo_big.png";
                    break;
                case "3": path_logo="../src/media/img/kekistan_logo_big.png";  
                    break;
                case "4": path_logo="../src/media/img/skyrim_logo_big.png";   
                    break;
                case "5": path_logo="../src/media/img/kim_logo_big.png"; 
                    break;
                case "6": path_logo="../src/media/img/jojo_logo_big.png";  
                    break;
                default:
                    path_logo="empty";
            }

        let aux_category;
        let category_color;

        switch(tasks[i].task_category){
            case "1": 
                aux_category = "College";
                category_color = "red";
                break;  
            case "2": 
                aux_category = "Social";
                category_color = "blue";
                break;
            case "3": 
                aux_category = "Medical";
                category_color = "green";
                break;
            case "4": 
                aux_category = "Meeting"; 
                category_color = "yellow"; 
                break;
            case "5": 
                aux_category = "Exam";
                category_color = "orange";
                break;
            case "6": 
                aux_category = "Party"; 
                category_color = "cyan";
                break;
            case "7": 
                aux_category = "Homework";
                category_color = "magenta";
                break;
            default:
                aux_category="empty";
                category_color = "";
        }

        let path_completed;
    
        if(tasks[i].task_completed == "1"){
            path_completed = "../src/media/img/checkbox-svgrepo-com.svg"
        }else{
            path_completed = "../src/media/img/un-checkbox-svgrepo-com.svg"
        }

        let selected_task = "";
        if(tasks[i].selected == 1) selected_task = "selected-task";

        let urgent;
        const today = new Date();
        var date1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        var date2 = new Date(tasks[i].task_deadline.split('-')[0], (tasks[i].task_deadline.split('-')[1]-1), tasks[i].task_deadline.split('-')[2]);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        if(diffDays < 7){
            urgent = "Urgent!";
        }else{
            urgent = "";
        }
        
        document.getElementById("tasques").innerHTML += 
            `<div class="task">
                <div class="select ${selected_task}" onclick="selectTask(${tasks[i].task_id})">
                        <object data="${path_completed}"> </object>
                </div>
    
                <div class="task-info">
                    <img src="${path_logo}" alt="">
                    <div class="task-main">
                        <a onClick="openForm(1, ${tasks[i].task_id})">
                            <h2>${tasks[i].task_name}</h2>
                        </a>
                        <p>${tasks[i].task_description}</p>
                    </div>
                    <div class="task-extra">
                        <div>
                            <p class="urgent">${urgent}</p>
                            <p>${tasks[i].task_deadline}</p>
                        </div>
                        <p class="${category_color}">${aux_category}</p>
                    </div>
                </div>
            </div>`
    }
}

/*
Funció que modifica les condicions de creació de la pàgina task-form.html per a poder modificar una tasca existent
Author: Roger Casas Aisa (roger.casas)
*/
function openForm(mode, id){
    //En el cas de voler modificar una tasca
    if(mode == "1"){
        let aux;
        for(let i = 0; i < tasks.length; i++){
            if(tasks[i].task_id == id){
                aux = id;
            }
        }
        //let aux = tasks.findIndex((task_id) => task_id == id);
        let aux_id = tasks[aux].task_id;
        let aux_name = tasks[aux].task_name;
        let aux_deadline = tasks[aux].task_deadline;
        let aux_category = tasks[aux].task_category;
        let aux_description = tasks[aux].task_description;
        let aux_completed = tasks[aux].task_completed;
        let aux_logo = tasks[aux].task_logo;
    
        let msg = aux_id + "$" + aux_name + "$" + aux_deadline + "$" +aux_category + "$" + aux_description + "$" + aux_completed + "$" + aux_logo; 
        localStorage.setItem("modify", msg);
    }else{
        localStorage.setItem("modify", "");
    }
    window.location = "task-form.html";
}

/*
Aquesta funció selecciona la tasca
Author: Lluis Farre Castan (lluis.farre)
*/
function selectTask(id){
    //marquem la tasca:
    let aux;
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].task_id == id){
            if(tasks[i].selected == 0){
                tasks[i].selected = 1;
            }
            else{
                tasks[i].selected = 0; 
            }
        }
    }

    //Esborrem el contingut:
    document.getElementById("tasques").innerHTML = ``;

    //Repintem:
    pintarTasques();
}

/*
Funció que elimina una tasca de la llista
Author: Roger Casas Aisa (roger.casas)
*/
function deleteTask(id){
    localStorage.removeItem(id);
    let aux = tasks.findIndex((task_id) => task_id == id);
    tasks.splice(aux, aux);
}

/*
Elimina les  tasques seleccionades
Author: Lluis Farre Castan (lluis.farre)
*/
function deleteSelected(){
    let aux;
    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].selected == "1"){
            deleteTask(tasks[i].task_id);
        }
    }
    location.reload(); 
}