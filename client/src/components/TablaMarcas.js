import { useMarcas } from "../context/Context";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BsFillPencilFill, BsXLg } from "react-icons/bs";
import { Button } from 'react-bootstrap';

export function TablaMarcas({ marca }) {

    const { deleteMarca } = useMarcas()
    const navigate = useNavigate()

    // toast para eliminar con el id de la marca como param
    const handleDelete = (id, marca) => {
        toast((t) => (
            <div className="text-center">
                <p>¿Estas seguro que deseas eliminar la marca <strong className="text-dark">{ marca }</strong>?</p>
                <div >
                    <Button variant="danger" size="sm" className="me-3"
                    onClick={() => {
                        deleteMarca(id);
                        toast.dismiss(t.id);
                        toast.success(`Marca ${marca} eliminada`);
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
                <td className="w-25">{marca._id}</td>
                <td>{marca.marca}</td>
                <td>{marca.slugmarca}</td>
                <td>
                    <Button variant="outline-info" size="sm" className="pt-0" 
                    onClick={() => navigate(`/marcas/${marca._id}/modelos`)}>
                        {marca.modelos.length}
                    </Button>
                </td>
                <td>
                    <Button variant="outline-warning" size="sm" className="pt-0"
                    onClick={() => navigate(`/marcas/${marca._id}/form`)}>
                        <BsFillPencilFill />
                    </Button>
                </td>
                <td>
                    <Button variant="outline-danger" size="sm" className="pt-0"
                    onClick={() => handleDelete(marca._id, marca.marca) }>
                        <BsXLg />
                    </Button>
                </td>
            </tr>
        </tbody>
        
    )
}

