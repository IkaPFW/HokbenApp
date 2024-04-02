const express = require('express')
const { getAllMenu, getMenuById, createMenu, editMenu, deleteMenu } = require('../controller/menuController')
const router = express.Router()

router.get('/', getAllMenu)
router.get('/:id', getMenuById)
router.post('/', createMenu)
router.put('/:id', editMenu)
router.delete('/:id', deleteMenu)

module.exports = router