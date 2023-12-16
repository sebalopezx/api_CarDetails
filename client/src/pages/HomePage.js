import { useMarcas } from "../context/Context";
import { Link } from "react-router-dom";
import { Badge, Card } from 'react-bootstrap';
// import img_info from "../../public/formato_json.PNG";
// import logo from "../../public/piston.png";
import { BsInstagram, BsFacebook, BsLinkedin, BsFileEarmarkPerson } from "react-icons/bs";


export function HomePage() {

    const { marcas } = useMarcas()

    return (
        <div className="container-fluid text-white text-center">
            <header>
                
                <nav className="mt-3">
                    <ul className="d-flex justify-content-center list-unstyled ">
                        <li className="fs-3 me-2">
                            <a href="https://sebalopezx.github.io/Portafolio/" target="_blank" rel="noopener noreferrer">
                                <BsFileEarmarkPerson/>
                            </a>
                        </li>
                        <li className="fs-3 me-2">
                            <a href="https://www.linkedin.com/in/sebastian-lopez-nunez/" target="_blank" rel="noopener noreferrer">
                                <BsLinkedin/>
                            </a>
                        </li>
                        <li className="fs-3 me-2">
                            <a href="https://web.facebook.com/sebalopezxd" target="_blank" rel="noopener noreferrer">
                                <BsFacebook/>
                            </a>
                        </li>
                        <li className="fs-3 me-2">
                            <a href="https://www.instagram.com/sebalopzxd/" target="_blank" rel="noopener noreferrer">
                                <BsInstagram/>
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>

            <div className="container border rounded my-5 py-5 ">
                <header className="">
                    <h1 className="">~API CAR DETAILS~</h1>
                    <div>
                        <img src="/logo.png" alt="Logo" className="my-3" style={{width: "100px"}}></img>
                    </div>
                </header>
                <div className="g-5 mx-auto">
                    <Link to='/vehiculos' className="btn btn-outline-info me-md-3 mt-2">Marcas <Badge pill bg="light" text="dark">{marcas.length}</Badge></Link>
                    <Link to='/createmarca' className="btn btn-outline-primary mt-2">Crear nueva marca</Link>
                </div>
            </div>
            
            <div className="container rounded text-start  my-5">
                {/* <h3 className="text-center mb-2">Información</h3> */}

                <Card className="bg-secondary text-light">
                    <div className="row ">
                        <div className="col-md-4">
                            <Card.Img variant="top" src="/formato_json.png" className="img-fluid rounded-start" style={{width: "350px"}}/>
                        </div>
                        <div className="col-md-8">
                            <Card.Body>
                                <Card.Title className="mb-5">Información del sistema: Gestión de vehiculos</Card.Title>
                                <Card.Text>                             
                                    <li className="mb-2">El sistema permite crear vehículos con sus modelos respectivos y los años asociados.</li>
                                    <li className="mb-2">Tiene un CRUD para realizar toda la gestion de cada vehículo.</li>
                                    <li className="mb-2">Separado por interfaz entre marcas y modelos.</li>
                                    <li className="mb-2">Se puede visualizar la cantidad de marcas o vehiculos respectivos.</li>
                                </Card.Text>
                            </Card.Body>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}


