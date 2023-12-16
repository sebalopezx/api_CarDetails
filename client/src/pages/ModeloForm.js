import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as yup from "yup";
import { useMarcas } from "../context/Context";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from 'react-bootstrap';


export function ModeloForm() {

    const { createNewModelo, getModelo, updateModelo } = useMarcas()
    const navigate = useNavigate()
    const params = useParams()

    // instancia de marca a editar
    const [modelo, setModelo] = useState({
        modelo: '',
        slugmodelo: '',
        anios: []
    })

    useEffect(() => {
        (async () => {
            if (params.idmarca && params.idmodelo) {
                const res = await getModelo(params.idmarca, params.idmodelo);
                setModelo(res.data);
            }
        })();
    }, [params.idmarca, params.idmodelo, getModelo]);

    const validationSchema = yup.object({
        modelo: yup.string().required("El nombre del modelo es requerido."),
        // slugmodelo: yup.string().required("El slug del modelo es requerido."),
        anios: yup.array().of(yup.number()).notRequired("Los años son requeridos.")
    });

    const handleSubmit = async (values, actions) => {
        if (params.idmodelo) {
            try {
                const res = await updateModelo(params.idmarca, params.idmodelo, values);
                console.log(res)
                if (res.status === 200) {
                    toast.success(`Modelo ${values.modelo} actualizado`);
                } else if (res.status === 400 || res.status === 500) {
                    toast.error(`Error al actualizar modelo`);
                }
            } catch ( error ) {
                toast.error(`Error: Modelo ${values.modelo} o año ya existe`);
            }
        } else {
            try {
                const res = await createNewModelo(params.idmarca, values);
                if (res.status === 200) {
                    toast.success(`Modelo ${values.modelo} creado`);
                } else if (res.status === 400 || res.status === 500) {
                    toast.error(`Error al crear modelo`);
                }
            } catch ( error ){
                toast.error(`Error: Modelo ${values.modelo} o año ya existe`);
            }
        }
        actions.setSubmitting(false);
        navigate(`/marcas/${params.idmarca}/modelos`);
    };
    
    return (
        <div className="container text-white text-center border rounded m-auto py-5">
            <header>
                <h1 className="mb-5">Formulario Modelo</h1>
            </header>

            <Formik 
                initialValues={ modelo }
                validationSchema={ validationSchema }
                onSubmit={ handleSubmit }
                enableReinitialize={ true }
            >
                {({ values, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit}>

                        <label htmlFor="modelo" className="form-label">Nombre del Modelo</label>
                        <Field name="modelo" placeholder="Ingresa la modelo" className="form-control w-50 mx-auto" />
                        <ErrorMessage component="p" name="modelo" className="mt-2 text-danger"/>

                        {/* <label htmlFor="slugmodelo">SlugModelo</label>
                        <Field name="slugmodelo" placeholder="Ingresa el slugmodelo" />
                        <ErrorMessage component="p" name="slugmodelo" /> */}

                        {/* <label htmlFor="anios">Años</label>
                        <Field name="anios" placeholder="Ingresa los años" />
                        <ErrorMessage component="p" name="anios" /> */}

                        <label htmlFor="anios" className="form-label">Años</label>
                        <FieldArray
                        name="anios"
                        render={({ remove, push }) => (
                            <div>
                                {values.anios.length > 0 && values.anios.map((anio, index) => (
                                    <div key={index}>
                                        <Field name={`anios.${index}`} type="number" className="form-control w-25 d-inline mx-auto mb-1 "/>
                                        <Button variant="outline-danger" size="sm" className="mb-1 mx-2"
                                        type="button" onClick={() => remove(index)}> 
                                        - 
                                        </Button>
                                        {index === values.anios.length - 1 && (
                                            <Button variant="outline-success" size="sm" className="mb-1"
                                            type="button" onClick={() => push('')}>
                                                + 
                                            </Button>
                                        )}
                                    </div>
                                ))}
                                {values.anios.length === 0 && 
                                    <Button variant="outline-info" size="md" 
                                    type="button" onClick={() => push('')}>
                                        Agregar Año
                                    </Button>}
                            </div>
                        )}
                        />
                        <ErrorMessage component="p" name="anios" className="mt-2 text-danger"/>

                        <Button variant="outline-success" size="md" className="mt-3"
                        type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Cargando' : 'Save'}
                        </Button>
                    </Form>
                )}
            </Formik>

            <div className="mt-5">
                <Link to="/" className="btn btn-outline-primary me-1 me-sm-3 mt-2">Ir a Inicio</Link>
                <Link to="/vehiculos" className="btn btn-outline-primary me-1 me-sm-3 mt-2">Listado de marcas</Link>
                <Link to={`/marcas/${params.idmarca}/modelos/`} className="btn btn-outline-primary mt-2">Listado de modelo seleccionado</Link>
            </div>
        </div>
    )
}