const Role = require('../models/role')
const User = require('../models/user')


//Verificar si el Rol es valido
const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol })
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`)
    }
}



//Verificar si el correo existe
const existeEmail = async (correo = '') => {
    const correoExistente = await User.findOne({ correo })
    if (correoExistente) {
        throw new Error(`El correo: ${correo} ya esta registrado`)
    }
}



//Verificar si existe el usuario por ID
const existeUsuarioPorID = async ( id ) => {
    const existeUser = await User.findById( id )
    if (!existeUser) {
        throw new Error(`El ID: ${id} no existe`)
    }
}





module.exports = { esRolValido, existeEmail, existeUsuarioPorID }








