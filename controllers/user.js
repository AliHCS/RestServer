const { response } = require('express')



const userGet = (req, res = response) => {


    const { q, nombre = 'No Name', apikey } = req.query

    res.json({
        msg: 'Get API - Controlador',
        q,
        nombre,
        apikey
    })
}
const userPost = (req, res = response) => {


    const { nombre, edad } = req.body


    res.status(201)


    res.json({
        msg: ' Post API - Controlador',
        nombre,
        edad
    })
}
const userPut = (req, res = response) => {

    const id = req.params.id


    res.status
    res.json({
        msg: 'Put API - Controlador',
        id
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