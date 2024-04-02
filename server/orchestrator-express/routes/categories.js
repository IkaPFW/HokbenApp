const express = require('express')
const { getAllCategories, getCategoryById, createCategory, editCategory, deleteCategory } = require('../controller/categoryController')
const router = express.Router()

router.get('/', getAllCategories)
router.get('/:id', getCategoryById)
router.post('/', createCategory)
router.put('/:id', editCategory)
router.delete('/:id', deleteCategory)

module.exports = router