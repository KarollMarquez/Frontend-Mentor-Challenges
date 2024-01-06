//contador de tareas
let contador = 0;
let tareaNumero = "tarea" + contador;

//al añadir tarea aumenta el contador---------------------------------------------------------
let taskElement = document.getElementById('task');
taskElement.addEventListener("keydown", function(event) {
    if (event.key === "Enter" && event.target.id === "task") {
        addTodo(taskElement.value, contador);
        taskElement.value = ""; // Limpiar el valor del input

        contador++; // Incrementa el contador para la próxima tarea
        tareaNumero = "tarea" + contador;
    }
});

var tareas = [];
var numeroID = 0;

//se toman todas las tareas anteriormente guardadas---------------------------------------------
function getTodos() {
    let cantidadElementos = localStorage.length;
    if (cantidadElementos !== 0){
        for (let i = 0; i < cantidadElementos; i++) {
            let valor = localStorage.getItem(localStorage.key(i));
            if(valor !== "false" & valor !== "true"){
                tareas.push(valor);
                while (localStorage.getItem(tareaNumero)) {
                    contador++;
                    tareaNumero = "tarea" + contador;
                }
            }
        }
    }
}
getTodos();

//se muestran todas las tareas anteriormente guardadas-----------------------------------------------------------------
function mostrarTodos() {
    let taskContainer = document.querySelector('.tasks');

    for (let i = 0; i < tareas.length; i++) {
        let valor2 = tareas[i];
        let nuevoElemento = document.createElement('div');
        nuevoElemento.classList.add('task');
        
        nuevoElemento.innerHTML = `
            <div class="check">
                <input type="checkbox" id="check${numeroID}">
                <label for="check${numeroID}"><img class="iconCheck" src="images/icon-check.svg" alt="Icon Check"></label>
            </div>
            <div class="textoTarea">
                <p>${valor2}</p>
                <img class="delete" src="images/icon-cross.svg" alt="Icon Cross">
            </div>
        `;

        taskContainer.appendChild(nuevoElemento);
        numeroID++;
    }

    let estado = true;

    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        let valor = localStorage.getItem(clave);

        if (valor === estado.toString()) {
            let inicialTarea = clave.slice(0, 6);
            let tareaTexto = localStorage.getItem(inicialTarea);
            document.querySelectorAll("p").forEach(function (pElement) {
                if (pElement.textContent === tareaTexto) {
                    let taskContainer = pElement.closest(".task");
                    let inputElement = taskContainer.querySelector(".check input");
                    let imgElement = taskContainer.querySelector("img");
                    imgElement.classList.remove("iconCheck");
                    taskContainer.classList.add('checked');
                    inputElement.checked = true;
                }
            });
        }
    }
}
mostrarTodos();

//se cargan estados de los inputs para las tareas checkeadas--------------------------------------------------
function cargarEstados() {
    let inputs = document.querySelectorAll('input[type="checkbox"]');

    inputs.forEach(function(input) {
        let tarea = input.closest('.task').querySelector("p").textContent;
        let caracteres = tarea.slice(0,6)
        // Recuperar el estado almacenado en localStorage
        let estadoGuardado = localStorage.getItem(`${caracteres}_checked`);

        if (estadoGuardado !== null) {
            input.checked = estadoGuardado === 'true'; // Convertir de cadena a booleano
        }
    });
}

// Llamamos a cargarEstados al cargar la página
window.addEventListener('load', cargarEstados);

