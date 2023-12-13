import { Router } from "express";
import { getMarcas, createMarca, updateMarca, deleteMarca, getMarca } from '../controllers/url.controllers.js'

const router = Router(); 

router.get('/marcas', getMarcas);
router.post('/marcas', createMarca);
router.put('/marcas/:id', updateMarca);
router.delete('/marcas/:id', deleteMarca);
router.get('/marcas/:id', getMarca);

export default router;