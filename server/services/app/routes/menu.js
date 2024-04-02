const express = require('express')
const { getMenu, getMenuById, createNewMenuItem, editMenuItem, deleteMenuItem } = require('../controller/controller')
const router = express.Router()

router.get('/', getMenu)
router.get('/:id', getMenuById)
router.post('/', createNewMenuItem)
router.put('/:id', editMenuItem)
router.delete('/:id', deleteMenuItem)

module.exports = router