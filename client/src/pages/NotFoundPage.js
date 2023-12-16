import { Link } from "react-router-dom";

export function NotFoundPage() {
    return (
        <div className="text-light">
            <h1>404 Not Found !</h1>
            <p>No existe la ruta buscada</p>
            <div>
                <Link to={"/"}>Volver al inicio</Link>
            </div>
        </div>
    )
}