//se toma y se muestra la ultima tarea añadida------------------------------------------------------------------
function getLast() {
    let valor = localStorage.getItem(tareaNumero);
    tareas.push(valor);

    let taskContainer = document.querySelector('.tasks');
    let nuevoElemento = document.createElement('div');
    nuevoElemento.classList.add('task');
    
    nuevoElemento.innerHTML = `
        <div class="check">
            <input type="checkbox" id="check${numeroID}">
            <label for="check${numeroID}"><img class="iconCheck" src="images/icon-check.svg" alt="Icon Check"></label>
        </div>
        <div class="textoTarea">
            <p>${valor}</p>
            <img class="delete" src="images/icon-cross.svg" alt="Icon Cross">
        </div>
    `;

    taskContainer.appendChild(nuevoElemento);
    numeroID++;
    let caracteres = "tarea" + contador;
    localStorage.setItem(`${caracteres}_checked`, false);
    asignarEventListeners();
    valor = "";
}

//añade una tarea en localstorage--------------------------------------------------------------
function addTodo(valor, contador) {
    localStorage.setItem("tarea" + contador, valor);
    getLast();
    actualizarContador();

    let miElemento = document.querySelector('main');
    let valorActual = getComputedStyle(miElemento).getPropertyValue('--margin').trim();
    let valorNumerico = parseFloat(valorActual);
    let nuevaSuma = valorNumerico + 50;
    miElemento.style.setProperty('--margin', `${nuevaSuma}px`);

}

//contador de tareas por completar--------------------------------------------------------------
function actualizarContador() {
    let inputsSeleccionados = document.querySelectorAll('input:checked');
    let TareasHechas = inputsSeleccionados.length;
    let contadorTareas = tareas.length - TareasHechas;

    let containerContador = document.querySelector(".counter");
    containerContador.innerHTML = contadorTareas + " items left";
}

//se cambian los estilos cuando se completa una tarea--------------------------------------------------------------
function cambiarEstilos() {
    let input = this;
    let taskContainer = input.closest('.task');
    console.log("contenedor");

    if (taskContainer) {
        taskContainer.classList.toggle('checked', input.checked);
        
        let imgElement = taskContainer.querySelector("img");
        if (imgElement) {
            imgElement.classList.toggle("iconCheck");
        }


        let pElement = taskContainer.querySelector("p");
        let tarea = pElement.textContent;
        if(taskContainer.classList.contains("checked")){
            pElement.style.color = "hsl(236, 33%, 92%)";
        }
        else{
            pElement.style.color = "black";
        }
        
        for (let i = 0; i < localStorage.length; i++){
            let clave = localStorage.key(i);
            let valor = localStorage.getItem(clave);

            if(valor === tarea){
                localStorage.setItem(`${clave}_checked`, input.checked)
            }
        }
        ;
    }
}

let inputs = document.querySelectorAll('input');
inputs.forEach(function (input) {
    input.addEventListener('change', cambiarEstilos);
});


inputs.forEach(function(input) {
    input.addEventListener('change', actualizarContador,);
});
actualizarContador();

//drag and drop------------------------------------------------------------------------------------------------
const taskContainer = document.querySelector('.tasks');
const tareas2 = taskContainer.querySelectorAll(".task");

tareas2.forEach(tarea => {
    tarea.draggable = true;
    tarea.addEventListener("dragstart", () => {
        setTimeout(() => tarea.classList.add("dragging"), 0);
    });
    tarea.addEventListener("dragend", () => tarea.classList.remove("dragging"));
});

const initSortableList = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    let siblings = [...taskContainer.querySelectorAll(".task:not(.dragging)")];
    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });
    taskContainer.insertBefore(draggingItem, nextSibling);
}

taskContainer.addEventListener("dragover", initSortableList);
taskContainer.addEventListener("dragenter", e => e.preventDefault());

