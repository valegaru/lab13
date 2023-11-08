// Clase Tarea para representar una tarea
class Tarea {
    constructor(texto, estado) {
        this.texto = texto;
        this.estado = estado;
    }
}


// Función para crear y mostrar una tarea en el tablero
function crearTarea(texto, estado) {
    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta";
    tarjeta.innerHTML = `
        <div class="quitar"><button class="eliminar">X</button></div>
        <p>${texto}</p>
        <div class="acciones">
            <button class="down"></button>
            <button class="up"></button>
        </div>
    `;


    const botonEliminar = tarjeta.querySelector(".eliminar");
    botonEliminar.addEventListener("click", () => {
        tarjeta.remove();
        actualizarAlmacenamientoLocal();
    });


    const botonEstado = tarjeta.querySelector(".up");
    botonEstado.addEventListener("click", () => {
        // Cambiar el estado de la tarea
        if (estado === "to-do") {
            estado = "doing";
        } else if (estado === "doing") {
            estado = "done";
        }
        actualizarAlmacenamientoLocal();
        moverTarea(tarjeta, estado);
    });


    const botonEstado1 = tarjeta.querySelector(".down");
    botonEstado1.addEventListener("click", () => {
        // Cambiar el estado de la tarea
        if (estado === "done") {
            estado = "doing";
        } else if (estado === "doing") {
            estado = "to-do";
        }
        actualizarAlmacenamientoLocal();
        moverTarea(tarjeta, estado);
    });


    document.getElementById(estado).appendChild(tarjeta);
}


// Función para mover una tarea de un estado a otro
function moverTarea(tarjeta, nuevoEstado) {
    document.getElementById(nuevoEstado).appendChild(tarjeta);
}


// Función para agregar una tarea al tablero
function agregarTarea() {
    const textoTarea = document.getElementById("textoTarea").value;
    if (textoTarea) {
        crearTarea(textoTarea, "to-do");
        document.getElementById("textoTarea").value = "";
        actualizarAlmacenamientoLocal();
    }
}


// Función para guardar las tareas en el almacenamiento local
function actualizarAlmacenamientoLocal() {
    const tareas = [];
    const elementosTarea = document.querySelectorAll(".tarjeta");
    elementosTarea.forEach((elementoTarea) => {
        const texto = elementoTarea.querySelector("p").textContent;
        const estado = elementoTarea.parentElement.id;
        tareas.push(new Tarea(texto, estado));
    });
    localStorage.setItem("tareas", JSON.stringify(tareas));
}


// Función para cargar tareas desde el almacenamiento local
function cargarTareas() {
    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    tareas.forEach((tarea) => crearTarea(tarea.texto, tarea.estado));
}


// Event listener para el botón "Añadir Tarea"
document.getElementById("botonAgregarTarea").addEventListener("click", agregarTarea);


// Cargar tareas al cargar la página
cargarTareas();
