
//Seleccionamos el formulario 
const form = document.getElementById('registroForm');

//Función para validar el nombre usando expresiones regulares
const validarNombre = nombre => /^[a-zA-Z\s]{3,}$/.test(nombre.trim()); 

//Función para validar la edad (debe ser mayor de 18 años)
const validarEdad = edad => !isNaN(edad) && edad > 18;

//Función para validar el País
const validarPais = pais => pais !== "";

//Función para mostrar alertas de error
const mostrarError = mensaje => alert(mensaje);

//Función para generar el contenido dinámico en la nueva ventana
const generarContenidoVentana = (nombre, edad, pais) => {
    // crear la nueva ventana
    const nuevaVentana = window.open("","Datos Ingresados","width=400,height=400");

    // crear elemento div para el contenedor
    const container = nuevaVentana.document.createElement("div");
    container.innerHTML = `
        <h2>Datos Ingresado</h2>
        <p><strong>Nombre completo:</strong> ${nombre}</p>
        <p><strong>Edad:</strong> ${edad}</p>
        <p><strong>País:</strong> ${pais}</p>
        `;

    //Creamos un botón para cerra la ventana
    const botonCerrar = nuevaVentana.document.createElement("button");
    botonCerrar.textContent = "Cerrar";
    botonCerrar.addEventListener("click", ()=> nuevaVentana.close());

    //Agregar contenido y boton al body de la nueva ventana
    nuevaVentana.document.body.appendChild(container);
    nuevaVentana.document.body.appendChild(botonCerrar);

};

//Manejo del evento 'submit' utilizando arrow function
form.addEventListener("submit", e => {
    e.preventDefault(); //prevenir el envío hasta validar

    //destructuramos los valores del formulario
    const {nombre, edad, pais} = Object.fromEntries(new FormData(form));

    //validar el nombre
    if(!validarNombre(nombre)){
        return mostrarError("Por favor, ingresa un nombre válido con almenos 3 caracteres y solo letras.");

    }

    //Validación de la edad
    if (!validarEdad(edad)){
        return mostrarError("La edad debe ser un número mayor de 18");
    }

    //Validamos el País
    if(!validarPais(pais)){
        return mostrarError("Por favor, selecciona un País");
    }

    //Generar el contenido de la nueva ventana si las validaciones son correctas
    generarContenidoVentana(nombre,edad,pais);
})