//elimina una tarea con el icono de la equis---------------------------------------------------
function deleteTask() {
    let button = this;
    let buttonContainerTask = button.closest(".task");

    let parrafo = buttonContainerTask.querySelector("p");
    let tarea = parrafo.textContent;

    if (tarea) {
        // Iterar sobre todos los elementos en localStorage
        for (let i = 0; i < localStorage.length; i++) {
            let clave = localStorage.key(i);
            let valor = localStorage.getItem(clave);

            // Verificar si el valor coincide
            if (valor === tarea) {
                // Eliminar la clave que corresponde al valor
                localStorage.removeItem(clave);
                localStorage.removeItem(`${clave}_checked`);
                break; // Puedes detener la iteración si solo esperas un elemento con este valor
            }
        }
    }

    let index = tareas.indexOf(tarea);
    
    if (index !== -1) {
        // Si la tarea está en el array, elimínala
        tareas.splice(index, 1);

        // Elimina el elemento visual correspondiente
        buttonContainerTask.remove();
        
        // Actualiza el contador
        actualizarContador();
    }
}

function asignarEventListeners() {
    let deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(function (button) {
        button.addEventListener("click", deleteTask);
    });

    let inputs = document.querySelectorAll('input');
    inputs.forEach(function(input) {
        input.addEventListener('change', cambiarEstilos);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    asignarEventListeners(); // Asignar event listeners inicialmente
});


//elimina todas las tareas completadas---------------------------------------------------------------
function deleteAll() {
    let taskCompleted = document.querySelectorAll("input:checked");
    taskCompleted.forEach(function (task){
        let contenedor = task.closest(".task");
        let tarea = contenedor.querySelector("p");
        let contenidoTarea = tarea.textContent;

        for (let i = 0; i < localStorage.length; i++) {
            let clave = localStorage.key(i);
            let valor = localStorage.getItem(clave);

            // Verificar si el valor coincide
            if (valor === contenidoTarea) {
                localStorage.removeItem(clave);
                localStorage.removeItem(`${clave}_checked`);
                break;
            }
        }

        let indice = tareas.indexOf(contenidoTarea);

        if (indice !== -1){
            tareas.splice(indice, 1);
            contenedor.remove();
            actualizarContador();
        }
    });
}

let deleteAllButton = document.querySelector(".deleteAll");
deleteAllButton.addEventListener("click", deleteAll);


//funcion para active y completed vision---------------------------------------------------
function activeVision() {
    let estado = true;
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        let valor = localStorage.getItem(clave);

        if (valor === estado.toString()) {
            let inicialTarea = clave.slice(0, 6);
            let tareaTexto = localStorage.getItem(inicialTarea)
            document.querySelectorAll("p").forEach(function (pElement) {
                if (pElement.textContent === tareaTexto) {
                    pElement.closest(".task").classList.add("completa");
                }
            });
        }
        else if (valor === "false"){
            let inicialTarea = clave.slice(0, 6);
            let tareaTexto = localStorage.getItem(inicialTarea)
            document.querySelectorAll("p").forEach(function (pElement) {
                if (pElement.textContent === tareaTexto) {
                    pElement.closest(".task").classList.remove("incompleta");
                }
            });
        }
    }
}

let activeButton = document.querySelectorAll(".active");
activeButton.forEach( function(active){
    active.addEventListener("click", function(){
        activeVision();
        active.style.color = "hsl(220, 98%, 61%)";
        allButton.forEach(function(all){
            all.style.color = "inherit";
        })
        completedButton.forEach(function(button){            
            button.style.color = "inherit";
        })
    });
})

function completeVision() {
    let estado = false;
    for (let i = 0; i < localStorage.length; i++) {
        let clave = localStorage.key(i);
        let valor = localStorage.getItem(clave);

        if (valor === estado.toString()) {
            let inicialTarea = clave.slice(0, 6);
            let tareaTexto = localStorage.getItem(inicialTarea)
            document.querySelectorAll("p").forEach(function (pElement) {
                if (pElement.textContent === tareaTexto) {
                    pElement.closest(".task").classList.add("incompleta");
                }
            });
        }
        else if (valor === "true"){
            let inicialTarea = clave.slice(0, 6);
            let tareaTexto = localStorage.getItem(inicialTarea)
            document.querySelectorAll("p").forEach(function (pElement) {
                if (pElement.textContent === tareaTexto) {
                    pElement.closest(".task").classList.remove("completa");
                }
            });
        }
    }
}

