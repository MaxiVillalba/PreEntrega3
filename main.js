alert("Turister.com\n\n¡El mejor aliado para tus vacaciones!");

let fechadehoy = new Date("2024-08-01");
fechadehoy.toLocaleString();

class Destino {
    constructor(destino, duracionyhotel, fechas, precio) {
        this.destino = destino;
        this.duracionyhotel = duracionyhotel;
        this.fechas = fechas;
        this.precio = precio;
    }
}

const destinos = [
    new Destino("Dubai", "14 días, desayuno incluido", "Octubre - Noviembre", 3500),
    new Destino("Paris", "15 días, desayuno incluido", "Marzo - Abril", 3300),
    new Destino("Londres", "12 días, desayuno incluido", "Febrero - Abril", 3700),
    new Destino("Rio de Janeiro", "14 días, desayuno incluido", "Diciembre - Abril", 2500)
];

class Adicional {
    constructor(tipodeadicional, preciodeadicional) {
        this.tipodeadicional = tipodeadicional;
        this.preciodeadicional = preciodeadicional;
    }
}

const adicionales = [
    new Adicional("Seguro de viaje por persona y día", 10),
    new Adicional("Alquiler de auto por día", 45),
    new Adicional("Traslados internos por persona y día", 15)
];

let carrito = {
    destino: null,
    adicionales: []
};

function solicitarEdad() {
    return parseInt(prompt("Por favor, ingresa tu edad:"));
}

function verificarMayorDeEdad(edad) {
    return edad >= 18;
}

function solicitarNombre() {
    return prompt("Eres mayor de edad.\n\nIndícanos tu nombre:");
}

function mostrarMensajeBienvenida(nombre) {
    alert("¡Te damos la bienvenida a Turister " + nombre + "!");
}

function mostrarMenu(nombre) {
    alert("A continuación " + nombre + " te indicaremos nuestras opciones de destinos, costos de financiación y adicionales que tenemos disponibles para tus vacaciones.");
}

function seleccionarOpcion() {
    return parseInt(prompt("Menú de opciones\n\n1. Dubai\n2. Paris\n3. Londres\n4. Rio de Janeiro\n5. Calcular valor de financiación con nuestro recargo del 71%\n6. Avanzar con el menú de adicionales\n7. Ver carrito\n8. Consultar otras opciones\n\nPara salir, ingrese 0"));
}

function mostrarInformacionDestino(destinoSeleccionado) {
    let mensaje = `${destinoSeleccionado.destino} 2024/2025 - Vuelo + Hotel:\n\n${destinoSeleccionado.duracionyhotel}\n${destinoSeleccionado.fechas}\nUSD ${destinoSeleccionado.precio} (Base Doble)`;

    const cuotas6 = (destinoSeleccionado.precio * 1.71 / 6).toFixed(2);
    const cuotas12 = (destinoSeleccionado.precio * 1.71 / 12).toFixed(2);
    mensaje += `\n\nCosto en 6 cuotas: USD ${cuotas6} por cuota.\nCosto en 12 cuotas: USD ${cuotas12} por cuota.`;
    alert(mensaje);
}

function calcularFinanciacion() {
    const ValorAFinanciar = parseFloat(prompt("Ingrese el monto a financiar en 12 cuotas"));
    const valorTotal = (ValorAFinanciar * 1.71).toFixed(2);
    alert("El valor total de financiación es de USD " + valorTotal);
}

