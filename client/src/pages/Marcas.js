import { useMarcas } from "../context/Context";
import { TablaMarcas } from "../components/TablaMarcas";
import { Link } from "react-router-dom";

export function Marcas() {

    const { marcas } = useMarcas()

    if ( marcas.length === 0 ) return (
        <div>
            <h3>No hay vehículos</h3>
        </div>
    )
    return (
        <div>
            {
                marcas.map(marca => (
                    <TablaMarcas marca={marca} key={marca._id}/>
                ))
            }
            <Link to="/">Volver</Link>
            <Link to="/createmarca">Crear nueva marca</Link>
        </div>
    )
}


