
const destinos = [
    {
        destino: "Dubai",
        duracion: 14,
        tipoDeHotel: "Desayuno incluido",
        temporada: "Octubre - Noviembre",
        valor: 3500,
    },
    {
        destino: "Paris",
        duracion: 15,
        tipoDeHotel: "Desayuno Incluido",
        temporada: "Marzo - Abril",
        valor: 3300,
    },
    {
        destino: "Londres",
        duracion: 12,
        tipoDeHotel: "Desayuno Incluido",
        temporada: "Febrero - Abril",
        valor: 3700,
    },
    {
        destino: "Rio de Janeiro",
        duracion: 14,
        tipoDeHotel: "Desayuno Incluido",
        temporada: "Diciembre - Abril",
        valor: 2500,
    },
    {
        destino: "Cancún",
        duracion: 14,
        tipoDeHotel: "All Inclusive",
        temporada: "Diciembre - Enero",
        valor: 3800,
    },
    {
        destino: "Bariloche",
        duracion: 10,
        tipoDeHotel: "Media Pensión",
        temporada: "Julio - Septiembre",
        valor: 1500,
    },
    {
        destino: "Iguazu",
        duracion: 6,
        tipoDeHotel: "Media Pensión",
        temporada: "Mayo - Agosto",
        valor: 1200,
    },
];

class Destino {
    constructor(destino, duracion, tipoDeHotel, temporada, valor) {
        this.destino = destino;
        this.duracion = duracion;
        this.tipoDeHotel = tipoDeHotel;
        this.temporada = temporada;
        this.valor = valor;
    }

    getResumen() {
        return `${this.destino}: ${this.duracion} días, ${this.tipoDeHotel}. Temporada: ${this.temporada}. Precio: $${this.valor}`;
    }
}

const destinosInstancias = destinos.map(d => new Destino(d.destino, d.duracion, d.tipoDeHotel, d.temporada, d.valor));

destinosInstancias.forEach(destino => {
    console.log(destino.getResumen());
});


