import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useMarcas } from "../context/Context";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

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



    return (
        <div>
            <header>
                <h3>Formulario</h3>
                <Link to="/marcas">Volver</Link>
            </header>

            <Formik initialValues={ marca }
                validationSchema={yup.object({
                    marca: yup.string().required("El nombre es requerido."),
                    slugmarca: yup.string().required("El sub nombre es requerido.")
                })}
                onSubmit={async (values, actions) => {
                    if ( params.id ){
                        await updateMarca(params.id, values)
                    } else{
                        await createNewMarca(values)
                    }
                    actions.setSubmitting(false)
                    navigate('/marcas')
                }}
                enableReinitialize={true}
            >
                {({ handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>
                        
                        <label htmlFor="marca">Marca</label>
                        <Field name="marca" placeholder="Ingresa la marca" />
                        <ErrorMessage component="p" name="marca" />

                        <label htmlFor="slugmarca">SlugMarca</label>
                        <Field name="slugmarca" placeholder="Ingresa el slugmarca" />
                        <ErrorMessage component="p" name="slugmarca" />

                        <button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Cargando' : 'Save'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

