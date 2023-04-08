// SELECTORES

//console.log (addButton)
/*
const anchors = document.getElementsByTagName("a")
console.log(anchors)

const labels =  document.getElementsByClassName("input-names")
console.log(labels)

const input = document.getElementsByTagName("input")
console.log(input)

const categories = document.getElementsByClassName("category")
console.log(categories)

const answers = document.getElementsByClassName("input-answers")
console.log(answers)

const deleteButton = document.getElementById("delete")
console.log(deleteButton)

const editButton =  document.getElementById("edit")
console.log(editButton)
*/

// EVENTS

// const addButton = document.getElementById("add")
// console.log(addButton)

// addButton.addEventListener("click", () => alert("te hicieron click"))

// const addButton = document.getElementById("add")


// addButton.addEventListener("click", datos)

// function datos(event) {
//     const inputProduct = document.getElementById("products")
//     alert(inputProduct.value)
//     ejemploNumerico = parseInt(inputProduct.value)


// }


// RESPUESTAS

// const productsInput = document.getElementById("products").value
// alert(productsInput)
// const unitsInput = document.getElementById("units").value
// const categoryInput = document.getElementById("category").value

// productsInput.addEventListener("input", handleInput)
// unitsInput.addEventListener("input", handleInput)
// categoryInput.addEventListener("input", handleInput)

// const ids = ["product", "units", "category"]

// ids.forEach((id) => {
//     const element = document.getElementById(id)
//     element.addEventListener("input", handleInput)
// })


//NUEVA FUNCION EN RESPUESTAS

const addButton = document.getElementById("add")
addButton.addEventListener("click", create)

const productsInput = document.getElementById("products")
const unitsInput = document.getElementById("units")
const categoryInput = document.getElementById("category")


const tareas = []

function create(event) {
    event.preventDefault()
    const respuesta = formulario()
    createRow(respuesta)
    clearForm()
}

function formulario() {
    const productsInput = document.getElementById("products").value
    const unitsInput = document.getElementById("units").value
    const categoryInput = document.getElementById("category").value
    

    const respuesta = {
        producto: productsInput,
        marca: unitsInput,
        categoria: categoryInput
    }

    tareas.push(respuesta)
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
                 <button class="edit">Editar</button>
                 <button class="delete">Borrar</button>
                 </div>
             </td>
          </tr>             
      `
}

function clearForm() {
    const form = document.getElementById("form")
    form.reset()

}





