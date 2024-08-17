alert("Turister.com\n\n¡El mejor aliado para tus vacaciones!");

const container = document.getElementById("container");

class Destino {
    constructor(destino, duracion, tipoDeHotel, temporada, precio) {
        this.destino = destino;
        this.duracion = duracion;
        this.tipoDeHotel = tipoDeHotel;
        this.temporada = temporada;
        this.precio = precio;
    }

    getResumen() {
        return `${this.destino}: ${this.duracion} días, ${this.tipoDeHotel}. Temporada: ${this.temporada}. Precio: USD ${this.precio}`;
    }
}

const destinos = [
    new Destino("Dubai", 14, "Desayuno incluido", "Octubre - Noviembre", 3500),
    new Destino("Paris", 15, "Desayuno Incluido", "Marzo - Abril", 3300),
    new Destino("Londres", 12, "Desayuno Incluido", "Febrero - Abril", 3700),
    new Destino("Rio de Janeiro", 14, "Desayuno Incluido", "Diciembre - Abril", 2500),
    new Destino("Cancún", 14, "All Inclusive", "Diciembre - Enero", 3800),
    new Destino("Bariloche", 10, "Media Pensión", "Julio - Septiembre", 1500),
    new Destino("Iguazu", 6, "Media Pensión", "Mayo - Agosto", 1200),
];

// Clase Adicional
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

function crearCard(destino) {
    const card = document.createElement("div");
    card.className = "card";
    card.id = `Destino-${destino.destino}`;

    const titulo = document.createElement("h3");
    titulo.innerText = destino.destino;

    const duracion = document.createElement("p");
    duracion.innerText = `Duración: ${destino.duracion} días`;

    const tipoDeHotel = document.createElement("p");
    tipoDeHotel.innerText = `Tipo de hotel: ${destino.tipoDeHotel}`;

    const temporada = document.createElement("p");
    temporada.innerText = `Temporada: ${destino.temporada}`;

    const valor = document.createElement("p");
    valor.innerText = `Precio: USD ${destino.precio}`;

    const agregarAcesta = document.createElement("button");
    agregarAcesta.innerText = "Agregar a cesta";
    agregarAcesta.addEventListener("click", () => agregarDestinoACesta(destino));

    card.append(titulo, duracion, tipoDeHotel, temporada, valor, agregarAcesta);

    container.append(card);
}

function agregarDestinoACesta(destino) {
    carrito.destino = destino;
    actualizarCarrito();
    alert(`Destino ${destino.destino} agregado a la cesta.`);
}

function actualizarCarrito() {
    const carritoContainer = document.getElementById("carrito");
    carritoContainer.innerHTML = "";

    if (carrito.destino) {
        const destinoSeleccionado = document.createElement("p");
        destinoSeleccionado.innerText = `Destino: ${carrito.destino.getResumen()}`;
        carritoContainer.append(destinoSeleccionado);
    }

    if (carrito.adicionales.length > 0) {
        const adicionalesSeleccionados = document.createElement("ul");
        carrito.adicionales.forEach(adicional => {
            const adicionalItem = document.createElement("li");
            adicionalItem.innerText = `${adicional.cantidad} x ${adicional.tipodeadicional} (USD ${adicional.preciodeadicional} cada uno)`;
            adicionalesSeleccionados.append(adicionalItem);
        });
        carritoContainer.append(adicionalesSeleccionados);
    }

    if (!carrito.destino && carrito.adicionales.length === 0) {
        carritoContainer.innerText = "El carrito está vacío.";
    }
}

function mostrarAdicionales() {
    const adicionalesContainer = document.getElementById("adicionales");
    adicionalesContainer.innerHTML = "";

    adicionales.forEach((adicional, index) => {
        const adicionalDiv = document.createElement("div");

        const label = document.createElement("label");
        label.innerText = `${adicional.tipodeadicional} (USD ${adicional.preciodeadicional})`;

        const input = document.createElement("input");
        input.type = "number";
        input.min = 0;
        input.value = 0;
        input.addEventListener("change", () => {
            agregarAdicional(index, parseInt(input.value));
        });

        adicionalDiv.append(label, input);
        adicionalesContainer.append(adicionalDiv);
    });
}

function agregarAdicional(index, cantidad) {
    if (cantidad > 0) {
        carrito.adicionales[index] = {
            ...adicionales[index],
            cantidad: cantidad
        };
    } else {
        carrito.adicionales.splice(index, 1);
    }
    actualizarCarrito();
}

function inicializarInterfaz() {
    destinos.forEach(crearCard);
    mostrarAdicionales();
    actualizarCarrito();
}

window.onload = () => {
    inicializarInterfaz();
};
