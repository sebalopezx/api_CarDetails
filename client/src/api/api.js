import axios from "axios";

// Listado vehiculos
export const getVehiculosRequest = async () => await axios.get('/vehiculos')


// Marcas
export const createNewMarcaRequest = async (marca) => await axios.post('/marcas', marca)

export const deleteMarcaRequest = async (id) => await axios.delete(`/marcas/${id}`)

export const getMarcaRequest = async (id) => await axios.get(`/marcas/${id}`)

export const updateMarcaRequest = async (id, updMarca) => await axios.put(`/marcas/${id}`, updMarca)


// Modelos
export const getModelosRequest = async (idmarca) => await axios.post(`/marcas/${idmarca}/modelos/`)

export const createNewModeloRequest = async (idmarca, modelo) => await axios.post(`/marcas/${idmarca}/modelos/`, modelo)

export const deleteModeloRequest = async (idmarca, idmodelo) => await axios.delete(`/marcas/${idmarca}/modelos/${idmodelo}`)

export const getModeloRequest = async (idmarca, idmodelo) => await axios.get(`/marcas/${idmarca}/modelos/${idmodelo}`)

export const updateModeloRequest = async (idmarca, idmodelo, updModelo) => await axios.put(`/marcas/${idmarca}/modelos/${idmodelo}`, updModelo)