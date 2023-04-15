// FUNCION EN RESPUESTAS

const addButton = document.getElementById("add")
addButton.addEventListener("click", create)

const editButton = document.getElementById("edit");
editButton.addEventListener("click", edit);

const tareas = [];

const btnEdit = false
const idBtnEdit = null

function create(event) {
    event.preventDefault()
    const respuesta = formulario()
    tareas.push(respuesta)
    createRow(respuesta)
    clearForm()
    saveDataLS()
}
const productsInput = document.getElementById("products")
const unitsInput = document.getElementById("units")
const categoryInput = document.getElementById("category")

function formulario() {
    const id = Date.now()
    if (btnEdit && idBtnEdit !== null) {
        id = idBtnEdit;
    }

    const respuesta = {
        producto: productsInput.value,
        marca: unitsInput.value,
        categoria: categoryInput.value,
        id
    };

    return respuesta
}

function createRow(respuesta) {
    const tbody = document.getElementById("tbody")

    tbody.innerHTML += `
          <tr>
             <td>${respuesta.producto}</td>                
             <td>${respuesta.marca}</td>
             <td>${respuesta.categoria}</td>
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
    const form = document.getElementById("form")
    form.reset()
}

function saveDataLS() {
    // JSON.stringify()
    localStorage.setItem("tareas", JSON.stringify(tareas))
}

function readFromLS() {
    const tareasLS = JSON.parse(localStorage.getItem('tareas'));
  if (tareasLS) {
    tareas = tareasLS;
    tareas.forEach((tarea) => createRow(tarea));
  } else {
    tareas = [];
  }
}

function deleteRow(id) {
    const index = tareas.findIndex((respuesta) => respuesta.id == id);
    tareas.splice(index, 1)
    saveDataLS()
    readFromLS()
    tbody.innerHTML = "";
    tareas.forEach((respuesta) => createRow(respuesta));
}

function editRow(id) {
    addButton.classList.add("hide")
    editButton.classList.remove("hide")
    const index = tareas.findIndex((respuesta)=> respuesta.id == id);
    const respuesta = tareas[index]

    productsInput.value = respuesta.products;
    unitsInput.value = respuesta.units;
    categoryInput.value = respuesta.category;
    
    btnEdit = true
    idBtnEdit = id

}

function edit(e) {
    e.preventDefault()
    const tarea = formulario()
    const index = tareas.findIndex((task) => task.id === respuesta.id);
    tareas[index] = tarea;
    saveDataLS();
    clearForm();

    addButton.classList.remove("hide");
    editButton.classList.add("hide");

    btnEdit = false
    idBtnEdit = null
    
    tbody.innerHTML = "";
    readFromLS();
}

readFromLS();


