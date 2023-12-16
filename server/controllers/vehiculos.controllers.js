import Vehiculo from "../models/Vehiculo.js";

export const getVehiculos = async (req, res) => {
    try {
        // throw new Error ("My error");
        const vehiculos = await Vehiculo.find()
        res.send(vehiculos)
    } catch ( error ) {
        return res.status(500).json({ message: error.message });
    }
};