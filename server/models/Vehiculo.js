// import mongoose from "mongoose";

// const marcaSchema = new mongoose.Schema({
//     marca: {
//         type: String,
//         require: true,
//         trim: true
//     },
//     slugmarca: {
//         type: String,
//         require: true,
//         trim: true
//     }
// })

// export default mongoose.model('Marca', marcaSchema);

import mongoose from "mongoose";

// Esquema para los modelos de vehículos
const modeloSchema = new mongoose.Schema({
  modelo: {
    type: String,
    required: true,
    trim: true
  },
  slugmodelo: {
    type: String,
    required: true,
    trim: true
  },
  anios: [Number] 
});

// Esquema para las marcas de vehículos
const marcaSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: true,
    trim: true
  },
  slugmarca: {
    type: String,
    required: true,
    trim: true
  },
  modelos: [modeloSchema] 
});

export default mongoose.model('Vehiculo', marcaSchema);
