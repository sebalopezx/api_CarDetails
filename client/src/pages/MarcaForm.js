import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useMarcas } from "../context/Context";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from 'react-bootstrap';


export function MarcaForm() {

    const { createNewMarca, getMarca, updateMarca } = useMarcas()
    const navigate = useNavigate()
    const params = useParams()
    
    // instancia de marca a editar
    const [marca, setMarca] = useState({
        marca: '',
        slugmarca: ''
    })

    useEffect(() => {
        (async () => {
            if ( params.id ){
                const res = await getMarca(params.id)
                setMarca(res.data)
            }
        })();
    }, [params.id, getMarca])

    const validationSchema = yup.object({
        marca: yup.string().required("El nombre es requerido."),
        // slugmarca: yup.string().required("El sub nombre es requerido.")
    })

    const handleSubmit = async (values, actions) => {
        if ( params.id ){
            try {
                const res = await updateMarca(params.id, values);
                if (res.status === 200) {
                    toast.success(`Marca ${values.marca} actualizada`);
                } else if (res.status === 400 || res.status === 500) {
                    toast.error(`Error al actualizar marca`);
                }
            } catch (error) {
                toast.error(`Error al actualizar marca`);
            }
        } else{
            try {
                const res = await createNewMarca(values);
                if (res.status === 200) {
                    toast.success(`Marca ${values.marca} creada`);
                } else if (res.status === 400 || res.status === 500) {
                    toast.error(`Error al crear marca`);
                }
            } catch (error) {
                toast.error(`Error: "Marca ya podria existir"`);
            }
        }
        actions.setSubmitting(false)
        navigate('/vehiculos')
    }

    return (
        <div className="container text-white text-center border rounded m-auto py-5">
            <header>
                <h1 className="mb-5">Formulario Marcas</h1>
            </header>

            <Formik 
                initialValues={ marca }
                validationSchema={ validationSchema }
                onSubmit={ handleSubmit }
                enableReinitialize={true}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <Form className=""
                    onSubmit={handleSubmit}>
                        
                        <label htmlFor="marca" className="form-label">Nombre de la Marca</label>
                        <Field name="marca" placeholder="Ingresa la marca" className="form-control w-50 mx-auto" />
                        <ErrorMessage component="p" name="marca" className="mt-2 text-danger"/>

                        {/* <label htmlFor="slugmarca">SlugMarca</label>
                        <Field name="slugmarca" placeholder="Ingresa el slugmarca" />
                        <ErrorMessage component="p" name="slugmarca" /> */}

                        <Button variant="outline-success" size="md" className="mt-3"
                        type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Cargando' : 'Guardar'}
                        </Button>
                    </Form>
                )}
            </Formik>

            <div className="mt-5">
                <Link to="/" className="btn btn-outline-primary me-1 me-sm-3 mt-2">Ir a Inicio</Link>
                <Link to="/vehiculos" className="btn btn-outline-primary mt-2">Listado de marcas</Link>
            </div>
        </div>
    )
}

