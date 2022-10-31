
const { Router } = require('express')
const { check } = require('express-validator')


const { validarCampos } = require('../middlewares/validar-campos')
const { esRolValido, existeEmail, existeUsuarioPorID } = require('../helpers/db-validator')


const { userGet, userPut, userPost, userDelete } = require('../controllers/user')


const router = Router()

router.get('/', userGet)

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRolValido),
    validarCampos
],
    userPut)

router.post('/', [
    //Validaciones
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser mas de 6 letras ').isLength({ min: 6 }),
    check('correo').custom(existeEmail),
    /* check('rol', 'No es un rol permitido').isIn(['ADMIN_ROL', 'USER_ROL']), */
    check('rol').custom(esRolValido),
    validarCampos,
], userPost)

router.delete('/', userDelete)









module.exports = router