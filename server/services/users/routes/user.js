const express = require('express')
const { getAllUsers, findById, createNewUser, deleteUser, editUser } = require('../controller/controller')
const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', findById)
router.post('/', createNewUser)
router.put('/:id', editUser)
router.delete('/:id', deleteUser)

module.exports = router