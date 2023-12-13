import toast from "react-hot-toast";
import { useMarcas } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { BsFillPencilFill, BsXLg } from "react-icons/bs";

export function TablaMarcas({ marca }) {

    const { deleteMarca } = useMarcas()
    const navigate = useNavigate()

    // toast para eliminar con el id de la marca como param
    const handleDelete = (id, marca) => {
        toast((t) => (
            <div>
                <p>¿Estas seguro que deseas eliminar la marca <strong>{marca}</strong>?</p>
                <div>
                    <button onClick={() => {
                        deleteMarca(id);
                        toast.dismiss(t.id);
                        }}>
                            Eliminar
                    </button>
                    <button onClick={() => toast.dismiss(t.id)}>Cancelar</button>
                </div>
            </div>
        ), {
            position: "bottom-center",
            style: {background: "#808080"}
        })
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Marca</th>
                    <th>SlugMarca</th>
                    <th>Editar</th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{marca.marca}</td>
                    <td>{marca.slugmarca}</td>
                    <td>
                        <button onClick={() => navigate(`/marcas/${marca._id}`)}>
                            <BsFillPencilFill />
                        </button>
                    </td>
                    <td>
                        <button onClick={() => handleDelete(marca._id, marca.marca) }>
                            <BsXLg />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

