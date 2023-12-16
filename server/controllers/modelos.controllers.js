import Vehiculo from "../models/Vehiculo.js";
import { capitalizarPrimeraLetra, validarIDMarca, validarIDModelo } from "./validar.controllers.js";
import slugify from 'slugify';

// export const getModelos = async (req, res) => {
//     try {
//         // throw new Error ("My error");
//         const modelos = await Vehiculo.find()
//         res.send(modelos)
//     } catch ( error ) {
//         return res.status(500).json({ message: error.message });
//     }
// };
// const formatoValidoID = (marcaId, modeloId) => {
//     return mongoose.Types.ObjectId.isValid(marcaId) && mongoose.Types.ObjectId.isValid(modeloId);
// }


// const validarIDMarca = async (marcaId) => {
//     const marca = await Vehiculo.findById(marcaId);
//     return marca ? marca : null;
// }

// const validarIDModelo = (modeloId, marca) => {
//     const modelo = marca.modelos.find(modelo => modelo._id.toString() === modeloId);
//     return modelo ? modelo : null;
// }




export const createModelo = async (req, res) => {
    try {
        const marcaId = req.params.marcaid;
        // Validar Marca
        const marca = await validarIDMarca( marcaId );
        if ( !marca.exito ) {
            return res.status(404).json({ message: marca.error });
        }

        const marcaObjeto = marca.resultado;
        let { modelo, anios } = req.body;
        modelo = capitalizarPrimeraLetra(modelo)
        const slugmodelo = slugify(modelo, { lower:true })

        // Validar su nombre de modelo ya existe:
        const modeloEnBD = marcaObjeto.modelos.some(m => m.modelo === modelo)
        if ( modeloEnBD ) return res.status(400).json({ message: "El modelo ya existe en Base de Datos."})

        const newModelo = await Vehiculo.findByIdAndUpdate( marcaId, {
            $push:{ 
                modelos: { modelo, slugmodelo, anios }
            }
        },{ new:true });

        res.json(newModelo);

    } catch ( error ) {
        return res.status(500).json({ message: error.message });
    }
};


export const updateModelo = async (req, res) => {
    try {
        const marcaId = req.params.marcaid;
        const modeloId = req.params.modeloid;
        let { modelo, anios } = req.body;
        modelo = capitalizarPrimeraLetra(modelo)
        const slugmodelo = slugify(modelo, { lower:true })

        // Validar Marca
        const marca_isvalid = await validarIDMarca( marcaId );
        if ( !marca_isvalid.exito ) {
            return res.status(404).json({ message: marca_isvalid.error });
        }
 
        // Validar Modelo
        const modelo_isvalid = validarIDModelo( modeloId, marca_isvalid.resultado );
        if ( !modelo_isvalid.exito ) {
            return res.status(404).json({ message: modelo_isvalid.error });
        }

        // Comprobar si existe el modelo
        const modeloEnBD = await marca_isvalid.resultado.modelos.some( m => m.modelo === modelo && m._id.toString() !== modeloId );
        if ( modeloEnBD ) return res.status(400).json({ message: "El nombre del modelo ya existe en Base de Datos."})
        // Verificar si alguno de los años ya existe en el modelo

        // Comprobar si hay años duplicados en los años proporcionados
        if (anios) {
            const unicosAnios = new Set(anios);
            if (unicosAnios.size !== anios.length) {
                return res.status(400).json({ message: "Los años proporcionados contienen duplicados." });
            }
        }

        const actualizarModelo = await Vehiculo.findOneAndUpdate( 
            { "_id": marcaId, "modelos._id": modeloId }, {
            $set: {
                "modelos.$.modelo": modelo,
                "modelos.$.slugmodelo": slugmodelo,
                "modelos.$.anios": anios
            }
        },{ new:true });

        res.send(actualizarModelo);
    } catch ( error ) {
        return res.status(500).json({ message: error.message });
    }
};


export const deleteModelo = async (req, res) => {
    try {
        const marcaId = req.params.marcaid;
        const modeloId = req.params.modeloid;

        // Validar Marca
        const marca = await validarIDMarca( marcaId );
        if ( !marca.exito ) {
            return res.status(404).json({ message: marca.error });
        }
 
        // Validar Vehiculo
        const modelo = validarIDModelo( modeloId, marca.resultado );
        if ( !modelo.exito ) {
            return res.status(404).json({ message: modelo.error });
        }

        // Si el modelo existe, proceder a eliminarlo
        await Vehiculo.findByIdAndUpdate(
            marcaId, 
            { $pull: { modelos: { _id: modeloId } } },
            { new: true }
        );

        return res.sendStatus(204);

    } catch ( error ) {
        return res.status(500).json({ message: error.message });
    }
};



export const getModelo = async (req, res) => {
    try {
        const marcaId = req.params.marcaid;
        const modeloId = req.params.modeloid;

        // Validar Marca
        const marca = await validarIDMarca( marcaId );
        if ( !marca.exito ) {
            return res.status(404).json({ message: marca.error });
        }
 
        // Validar Vehiculo
        const modelo = validarIDModelo( modeloId, marca.resultado );
        if ( !modelo.exito ) {
            return res.status(404).json({ message: modelo.error });
        }

        return res.json(modelo.resultado);

    } catch ( error ) {
        return res.status(500).json({ message: error.message });
    }
};



// export const agregarAniosModelo = async (req, res) => {
//     try {
//         const marcaId = req.params.marcaid;
//         const modeloId = req.params.modeloid;
//         const { anios } = req.body; // Años para agregar

//         // Encontrar la marca y el modelo específico
//         const marca = await Vehiculo.findById(marcaId);
//         if (!marca) return res.status(404).json({ message: "Marca no encontrada." });

//         const modelo = marca.modelos.find(m => m._id.toString() === modeloId);
//         if (!modelo) return res.status(404).json({ message: "Modelo no encontrado." });

//         // Agregar años, evitando duplicados
//         modelo.anios = Array.from(new Set([...modelo.anios, ...anios]));

//         await marca.save();
//         res.status(200).json(modelo);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };


// export const agregarAniosModelo = async (req, res) => {
//     try {
//         const marcaId = req.params.marcaid;
//         const modeloId = req.params.modeloid;
//         const { anios } = req.body; // Años para agregar

//         // Encontrar la marca y el modelo específico
//         const marca = await Vehiculo.findById(marcaId);
//         if (!marca) return res.status(404).json({ message: "Marca no encontrada." });

//         const modelo = marca.modelos.find(m => m._id.toString() === modeloId);
//         if (!modelo) return res.status(404).json({ message: "Modelo no encontrado." });

//         // Agregar años, evitando duplicados
//         modelo.anios = Array.from(new Set([...modelo.anios, ...anios]));

//         await marca.save();
//         res.status(200).json(modelo);
//     } catch (error) {
//         return res.status(500).json({ message: error.message });
//     }
// };
