import axios from "axios";


const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000'
});


// Listado vehiculos
export const getVehiculosRequest = async () => await api.get('/vehiculos')


// Marcas
export const createNewMarcaRequest = async (marca) => await api.post('/marcas', marca)

export const deleteMarcaRequest = async (id) => await api.delete(`/marcas/${id}`)

export const getMarcaRequest = async (id) => await api.get(`/marcas/${id}`)

export const updateMarcaRequest = async (id, updMarca) => await api.put(`/marcas/${id}`, updMarca)


// Modelos
export const getModelosRequest = async (idmarca) => await api.post(`/marcas/${idmarca}/modelos/`)

export const createNewModeloRequest = async (idmarca, modelo) => await api.post(`/marcas/${idmarca}/modelos/`, modelo)

export const deleteModeloRequest = async (idmarca, idmodelo) => await api.delete(`/marcas/${idmarca}/modelos/${idmodelo}`)

export const getModeloRequest = async (idmarca, idmodelo) => await api.get(`/marcas/${idmarca}/modelos/${idmodelo}`)

export const updateModeloRequest = async (idmarca, idmodelo, updModelo) => await api.put(`/marcas/${idmarca}/modelos/${idmodelo}`, updModelo)