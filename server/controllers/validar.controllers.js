import Vehiculo from "../models/Vehiculo.js";
import mongoose from "mongoose";

// Funciones para validar si el objeto _id es valido, y para validar si existe id en DB
// En caso de existir entrega un objeto con TRUE y su RESULTADO object()
// En caso de ser invalido o no existir, entrega FALSE con un mensaje de ERROR

export const validarIDMarca = async (marcaId) => {
    if ( !mongoose.Types.ObjectId.isValid(marcaId) ) {
        console.log("erroor al validar id")
        return { exito: false, error: "ID de marca inválido." };
    }

    const marca = await Vehiculo.findById(marcaId);

    return marca ? { exito: true, resultado: marca } : { exito: false, error: "Marca no encontrada." };
};

export const validarIDModelo = (modeloId, marca) => {
    if ( !mongoose.Types.ObjectId.isValid(modeloId) ) {
        return { exito: false, error: "ID de modelo inválido." };
    }

    const modelo = marca.modelos.find(modelo => modelo._id.toString() === modeloId);
    return modelo ? { exito: true, resultado: modelo } : { exito: false, error: "Modelo no encontrado." };
};

export const capitalizarPrimeraLetra = (cadena) => {
    if (!cadena) return '';
    return cadena.charAt(0).toUpperCase() + cadena.slice(1);
};