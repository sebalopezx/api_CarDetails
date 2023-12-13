import axios from "axios";

export const getMarcasRequest = async () => await axios.get('/marcas')

export const createNewMarcaRequest = async (marca) => await axios.post('/marcas', marca)

export const deleteMarcaRequest = async (id) => await axios.delete(`/marcas/${id}`)

export const getMarcaRequest = async (id) => await axios.get(`/marcas/${id}`)

export const updateMarcaRequest = async (id, updMarca) => await axios.put(`/marcas/${id}`, updMarca)
