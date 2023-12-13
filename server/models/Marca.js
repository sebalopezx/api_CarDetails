import mongoose from "mongoose";

const marcaSchema = new mongoose.Schema({
    marca: {
        type: String,
        require: true,
        trim: true
    },
    slugmarca: {
        type: String,
        require: true,
        trim: true
    }
})

export default mongoose.model('Marca', marcaSchema);