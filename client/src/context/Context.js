import { useState, useContext, createContext, useEffect } from "react";
import { getVehiculosRequest, createNewMarcaRequest, deleteMarcaRequest, getMarcaRequest, updateMarcaRequest, getModelosRequest, createNewModeloRequest, deleteModeloRequest, getModeloRequest, updateModeloRequest } from "../api/api";

const contextMarcas = createContext()

export const useMarcas = () => {
    const context = useContext(contextMarcas)
    return context
}
// Provider
export const Container = ({ children }) => {

    const [marcas, setMarcas] = useState([])

    const getMarcas = async () => {
        const res = await getVehiculosRequest()
        setMarcas(res.data)
    };

    const createNewMarca = async (marca) => {
        const res = await createNewMarcaRequest(marca)
        setMarcas([...marcas, res.data])
        return res;
    };

    const deleteMarca = async (id) => {
        const res = await deleteMarcaRequest(id)
        if (res.status === 204) {
            setMarcas(marcas.filter((marca) => marca._id !== id))
        }
    };

    const getMarca = async (id) => {
        const res = await getMarcaRequest(id)
        return res
    };

    const updateMarca = async (id, updMarca) => {
        const res = await updateMarcaRequest(id, updMarca)
        setMarcas(marcas.map((marca) => (marca._id === id ? res.data : marca)))
        return res;
    };

    const getModelos = async (idMarca) => {
        const res = await getModelosRequest(idMarca)
        // setMarcas(res.data)
        console.log(res)
        return res
        // try {
        //     const res = await getModelosRequest(idMarca);
        //     if (res && res.data) {
        //         // En lugar de actualizar todo el estado de marcas, devuelve solo los datos de la marca específica
        //         return res.data;  
        //     }
        // } catch (error) {
        //     console.error("Error al obtener modelos:", error);
        //     return null;  // Devuelve null o un valor por defecto en caso de error
        // }
    }

    const createNewModelo = async (idmarca, modelo) => {
        try {
            const res = await createNewModeloRequest(idmarca, modelo);
            if (res && res.data) {
                // Encuentra la marca dentro del estado y actualízala
                setMarcas(marcas.map(marca => 
                    marca._id === idmarca 
                    ? { ...marca, modelos: [...marca.modelos, res.data] } 
                    : marca
                ));
            }
            return res;
        } catch (error) {
            console.error("Error al crear modelo:", error);
            return null;
        }
    }

    const deleteModelo = async (idmarca, idmodelo) => {
        try {
            const res = await deleteModeloRequest(idmarca, idmodelo);
            if (res.status === 204) {
                setMarcas(marcas.map(marca => {
                    if (marca._id === idmarca) {
                        // Filtra los modelos para eliminar el modelo específico
                        const modelosActualizados = marca.modelos.filter(modelo => modelo._id !== idmodelo);
                        return { ...marca, modelos: modelosActualizados };
                    }
                    return marca;
                }));
            }
        } catch (error) {
            console.error("Error al eliminar modelo:", error);
        }
    }

    const getModelo = async (idmarca, idmodelo) => {
        try {
            const res = await getModeloRequest(idmarca, idmodelo);
            return res
        } catch (error) {
            console.error("Error al obtener modelo:", error);
            return null;
        }
    }

    const updateModelo = async (idmarca, idmodelo, updModelo) => {
        try {
            const res = await updateModeloRequest(idmarca, idmodelo, updModelo);
            if (res && res.data) {
                // Encuentra la marca en el estado y actualiza el modelo específico
                setMarcas(marcas.map(marca => {
                    if (marca._id === idmarca) {
                        // Encuentra y actualiza el modelo específico dentro de la marca
                        const modelosActualizados = marca.modelos.map(modelo => {
                            if (modelo._id === idmodelo) {
                                return { ...modelo, ...res.data }; // Actualiza el modelo específico
                            }
                            return modelo;
                        });
                        return { ...marca, modelos: modelosActualizados };
                    }
                    return marca;
                }));
            }
            return res;
            // const res = await updateModeloRequest(idmarca, idmodelo, updModelo);
            // return res.data;
        } catch (error) {
            console.error("Error al actualizar modelo:", error);
            return null;
        }
    }

    useEffect(() => {
        getMarcas()
    }, []);

    return <contextMarcas.Provider value={{
        marcas,
        getMarcas,
        createNewMarca,
        deleteMarca,
        getMarca,
        updateMarca,
        getModelos,
        createNewModelo,
        deleteModelo,
        getModelo,
        updateModelo
    }}>
        {children}
    </contextMarcas.Provider>
}