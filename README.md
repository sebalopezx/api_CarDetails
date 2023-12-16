# Proyecto: "API Car Details"
`<link>` : <https://gestion-automotriz.onrender.com/>

<img src="https://github.com/sebalopezx/api_CarDetails/tree/master/server/images/logo.png" alt="Logo del proyecto" width="100" height="100">

> Logo del proyecto

![Static Badge](https://img.shields.io/badge/Creador-Sebasti%C3%A1n_L%C3%B3pez-blue) ![Static Badge](https://img.shields.io/badge/Versi%C3%B3n-1.0-blue)


**Tabla de Contenido**

+ [Descripción de la aplicación](#Descripción-de-la-aplicación)
	* [Tecnologías usadas](#Tecnologías-usadas)
	* [Aspectos técnicos](#Aspectos-técnicos)
+ [Manejo de la aplicación](#Manejo-de-la-aplicación)
	* [Marcas](#Marcas)
	* [Modelos](#Modelos)
+ [Diseño y Arquitectura](#Diseño-y-Arquitectura)

## Descripción de la aplicación

Es un sistema simple para guardar información de marcas y modelos con su años respectivos con el fin de poder usar esos vehículos en el proyecto de gestión automotriz. Realizada con el fin de entender sintaxis del stack MERN.
>Proyecto de estudio

### Tecnologías usadas:
> [!NOTE]
> Stack MERN

- MongoDB
- Express
- React
- Node.js
- Bootstrap 5

### Aspectos técnicos:
> [!NOTE]
> Tabla de estructura y mejoras del proyecto

| Aspectos  | Características |
| ------------- | ------------- |
| Base de datos | `<Mongo DB Atlas>` | 
| Stack | `<MERN>` | 
| Diseño | `<Minimalista, simple y responsive>` | 
| Arquitectura | `<Modular client/server>` | 


## Manejo de la aplicación
> [!TIP]
> El sistema se divide en dos tablas una de Marcas y otra para Modelos

Marcas y Modelos tienen un boton con la cantidad que tienen en su interior, marca(n) con la cantidad de marcas registradas, y modelos(n) con la cantidad de modelos asociados a la marca.

![](https://github.com/sebalopezx/api_CarDetails/tree/master/server/images/inicio.PNG)
> Inicio, boton con la cantidad de marcas registradas.

Cada elemento tiene botones para su gestión, para agregar, modificar y eliminar.

![](https://github.com/sebalopezx/api_CarDetails/tree/master/server/images/cantidadmodelo.PNG)
> Tabla de marcas, con boton de la cantidad de modelos asociados a la marca.


### Marcas
Gestionar las Marcas de los vehículos:
- Listar marcas 
- Agregar nueva marca
- Actualizar marca existente
- Eliminar marca existente


![](https://github.com/sebalopezx/api_CarDetails/tree/master/server/images/marcas.PNG)
> Tabla de marcas.


![](https://github.com/sebalopezx/api_CarDetails/tree/master/server/images/marcaform.PNG)
> Formulario de marcas.


### Modelos
Gestionar los Modelos y Años de cada marca:
- Listar modelos 
- Agregar nueva modelo con sus años
- Actualizar modelo y años existentes
- Eliminar modelo y años existentes


![](https://github.com/sebalopezx/api_CarDetails/tree/master/server/images/modelos.PNG)
> Tabla de modelos.


![](https://github.com/sebalopezx/api_CarDetails/tree/master/server/images/modeloform.PNG)
> Formulario de modelos.



## Diseño y Arquitectura
> [!IMPORTANT]
> Información del proyecto en general:

1. Clonación del repositorio
```
git clone https://github.com/sebalopezx/api_CarDetails
```
2. Proyecto divido en folder de cliente y/o build con el Frontend, y un folder server con todo lo relacionado al Backend.
```
- client (FRONTEND)
-- src
-- build

- server (BACKEND)
-- controllers
-- models
-- routes
.json
```
3. Variables de entorno para PORT y MONGO.
> dotenv

4. package.json
```
Con todas las dependencias para el proyecto tanto en el lado del frontend como el backend.
Y con dependencias para el desarrollo.
```

5. Ejecutar sistema mediante cmd:
```
Para node.js en modo desarrollo:
> run dev

Para react en modo desarrollo:
cd ./client
> npm start
```

