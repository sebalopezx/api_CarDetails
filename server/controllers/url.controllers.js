import Marca from "../models/Marca.js";

export const getMarcas = async (req, res) => {
    try {
        // throw new Error ("My error");
        const marcas = await Marca.find()
        res.send(marcas)
    } catch ( error ) {
        return res.status(500).json({ message: error.message });
    }
};

export const createMarca = async (req, res) => {
    try {
        const { marca, slugmarca } = req.body;
        const newMarca = new Marca({ marca, slugmarca });
        await newMarca.save();
        res.json(newMarca);
    } catch ( error ) {
        return res.status(500).json({ message: error.message });
    }
    // res.send('Creando nuevo vehículo');
};

export const updateMarca = async (req, res) => {
    try {
        const actualizarMarca = await Marca.findByIdAndUpdate(req.params.id, req.body, { new:true });
        res.send(actualizarMarca);
    } catch ( error ) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteMarca = async (req, res) => {
    try {
        const eliminarMarca = await Marca.findByIdAndDelete(req.params.id);
        if ( !eliminarMarca ) return res.sendStatus(404);
        return res.sendStatus(204);
    } catch ( error ) {
        return res.status(500).json({ message: error.message });
    }
};

export const getMarca = async (req, res) => {
    try {
        const marca = await Marca.findById(req.params.id);
        if ( !marca ) return res.sendStatus(404);
        return res.json(marca);
    } catch ( error ) {
        return res.status(500).json({ message: error.message });
    }
};