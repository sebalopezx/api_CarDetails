import { useMarcas } from "../context/Context";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { BsFillPencilFill, BsXLg } from "react-icons/bs";
import { Button } from 'react-bootstrap';

export function TablaModelos({ modelo, marcaid }) {

    const { deleteModelo } = useMarcas()
    const navigate = useNavigate()

    const handleDeleteModelo = (idmarca, idmodelo, modelo) => {
        toast((t) => (
            <div className="text-center">
                <p>¿Estas seguro que deseas eliminar el modelo <strong className="text-dark">{ modelo }</strong>?</p>
                <div>
                    <Button variant="danger" size="sm" className="me-3"
                    onClick={() => {
                        deleteModelo(idmarca, idmodelo);
                        toast.dismiss(t.id);
                        toast.success(`Marca ${modelo} eliminada`);
                        }}>
                            Eliminar
                    </Button>
                    <Button variant="warning" size="sm" 
                    onClick={() => {
                        toast.dismiss(t.id);
                        toast.error(`Eliminación cancelada`);
                        }}>
                            Cancelar
                    </Button>
                </div>
            </div>
        ), {
            position: "bottom-center",
            style: {background: "#808080", color: "#fff"}
        })
    }

    return (
        <tbody>
                                           
            <tr>
                <td className="w-25">{modelo._id}</td>
                <td>{modelo.modelo}</td>
                <td>{modelo.slugmodelo}</td>
                <td style={{ whiteSpace: 'nowrap' }}>{modelo.anios.slice(0, 3).join(', ')} {modelo.anios.length > 3 && '...'}</td>
                <td>
                    <Button variant="outline-warning" size="sm" className="pt-0"
                    onClick={() => navigate(`/marcas/${marcaid}/modelos/${modelo._id}/form`)}>
                        <BsFillPencilFill />
                    </Button>
                </td>
                <td>
                    <Button variant="outline-danger" size="sm" className="pt-0"
                    onClick={() => handleDeleteModelo(marcaid, modelo._id, modelo.modelo) }>
                        <BsXLg />
                    </Button>
                </td>
            </tr>

        </tbody>
   
    );
}