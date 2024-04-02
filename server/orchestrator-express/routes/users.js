const express = require('express')
const { getAllUsers, getUserById, createUser, editUser, deleteUser } = require('../controller/userController')
const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', editUser)
router.delete('/:id', deleteUser)

module.exports = router