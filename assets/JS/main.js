// FUNCION EN RESPUESTAS

const addButton = document.getElementById("add")
addButton.addEventListener("click", create);

const editButton = document.getElementById("edit");
editButton.addEventListener("click", edit);

let tareas = [];

let editBtn = false;
let idEditBtn = null;

const productsInput = document.getElementById("products")
const unitsInput = document.getElementById("units")
const categoryInput = document.getElementById("category")

function create(event) {
    event.preventDefault()
    const respuesta = formulario()
    tareas.push(respuesta)
    createRow(respuesta)
    clearForm()
    saveDataLS()
    console.log(tareas)
}

function formulario() {
     id = Date.now()

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

function deleteRow(id) {
    const index = tareas.findIndex((respuesta) => respuesta.id == id);
    tareas.splice(index, 1);
    saveDataLS();
    readFromLS();
    tbody.innerHTML = "";
    tareas.forEach((respuesta) => createRow(respuesta));
}

function editRow(id) {
    addButton.classList.add("hide")
    editButton.classList.remove("hide")
    const index = tareas.findIndex((respuesta) => respuesta.id == id);
    const respuesta = tareas[index]

    productsInput.value = respuesta.products;
    unitsInput.value = respuesta.units;
    categoryInput.value = respuesta.category;

    editBtn = true;
    idEditBtn = id;

}

function edit(e) {
    e.preventDefault()
    const respuesta = formulario()
    const index = tareas.findIndex((tarea) => tarea.id == respuesta.id);
    tareas[index] = respuesta;
    console.log(index)
    saveDataLS();
    clearForm();

    addButton.classList.remove("hide");
    editButton.classList.add("hide");

    idEditBtn = null;
    editBtn = false;
    

    tbody.innerHTML = "";
    readFromLS();
}

readFromLS();


