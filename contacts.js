//Fetch

// let url = "https://jsonplaceholder.typicode.com/users";
let contactos = []
let url = "../contactos.json";

fetch(url)
  .then((respuesta) => respuesta.json())
  .then((data) => mostrarData(data))
  .catch((error) => console.log("Error al cargar los datos"));

const mostrarData = (data) => {
  console.log(data);
  let body = '';
  for (let i = 0; i < data.length; i++) {
    body += `<tr><td>${data[i].nombre}</td><td>${data[i].email}</td><td>${data[i].telefono}</td><td>${data[i].sucursal}</td></tr>`;
  }
  document.getElementById('data').innerHTML = body;
};


