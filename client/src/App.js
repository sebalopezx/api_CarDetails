import React from 'react'
import { HomePage, Marcas, MarcaForm, NotFoundPage, Modelos, ModeloForm } from "./pages/Url"
import { Routes, Route } from 'react-router-dom'
import { Container } from "./context/Context";
import { Toaster } from "react-hot-toast";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <div className='bg-dark d-flex flex-column min-vh-100 justify-content-center align-items-center'>

            <Container className="flex-grow-1">
                <Routes>
                    <Route path='/' element= {<HomePage/>} ></Route>
                    <Route path='/vehiculos' element= {<Marcas/>} ></Route>
                    <Route path='/createmarca' element= {<MarcaForm/>} ></Route>
                    <Route path='/marcas/:id/form' element= {<MarcaForm/>} ></Route>
                    <Route path='/marcas/:id/modelos' element= {<Modelos/>} ></Route>
                    <Route path='/marcas/:idmarca/createmodelo' element= {<ModeloForm/>} ></Route>
                    <Route path='/marcas/:idmarca/modelos/:idmodelo/form' element= {<ModeloForm/>} ></Route>
                    <Route path='*' element= {<NotFoundPage/>} ></Route>
                </Routes>
                <Toaster/>
            </Container>
        
        </div>
    )
}

export default App
