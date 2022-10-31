const express = require('express')
const cors = require('cors')
const { dbConection } = require('../database/config')



class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'


        //Coneccion a base de datos
        this.conectarDB()

        //Middlewares
        this.middlewares()


        //Rutas de la aplicacion
        this.routes()
    }



    async conectarDB (){
        await dbConection()
    }



    middlewares() {

        //cors
        this.app.use(cors())

        //Parseo y lectura del Body
        this.app.use(express.json())


        //directorio publico
        this.app.use(express.static('public'))


    }


    routes() {


        this.app.use(this.usuariosPath, require('../routes/user'))

    }


    listen() {
        this.app.listen(process.env.PORT, () => {
            console.log('Corriendo en el puerto: ', this.port)
        })
    }

}



module.exports = Server
