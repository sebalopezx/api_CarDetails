import Vehiculo from "../models/Vehiculo.js";
import { capitalizarPrimeraLetra, validarIDMarca } from "./validar.controllers.js";
import slugify from 'slugify';

// export const getMarcas = async (req, res) => {
//     try {
//         // throw new Error ("My error");
//         const marcas = await Vehiculo.find()
//         res.send(marcas)
//     } catch ( error ) {
//         return res.status(500).json({ message: error.message });
//     }
// };



export const createMarca = async (req, res) => {
    try {
        let { marca } = req.body;
        marca = capitalizarPrimeraLetra(marca)
        const slugmarca = slugify(marca, { lower:true });

        // PROBAR
        const marcaEnBD = await Vehiculo.findOne({ marca: marca })
        if ( marcaEnBD ) return res.status(400).json({ message: "La marca ya existe en Base de Datos."})

        const newMarca = new Vehiculo({ marca, slugmarca, modelos:[] });
        await newMarca.save();

        res.json(newMarca);
    } catch ( error ) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateMarca = async (req, res) => {
    try {
        const marcaId = req.params.id;
        let { marca } = req.body;
        marca = capitalizarPrimeraLetra(marca)
        const slugmarca = slugify(marca, { lower:true })

        // Validar Vehiculo
        const marca_isvalid = await validarIDMarca( marcaId );
        if ( !marca_isvalid.exito ) {
            return res.status(404).json({ message: marca_isvalid.error });
        }

        const marcaEnBD = await Vehiculo.findOne({ marca: marca, _id: { $ne: marcaId } })
        if ( marcaEnBD ) return res.status(400).json({ message: "El nombre de la marca ya existe en Base de Datos."})

        const actualizarMarca = await Vehiculo.findByIdAndUpdate( marcaId, {
            marca, slugmarca }, { new:true } );
        res.send(actualizarMarca);
    } catch ( error ) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteMarca = async (req, res) => {
    try {
        const marcaId = req.params.id;

        // Validar Vehiculo
        const marca = await validarIDMarca( marcaId );
        if ( !marca.exito ) {
            return res.status(404).json({ message: marca.error });
        }
        const eliminarMarca = await Vehiculo.findByIdAndDelete( marcaId );
        if ( !eliminarMarca ) return res.sendStatus(404);
        return res.sendStatus(204);
    } catch ( error ) {
        return res.status(500).json({ message: error.message });
    }
};

export const getMarca = async (req, res) => {
    try {
        const marcaId = req.params.id;

        // Validar Vehiculo
        const marca = await validarIDMarca( marcaId );
        if ( !marca.exito ) {
            return res.status(404).json({ message: marca.error });
        }

        const marcaGet = await Vehiculo.findById( marcaId );
        if ( !marcaGet ) return res.sendStatus(404);

        return res.json(marcaGet);
    } catch ( error ) {
        return res.status(500).json({ message: error.message });
    }
};

// export const getMarca = async (req, res) => {
//     try {
//         const marcaId = req.params.id;
//         console.log("marcaId:", marcaId);
        
//         const marca = await Vehiculo.findById(marcaId);
//         console.log("Resultado de buscar la marca:", marca);

//         if (!marca) {
//             return res.status(404).json({ message: "Marca no encontrada." });
//         }
//         return res.json(marca);
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//     }
// };
