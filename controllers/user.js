const { response } = require('express')
const bcryptjs = require('bcryptjs')




const User = require('../models/user')


const userGet = async (req, res = response) => {
    /* const { q, nombre = 'No Name', apikey } = req.query */
    const { limite = 5, desde = 0 } = req.query
    const query = { estado: true}

/* 
    const user = await User.find(query)
        .skip(Number( desde ))
        .limit(Number( limite ))


    const total = await User.countDocuments(query) */

    
    //Desestrucracion de arreglos, se ejecutan las promesas al mismo tiempo
    const [ total , users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip(Number( desde ))
        .limit(Number( limite ))
    ])
        
    res.json({
        total,
        users
    })
}



const userPost = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body
    const user = new User({ nombre, correo, password, rol })

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)

    //Guardar en DB
    await user.save()

    res.status(201)
    res.json({
        user
    })
}




const userPut = async (req, res = response) => {

    const { id } = req.params

    const { _id, password, google, correo, ...resto } = req.body


    //Validar con la base de Datos

    if (password) {
        //encriptar la contraseña
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }
    const user = await User.findByIdAndUpdate(id, resto)

    res.json({
        user
    })
}






const userDelete = (req, res = response) => {

    res.status


    res.json({
        msg: 'Delete API - Controlador'
    })
}


module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,

}