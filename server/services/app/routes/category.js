const express = require('express')
const { getCategories, getCategoryById, createNewCategory, editCategory, deleteCategory } = require('../controller/controller')
const router = express.Router()

router.get('/', getCategories)
router.get('/:id', getCategoryById)
router.post('/', createNewCategory)
router.put('/:id', editCategory)
router.delete('/:id', deleteCategory)

module.exports = router