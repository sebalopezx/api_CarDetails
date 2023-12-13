import { useMarcas } from "../context/Context";
import { Link } from "react-router-dom";

export function HomePage() {

    const { marcas } = useMarcas()

    return (
    <div>
        HomePage
        <br></br>
        <Link to='/marcas'>Marcas ({marcas.length})</Link>
        <br></br>
        <Link to='/createmarca'>Crear nueva marca</Link>

    </div>
  )
}