let completedButton = document.querySelectorAll(".completed");
completedButton.forEach( function(button){
    button.addEventListener("click", function(){
        completeVision();
        button.style.color = "hsl(220, 98%, 61%)";
        activeButton.forEach(function(active){
            active.style.color = "inherit";
        })
        allButton.forEach(function(all){
            all.style.color = "inherit";
        })
    });
})

function allVision() {
    let pElements = document.querySelectorAll("p");
    pElements.forEach(function(pElement) {
        let taskElement = pElement.closest(".task");
        if (taskElement) {
            if (taskElement.classList.contains("completa")) {
                taskElement.classList.remove("completa");
            } 
            else if (taskElement.classList.contains("incompleta")) {
                taskElement.classList.remove("incompleta");
            }
        }
    });
}

let allButton = document.querySelectorAll(".all");
allButton.forEach(function(all){
    all.addEventListener("click", function(){
        allVision();
        completedButton.forEach(function(button){            
            button.style.color = "inherit";
        })
        activeButton.forEach(function(active){
            active.style.color = "inherit";
        })
        all.style.color = "hsl(220, 98%, 61%)";
    });
})

//tema ocuro ----------------------------------------------------------------------
let sunIcon = document.querySelector(".sun");
sunIcon.classList.add("iconMood");

let moonIcon = document.querySelector(".moon");

function actualizarEstilosLabel(label) {
    let contenedor1 = label.closest(".addTask");
    let contenedor = label.closest(".task");

    if (contenedor1) {
        label.style.setProperty('--before-bg-color', 'hsl(235, 24%, 19%)');
        label.style.setProperty('--label-bg-color', 'hsl(233, 14%, 35%)');
    } else if (contenedor && !contenedor.classList.contains("checked")) {
        label.style.setProperty('--before-bg-color', 'hsl(235, 24%, 19%)');
        label.style.setProperty('--label-bg-color', 'hsl(233, 14%, 35%)');

        let p = contenedor.querySelector("p");
        p.style.color = "hsl(234, 39%, 85%)";
    } else {
        let p = contenedor.querySelector("p");
        p.style.color = "hsl(234, 11%, 52%)";
    }
}
function darkMode() {
    sunIcon.classList.remove("iconMood");
    moonIcon.classList.add("iconMood");

    let contenedor = document.querySelector(".container");
    function handleResize() {
        if (screen.width > 425) {
            contenedor.style.backgroundImage = "url(images/bg-desktop-dark.jpg)";
        } else {
            contenedor.style.backgroundImage = "url(images/bg-mobile-dark.jpg)";
            contenedor.style.backgroundSize = "contain";
        }
    }
    handleResize();
    
    // Agregar un evento de cambio de tamaño de la pantalla
    window.addEventListener('resize', handleResize);

    document.body.style.backgroundColor = "hsl(235, 21%, 11%)";

    let addTask = document.querySelector(".addTask");
    addTask.style.backgroundColor = "hsl(235, 24%, 19%)";

    let taskContainer = document.querySelector(".taskContainer");
    taskContainer.style.backgroundColor = "hsl(235, 24%, 19%)";
    taskContainer.style.boxShadow = "rgba(0, 0, 0, 0.5) 0px 10px 35px 0px";

    let inputElement = document.querySelector('.addTask > input[type="text"]');
    inputElement.classList.add('inputText');

    let uncheckedInputs = document.querySelectorAll('label');
    uncheckedInputs.forEach(function (label) {
        let contenedor1 = label.closest(".addTask");
        let contenedor = label.closest(".task");
        if (contenedor1) {
            label.style.setProperty('--before-bg-color', 'hsl(235, 24%, 19%)');
            label.style.setProperty('--label-bg-color', 'hsl(233, 14%, 35%)');
        }
        else if(contenedor && !contenedor.classList.contains("checked")){
            label.style.setProperty('--before-bg-color', 'hsl(235, 24%, 19%)');
            label.style.setProperty('--label-bg-color', 'hsl(233, 14%, 35%)');

            let p = contenedor.querySelector("p");
            p.style.color = "hsl(234, 39%, 85%)";
        }
        else{
            let p = contenedor.querySelector("p");
            p.style.color = "hsl(234, 11%, 52%)";
        }
    });

    let tasks = document.querySelectorAll(".task");
    tasks.forEach(function (task) {
        task.style.backgroundColor = "hsl(235, 24%, 19%)";
        task.style.setProperty('--task-border', 'hsl(233, 14%, 35%)');
    })

    let filterContainer = document.querySelector(".filterContainer");
    filterContainer.style.color = "hsl(236, 9%, 61%)";

    let filter = document.querySelector(".filter2");
    filter.style.backgroundColor = "hsl(235, 24%, 19%)";
    filter.style.color = "hsl(236, 9%, 61%)";
    filter.style.boxShadow = "rgba(0, 0, 0, 0.5) 0px 10px 35px 0px";

    let attribution = document.querySelector(".attribution");
    attribution.style.color = "white";
}

