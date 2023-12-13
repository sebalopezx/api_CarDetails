import React from 'react'
import { HomePage, Marcas, MarcaForm, NotFoundPage } from "./pages/Url"
import { Routes, Route } from 'react-router-dom'
import { Container } from "./context/Context";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <Container>
            <Routes>
                <Route path='/' element= {<HomePage/>} ></Route>
                <Route path='/marcas' element= {<Marcas/>} ></Route>
                <Route path='/createmarca' element= {<MarcaForm/>} ></Route>
                <Route path='/marcas/:id' element= {<MarcaForm/>} ></Route>
                <Route path='*' element= {<NotFoundPage/>} ></Route>
            </Routes>
            <Toaster/>
        </Container>
        
    )
}

export default App
