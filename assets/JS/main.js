// FUNCION EN TABLA DE RESPUESTAS

const addButton = document.getElementById("add")
addButton.addEventListener("click", create);

const editButton = document.getElementById("edit");
editButton.addEventListener("click", edit);

let tareas = [];
readFromLS();

// declarar las variables del edit y id
let editBtn = false;
// mientras se edita
let idEditBtn = null;

const productsInput = document.getElementById("products")
const unitsInput = document.getElementById("units")
const categoryInput = document.getElementById("category")

// boton agregar
function create(event) {
    event.preventDefault()
    const respuesta = formulario()
    tareas.push(respuesta)
    createRow(respuesta)
    clearForm()
    saveDataLS()
    // console.log(tareas)
}

function formulario() {
    // inicializar la variable id
    id = Date.now()

    // condicional si es que se está editando
    if (editBtn && idEditBtn !== null) {
        id = idEditBtn;
    }

    const respuesta = {
        products: productsInput.value,
        units: unitsInput.value,
        category: categoryInput.value,
        id
    };

    return respuesta
}

// llenar el formulario
function createRow(respuesta) {
    const tbody = document.getElementById("tbody")

    tbody.innerHTML += `
          <tr>
             <td>${respuesta.products}</td>                
             <td>${respuesta.units}</td>
             <td>${respuesta.category}</td>
             <td>
                 <div class="button-2">
                 <button onclick = "editRow('${respuesta.id}')" class="edit">Editar</button>
                 <button onclick = "deleteRow('${respuesta.id}')" class="delete">Borrar</button>
                 </div>
             </td>
          </tr>             
      `
}

function clearForm() {
    const form = document.getElementById("form");
    form.reset()
}

function saveDataLS() {
    // JSON.stringify()
    localStorage.setItem("tareas", JSON.stringify(tareas))
}

function readFromLS() {
    const tareasLS = JSON.parse(localStorage.getItem('tareas'));
    if (tareasLS) {
        tareas = tareasLS
        tareas.forEach((respuesta) => createRow(respuesta));
    } else {
        tareas = []
    }
}

// funcion eliminar
function deleteRow(id) {
    Swal.fire({
        title: '¿Estás Seguro?',
        text: "",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Borrado',
                '',
                'success'
            )
            const index = tareas.findIndex((respuesta) => respuesta.id == id);
            tareas.splice(index, 1);
            saveDataLS();
            tbody.innerHTML = "";
            readFromLS();
        }
    })

}

// funcion editar del array 
function editRow(id) {

    addButton.classList.add("hide")
    editButton.classList.remove("hide")
    const index = tareas.findIndex((respuesta) => respuesta.id == id);
    const respuesta = tareas[index]

    productsInput.value = respuesta.products;
    unitsInput.value = respuesta.units;
    categoryInput.value = respuesta.category;

    // modificar las variables
    editBtn = true;
    idEditBtn = id;

}

// actualizar
function edit(e) {
    e.preventDefault()
    const respuesta = formulario()
    const index = tareas.findIndex((tarea) => tarea.id == respuesta.id);
    tareas[index] = respuesta;
    console.log(index)
    saveDataLS();
    clearForm();

    // cambiar la clase de los botones
    addButton.classList.remove("hide");
    editButton.classList.add("hide");

    // retornar las variables a su estado inicial
    idEditBtn = null;
    editBtn = false;

    tbody.innerHTML = "";
    readFromLS();
}

// readFromLS();


