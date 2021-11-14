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

        let path_logo;

        switch(task_logo){
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

        switch(task_category){
            case "1": aux_category = "College";
                break;  
            case "2": aux_category = "Social";
                break;
            case "3": aux_category = "Medical";
                break;
            case "4": aux_category = "Meeting";  
                break;
            case "5": aux_category = "Exam";
                break;
            case "6": aux_category = "Party"; 
                break;
            case "7": aux_category = "Homework";
                break;
            default:
                aux_category="empty";
        }

        let path_completed;

        if(task_completed == "1"){
            path_completed = "../src/media/img/checkbox-svgrepo-com.svg"
        }else{
            path_completed = "../src/media/img/un-checkbox-svgrepo-com.svg"
        }

        tasks.push({ task_id: task_id, task_name: task_name, task_deadline: task_deadline, task_category: task_category, task_description: task_description, task_completed: task_completed, task_logo: task_logo});
        
        document.getElementById("tasques").innerHTML += 
        `<div class="task">
            <div class="select" onClick="console.log('Test')">
                <object data="${path_completed}"> </object>
            </div>
            
            <a onClick="openForm(1, ${task_id})">
                <div class="task-info">
                    <img src="${path_logo}" alt="">
                    <div class="task-main">
                        <h2>${task_name}</h2>
                        <p>${task_description}</p>
                    </div>
                    <div class="task-extra">
                        <p>${task_deadline}</p>
                        <div> <!--Categories-->
                            <p class="green">${aux_category}</p>
                        </div>
                    </div>
                </div>
            </a>
        </div>`
    }
}

/*
Funció que elimina una tasca de la llista
Author: Roger Casas Aisa (roger.casas)
*/
function deleteTask(id){
    let aux = tasks.findIndex((task_id) => task_id == id);
    tasks.splice(aux, aux);
    location.reload();
}

/*
Funció que modifica les condicions de creació de la pàgina task-form.html per a poder modificar una tasca existent
Author: Roger Casas Aisa (roger.casas)
*/
function openForm(mode, id){
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
    //En el cas de voler modificar una tasca
    if(mode == "1"){
        localStorage.setItem("modify", msg);
    }else{
        localStorage.setItem("modify", "");
    }
    window.location = "task-form.html";
}
