import { Router } from "express";
import { createMarca, updateMarca, deleteMarca, getMarca } from '../controllers/marcas.controllers.js'
import { createModelo, updateModelo, deleteModelo, getModelo } from '../controllers/modelos.controllers.js'
import { getVehiculos } from "../controllers/vehiculos.controllers.js";

const router = Router(); 

router.get('/vehiculos', getVehiculos);

router.post('/marcas', createMarca);
router.put('/marcas/:id', updateMarca);
router.delete('/marcas/:id', deleteMarca);
router.get('/marcas/:id', getMarca);

// router.get('/modelos', getModelos);
router.post('/marcas/:marcaid/modelos', createModelo);
router.put('/marcas/:marcaid/modelos/:modeloid', updateModelo);
router.delete('/marcas/:marcaid/modelos/:modeloid', deleteModelo);
router.get('/marcas/:marcaid/modelos/:modeloid', getModelo);



export default router;