function seleccionarAdicionales() {
    carrito.adicionales = [];

    let menuAdicionales = "Selecciona el tipo de adicional que deseas agregar:\n";
    adicionales.forEach((adicional, index) => {
        menuAdicionales += `${index + 1}. ${adicional.tipodeadicional} (USD ${adicional.preciodeadicional} cada uno)\n`;
    });
    menuAdicionales += "Para salir, ingrese 0";

    let opcionAdicional;
    do {
        opcionAdicional = parseInt(prompt(menuAdicionales));

        if (opcionAdicional > 0 && opcionAdicional <= adicionales.length) {
            const adicionalSeleccionado = adicionales[opcionAdicional - 1];
            const cantidad = parseInt(prompt(`¿Cuántos ${adicionalSeleccionado.tipodeadicional} desea añadir? (USD ${adicionalSeleccionado.preciodeadicional} cada uno)`));
            
            if (isNaN(cantidad) || cantidad < 0) {
                alert("Cantidad inválida, se considerará 0.");
                cantidad = 0;
            }
            
            if (cantidad > 0) {
                carrito.adicionales.push({
                    tipodeadicional: adicionalSeleccionado.tipodeadicional,
                    cantidad: cantidad,
                    preciodeadicional: adicionalSeleccionado.preciodeadicional
                });
            }
        } else if (opcionAdicional !== 0) {
            alert("Opción inválida. Ingresa una opción válida.");
        }
    } while (opcionAdicional !== 0);

    // Calcular el costo total usando reduce
    const totalAdicionales = carrito.adicionales.reduce((total, adicional) => {
        return total + (adicional.cantidad * adicional.preciodeadicional);
    }, 0);

    alert(`El costo total de los adicionales seleccionados es de USD ${totalAdicionales.toFixed(2)}`);
    return totalAdicionales;
}

function mostrarCarrito() {
    let mensaje = "Resumen de tu carrito:\n\n";

    if (carrito.destino) {
        mensaje += `Destino seleccionado:\n${carrito.destino.destino}\nUSD ${carrito.destino.precio}\n\n`;
    } else {
        mensaje += "No has seleccionado un destino.\n\n";
    }

    if (carrito.adicionales.length > 0) {
        mensaje += "Adicionales:\n";
        carrito.adicionales.forEach(adicional => {
            mensaje += `${adicional.cantidad} x ${adicional.tipodeadicional} (USD ${adicional.preciodeadicional} cada uno)\n`;
        });
    } else {
        mensaje += "No has seleccionado adicionales.\n";
    }

    alert(mensaje);
}

function buscarCoincidencias() {
    let tipoBusqueda = prompt("¿Qué deseas buscar?\n1. Destinos\n2. Adicionales");

    if (tipoBusqueda === '1') {
        let buscarDestino = prompt("Ingrese el nombre del destino que desea buscar:");
        const resultadoDestino = destinos.find(destino => destino.destino.toLowerCase().includes(buscarDestino.toLowerCase()));
        if (resultadoDestino) {
            alert(`Destino encontrado:\n${resultadoDestino.destino}\n${resultadoDestino.duracionyhotel}\n${resultadoDestino.fechas}\nUSD ${resultadoDestino.precio}`);
        } else {
            alert("Destino no encontrado.");
        }
    } else if (tipoBusqueda === '2') {
        let buscarAdicional = prompt("Ingrese el tipo de adicional que desea buscar:");
        const resultadoAdicional = adicionales.find(adicional => adicional.tipodeadicional.toLowerCase().includes(buscarAdicional.toLowerCase()));
        if (resultadoAdicional) {
            alert(`Adicional encontrado:\n${resultadoAdicional.tipodeadicional}\nUSD ${resultadoAdicional.preciodeadicional}`);
        } else {
            alert("Adicional no encontrado.");
        }
    } else {
        alert("Opción inválida.");
    }
}

function iniciarProceso() {
    const edad = solicitarEdad();

    if (verificarMayorDeEdad(edad)) {
        const nombre = solicitarNombre();
        mostrarMensajeBienvenida(nombre);
        mostrarMenu(nombre);

        let opcion;
        let destinoSeleccionado = null;

        do {
            opcion = seleccionarOpcion();

            switch (opcion) {
                case 1:
                case 2:
                case 3:
                case 4:
                    destinoSeleccionado = destinos[opcion - 1];
                    mostrarInformacionDestino(destinoSeleccionado);
                    carrito.destino = destinoSeleccionado;
                    break;
                case 5:
                    calcularFinanciacion();
                    break;
                case 6:
                    if (destinoSeleccionado) {
                        seleccionarAdicionales();
                    } else {
                        alert("Seleccione primero un destino.");
                    }
                    break;
                case 7:
                    mostrarCarrito();
                    break;
                case 8:
                    buscarCoincidencias();
                    break;
                default:
                    if (opcion !== 0) {
                        alert("Opción inválida. Ingresa una opción válida");
                    }
                    break;
            }
        } while (opcion !== 0);
    } else {
        alert("Eres menor de 18 años. No puedes avanzar.");
    }
}

iniciarProceso();

