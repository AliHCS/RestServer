const express = require('express')
const cors = require('cors')
const { use } = require('../routes/user')



class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'

        //Middlewares
        this.middlewares()


        //Rutas de la aplicacion
        this.routes()
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
