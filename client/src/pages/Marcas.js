import { useMarcas } from "../context/Context";
import { TablaMarcas } from "../components/TablaMarcas";
import { Link } from "react-router-dom";
import { Table } from 'react-bootstrap';

export function Marcas() {

    const { marcas } = useMarcas()

    if ( marcas.length === 0 ) return (
        <div className="text-center">
            <h3 className="text-light">No hay vehículos</h3>
            <Link to="/createmarca" className="btn btn-outline-primary mt-2">Crear nueva marca</Link>
        </div>
    )
    return (
        <div className="container border rounded my-5 py-5 px-1 p-md-3 text-white text-center">
            <header className="mb-5">
                <h1>Tabla de Marcas</h1>   
                <div className="mx-auto">
                    <Link to="/" className="btn btn-outline-primary me-1 me-sm-3 mt-2">Ir a Inicio</Link>
                    <Link to="/createmarca" className="btn btn-outline-primary mt-2">Crear nueva marca</Link>
                </div>            
            </header>

            <Table striped bordered hover responsive="md" variant="dark">
                <thead>
                    <tr>
                        <th>ID</th> 
                        <th>Marca</th>
                        <th>SlugMarca</th>
                        <th>Modelos</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                    {
                        [...marcas].sort((a, b) => a.marca.localeCompare(b.marca)).map(marca => (
                            <TablaMarcas marca={marca} key={marca._id}/>
                        ))
                    }
            </Table>
            
        </div>
    )
}


