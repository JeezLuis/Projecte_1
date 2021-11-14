/*
Author: Roger Casas Aisa (roger.casas)
*/

/*
Funció que actualitza el logo seleccionat per a una tasca
Author: Roger Casas Aisa (roger.casas)
*/
function updateImage(option){
    switch(option){
            case 1: document.getElementById("logo").src="../src/media/img/la_salle_logo_big.png";
                document.getElementById("logo").value = "1";  
                break;  
            case 2: document.getElementById("logo").src="../src/media/img/lec_logo_big.png";
                document.getElementById("logo").value = "2";
                break;
            case 3: document.getElementById("logo").src="../src/media/img/kekistan_logo_big.png"; 
                document.getElementById("logo").value = "3";  
                break;
            case 4: document.getElementById("logo").src="../src/media/img/skyrim_logo_big.png";   
                document.getElementById("logo").value = "4";
                break;
            case 5: document.getElementById("logo").src="../src/media/img/kim_logo_big.png"; 
                document.getElementById("logo").value = "5";  
                break;
            case 6: document.getElementById("logo").src="../src/media/img/jojo_logo_big.png";  
                document.getElementById("logo").value = "6"; 
                break;
    }
}

/*
Funció que controla que no hi hagi cap camp buit abans d'enviar el formulari
Author: Roger Casas Aisa (roger.casas)
*/
function errorCheck(mode, modify_id){
        var error = document.getElementById("error")
        var flag = "0";
        if(document.getElementById("task_name").value == ""){
            error.textContent = "Title required. Maximum 100 characters length.";
            error.style.color = "red";
            flag = "1";
        }else{
            if(!document.getElementById("task_deadline").value){
                error.textContent = "Deadline required. Please select one.";
                error.style.color = "red";
                flag = "1";
            }else{
                    if(document.getElementById("category_list").value == ""){
                        error.textContent = "Category required. Please select one.";
                        error.style.color = "red";
                        flag = "1";
                    }else{
                        if(document.getElementById("task_description").value == ""){
                            error.textContent = "Description required. Maximum 1.000 characters length.";
                            error.style.color = "red";
                            flag = "1";
                        }else{
                                if(!document.getElementById("logo").value){
                                    error.textContent = "Image required. Please select one.";
                                    error.style.color = "red";
                                    flag = "1";
                                }
                        }
                    }
            }
        }
        //Aqui ja podem guardar en localStorage la informacio sobre la nova tasca
        if(flag == "0" && mode == "0"){
            let task_id = localStorage.length;

            let task_name = document.getElementById("task_name").value;
            let task_deadline = document.getElementById("task_deadline").value;
            let task_category = document.getElementById("category_list").value;
            let task_description = document.getElementById("task_description").value;
            let task_completed = document.getElementById("task_completed").value;

            let msg = task_name + "$" + task_deadline + "$" + task_category + "$" + task_description + "$" + task_completed;

            localStorage.setItem(task_id, msg);
            window.location = "main-view.html";
        }
        //Aqui ja podem modificar la informacio en localStorage de la tasca seleccionada
        if(flag == "0" && mode == "1"){
            let task_id = modify_id;

            let task_name = document.getElementById("task_name").value;
            let task_deadline = document.getElementById("task_deadline").value;
            let task_category = document.getElementById("category_list").value;
            let task_description = document.getElementById("task_description").value;
            let task_completed = document.getElementById("task_completed").value;
            let task_logo = document.getElementById("logo").value;

            let msg = task_name + "$" + task_deadline + "$" + task_category + "$" + task_description + "$" + task_completed + "$" + task_logo;

            localStorage.setItem(task_id, msg);
            window.location = "main-view.html";
        }
}

/*
Funció que recarrega la pagina a peticio de l'usuari
Author: Roger Casas Aisa (roger.casas)
*/
function pageReload(){
    location.reload();
}

/*
Funció que canvia l'estat del checkbox "Completed" per a saber en tot moment si es troba activada o no
Author: Roger Casas Aisa (roger.casas) 
 */
function changeCompleted(){
    var completed = document.getElementById("task_completed").value;
    if(completed == "0"){
        document.getElementById("task_completed").value = 1;
    }else{
        document.getElementById("task_completed").value = 0;
    }
}
              