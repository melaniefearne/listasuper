class Producto{
    constructor(nombre, marca, presentacion){
        this.nombre = nombre,
        this.marca = marca,
        this.presentacion = presentacion
    }
}

// function* paginado(array) { 
//     let mitad = (array.length / 2)
//     yield range(array, 0, mitad);
//     yield range(array. mitad, array.length);
// }

// function range(array, start, end) {
//     var ans = [];
//     for (let i = start; i <= end; i++) {
//         ans.push(array[i]);
//     }
//     return ans;
// }


let arrayProductos;
fetch('SuperMercado.json')
.then((response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response.json()
})
.then(data => arrayProductos = [...data])

const input = document.getElementById("productoInput");
const Selectmarca = document.getElementById("selectMarca");
const SelecPresentacion= document.getElementById("selectPresentacion");
const productsList= document.getElementById("productsList");
const tbody = document.getElementById("tbody");

let totalMax= 0
let totalMin = 0

input.addEventListener("keydown", (e)=>{
    let content = e.target.value;
    if(content.length >= 3){    
       let filtrado = arrayProductos.filter(prod =>{
            return prod.Nombre.toLowerCase().includes(content.toLowerCase())
        })

        if(filtrado.length > 0){
            verLista(filtrado);
        }
    }
})

function toSelectMarcas(arrPresentacion){
   let marcas= new Set(arrPresentacion);
   let options ="";
   marcas.forEach(marca=>{
     options += `<option>${marca}</option>`
    })
    Selectmarca.innerHTML = options;
}

function toSelectPresentacion(arrMarca){
    let presentaciones= new Set(arrMarca);
    let options ="";
    presentaciones.forEach(pres=>{
      options += `<option>${pres}</option>`
     })
     SelecPresentacion.innerHTML = options;

}

function verLista(arrayFiltrado){
    if(arrayFiltrado.length > 5)
    {
        toSelectMarcas(arrayFiltrado.map(e=> e.Marca));
        toSelectPresentacion( arrayFiltrado.map(e=> e.Presentacion));

    }
    else{
        toLista(arrayFiltrado);
    }

}

function buscar(){
    productsList.innerHTML = "";
    let producto = new Producto(input.value, Selectmarca.value, SelecPresentacion.value)
   let filtrado = arrayProductos.filter(productos => {
        return (productos.Nombre.toLowerCase().includes(producto.nombre) && productos.Marca == producto.marca)
    })
    toLista(filtrado)
}

function toLista(array){
    let div = document.createElement("div");
    div.className = "list-group";
    let list = "";

    array.forEach(e=> {
      list += `<a href="#" onclick="Agregar('${e.Nombre}','${e.PrecioMax}','${e.PrecioMin}','${e.Marca}')" class="list-group-item list-group-item-action">
      ${e.Nombre}  precio: Max($${e.PrecioMax}) Min($${e.PrecioMin})`
    })
    div.innerHTML = list;
    productsList.append(div);
}

function Agregar(Nombre,PrecioMax, PrecioMin, Marca ){
    productsList.innerHTML = "";
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td class="table-light">${Nombre}</td>
        <td class="table-light">1</td>
        <td class="table-light">${PrecioMin}</td>
        <td class="table-light">${PrecioMax}</td>
        <td class="table-light">${Marca}</td>
        <td class="table-light">
            <div class="form-check form-switch">
            <input class="form-check-input" onchange="tachar(this)" type="checkbox" role="switch" id="Estado">
            <label class="form-check-label" for="Estado">Estado</label>
            </div>
        </td>
    `;
    tbody.append(tr);
    totalMax += parseFloat(PrecioMax)
    totalMin += parseFloat(PrecioMin)
    document.getElementById("totalMax").innerHTML= `<p>${totalMax}</p>`
    document.getElementById("totalMin").innerHTML= `<p>${totalMin}</p>`

}

function tachar(input){
    let bisa = input.parentNode.parentNode.parentNode
    if( bisa.children[0].className == "bg-success"){
        bisa.children[0].className = "";
        bisa.children[1].className = "";
        bisa.children[2].className = "";
        bisa.children[3].className = "";
        bisa.children[4].className = "";
    }
    else{
        bisa.children[0].className = "bg-success";
        bisa.children[1].className = "bg-success";
        bisa.children[2].className = "bg-success";
        bisa.children[3].className = "bg-success";
        bisa.children[4].className = "bg-success";
    }

}