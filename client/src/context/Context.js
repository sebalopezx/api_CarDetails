import { useState, useContext, createContext, useEffect } from "react";
import { getMarcasRequest, createNewMarcaRequest, deleteMarcaRequest, getMarcaRequest, updateMarcaRequest } from "../api/marcas";

const contextMarcas = createContext()

export const useMarcas = () => {
    const context = useContext(contextMarcas)
    return context
}
// Provider
export const Container = ({ children }) => {

    const [marcas, setMarcas] = useState([])

    const getMarcas = async () => {
        const res = await getMarcasRequest()
        setMarcas(res.data)
    }

    const createNewMarca = async (marca) => {
        const res = await createNewMarcaRequest(marca)
        setMarcas([...marcas, res.data])
    }

    const deleteMarca = async (id) => {
        const res = await deleteMarcaRequest(id)
        if (res.status === 204) {
            setMarcas(marcas.filter((marca) => marca._id !== id))
        }
    }

    const getMarca = async (id) => {
        const res = await getMarcaRequest(id)
        return res
    }

    const updateMarca = async (id, updMarca) => {
        const res = await updateMarcaRequest(id, updMarca)
        setMarcas(marcas.map((marca) => (marca._id === id ? res.data : marca)))
    }

    useEffect(() => {
        getMarcas()
    }, [])

    return <contextMarcas.Provider value={{
        marcas,
        getMarcas,
        createNewMarca,
        deleteMarca,
        getMarca,
        updateMarca
    }}>
        {children}
    </contextMarcas.Provider>
}