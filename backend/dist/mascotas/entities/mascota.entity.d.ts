export declare enum EspecieMascota {
    PERRO = "perro",
    GATO = "gato",
    OTRO = "otro"
}
export declare enum EstadoMascota {
    PERDIDO = "perdido",
    ENCONTRADO = "encontrado",
    RESUELTO = "resuelto"
}
export declare class Mascota {
    id: string;
    titulo: string;
    especie: EspecieMascota;
    estado: EstadoMascota;
    barrio: string;
    tamano: string;
    color: string;
    descripcion: string;
    contacto: string;
    imagenUrl: string;
    recompensa: boolean;
    fechaPublicacion: Date;
}