moonIcon.addEventListener("click", darkMode);

function ligthMode(){
    sunIcon.classList.add("iconMood");
    moonIcon.classList.remove("iconMood");

    let contenedor = document.querySelector(".container");
    function handleResize() {
        if (screen.width > 425) {
            contenedor.style.backgroundImage = "url(images/bg-desktop-light.jpg)";
        } else {
            contenedor.style.backgroundImage = "url(images/bg-mobile-light.jpg)";
            contenedor.style.backgroundSize = "contain";
        }
    }
    
    // Llamada a la función al cargar la página
    handleResize();
    
    // Agregar un evento de cambio de tamaño de la pantalla
    window.addEventListener('resize', handleResize);

    document.body.style.backgroundColor = "white";

    let addTask = document.querySelector(".addTask");
    addTask.style.backgroundColor = "white";

    let taskContainer1 = document.querySelector(".taskContainer");
    taskContainer1.style.backgroundColor = "white";
    taskContainer1.style.boxShadow = "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px";
    let task = document.querySelectorAll(".task");
    task.forEach(function(task){
        task.style.backgroundColor = "white";
    })

    let inputElement = document.querySelector('.addTask > input[type="text"]');
    inputElement.classList.remove("inputText");

    let uncheckedInputs = document.querySelectorAll('label');
    uncheckedInputs.forEach(function (label) {
        let contenedor1 = label.closest(".addTask");
        let contenedor = label.closest(".task");
        if (contenedor1) {
            label.style.setProperty('--before-bg-color', 'white');
            label.style.setProperty('--label-bg-color', 'hsl(236, 33%, 92%)');
        }
        else if(contenedor && !contenedor.classList.contains("checked")){
            label.style.setProperty('--before-bg-color', 'white');
            label.style.setProperty('--label-bg-color', 'hsl(236, 33%, 92%)');
            let p = contenedor.querySelector("p");
            p.style.color = "black";
        }
        else{
            let p = contenedor.querySelector("p");
            p.style.color = "hsl(236, 33%, 92%)";
        }
    });

    let tasks = document.querySelectorAll(".task");
    tasks.forEach(function (task) {
        task.style.backgroundColor = "white";
        task.style.setProperty('--task-border', 'hsl(236, 33%, 92%)');
    })

    let filterContainer = document.querySelector(".filterContainer");
    filterContainer.style.color = "hsl(236, 9%, 61%)";

    let attribution = document.querySelector(".attribution");
    attribution.style.color = "black";

    let filter = document.querySelector(".filter2");
    filter.style.backgroundColor = "white";
    filter.style.boxShadow = "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px";
}
ligthMode();
sunIcon.addEventListener("click", ligthMode);