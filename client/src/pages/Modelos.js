import { useMarcas } from "../context/Context";
import { TablaModelos } from "../components/TablaModelos";
import { Link, useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';

export function Modelos() {

    const [marca, setMarca] = useState(null);
    const { id } = useParams();
    const { getMarca } = useMarcas()
    // const navigate = useNavigate()

    useEffect(() => {
        const fetchMarca = async () => {
            const res = await getMarca(id);
            setMarca(res.data);
        };

        fetchMarca();
    }, [id, getMarca]);

    if ( !marca ) {
        return <div className="text-light">Cargando...</div>; 
    }
    
    if ( marca.modelos.length === 0 ) { return (
        <div className="text-center">
            <h3 className="text-light">No hay modelos</h3>
            <Link to={`/marcas/${marca._id}/createmodelo`} className="btn btn-outline-primary mt-2">Crear nuevo modelo</Link>
        </div>
    )}

    return (
        <div className="container border rounded my-5 py-5 px-1 p-md-3 text-white text-center">
            <header className="mb-5">
                <h1>Modelos de marca: <strong className="text-primary">{marca.marca}</strong></h1>
                <div className="">
                    <Link to="/" className="btn btn-outline-primary me-1 me-sm-3 mt-2">Ir a Inicio</Link>
                    <Link to="/vehiculos" className="btn btn-outline-primary me-1 me-sm-3 mt-2">Lista de marcas</Link>
                    <Link to={`/marcas/${marca._id}/createmodelo`} className="btn btn-outline-primary mt-2">Crear nuevo modelo</Link>
                </div>
            </header>

    
            <Table striped bordered hover responsive="md" variant="dark" className="table-rounded">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Modelo</th>
                        <th>SlugModelo</th>
                        <th>Años</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>

                {
                    marca.modelos
                    .slice() // Crea una copia para no modificar el array original
                    .sort((a, b) => a.modelo.localeCompare(b.modelo))
                    .map(modelo => (
                        <TablaModelos modelo={modelo} key={modelo._id} marcaid={marca._id}/>
                    ))
                }
        
            </Table>
        
         
       


        </div>
    )
}