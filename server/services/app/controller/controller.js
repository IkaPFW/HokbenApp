const { Menu, Category } = require('../models/index')

module.exports = {
    getMenu: async (req, res, next) => {
        try {
            const data = await Menu.findAll()
            
            res.status(200).json({data})
        } catch (error) {
            console.log(error);
            res.status(500).json({message: 'Internal server error'})
        }
    },
    getMenuById: async (req, res, next) => {
        const { id } = req.params

        try {
            const data = await Menu.findByPk(id)
        
            if(data){
                res.status(200).json({data})
            } else {
                res.status(404).json({message: `Menu item with ID ${id} is not found`})
            }
        } catch (error) {
            res.status(500).json({message: 'Internal server error'})
        }
    },
    createNewMenuItem: async (req, res, next) => {
        const { name, japaneseName, description, price, imgUrl, categoryId } = req.body

        try {
            const data = await Menu.create({
                name: name,
                japaneseName: japaneseName,
                description: description,
                price: +price,
                imgUrl: imgUrl,
                // authorId: 1,
                categoryId: +categoryId,
                // UserMongoId: '63f734d42126f104249d2548'
            })
        
            res.status(201).json({message: "New menu item successfully added", data})
        } catch (error) {
            if(error.name === 'SequelizeValidationError'){
                let valErr = error.errors.map(el => {
                    return el.message;
                });

                next({status: 400, message: valErr});
            } else {
                res.status(500).json({message: 'Internal server error'})
            }
        }
    },
    editMenuItem: async (req, res, next) => {
        const { id } = req.params
        const { name, japaneseName, description, price, imgUrl, categoryId } = req.body

        try {
            const dataExist = await Menu.findByPk(id)
            
            if(dataExist){
                const data = await Menu.update({
                    name: name,
                    japaneseName: japaneseName,
                    description: description,
                    price: +price,
                    imgUrl: imgUrl,
                    // authorId: 1,
                    categoryId: +categoryId
                    // UserMongoId: '63f734d42126f104249d2548'
                }, {
                    where: {
                        id: id
                    }
                })

                res.status(201).json({message: `Menu item with ID ${id} has successfully been edited`, data})
            } else {
                res.status(404).json({message: `Menu item with ID ${id} is not found`})
            }
        } catch (error) {
            if(error.name === 'SequelizeValidationError'){
                let valErr = error.errors.map(el => {
                    return el.message;
                });

                res.status(400).json({message: valErr});
            } else {
                res.status(500).json({message: 'Internal server error'})
            }
        }
    },
    deleteMenuItem: async (req, res, next) => {
        const { id } = req.params

        try {
            const dataExist = await Menu.findByPk(id)

            if(dataExist){
                const data = await Menu.destroy({
                    where: {
                        id: id
                    }
                })

                res.status(201).json({message: `Menu item with ID ${id} has successfully been deleted`})
            } else {
                res.status(404).json({message: `Menu item with ID ${id} is not found`})
            }
        } catch (error) {
                res.status(500).json({message: 'Internal server error'})
        }
    },
    getCategories: async (req, res, next) => {
        try {
            const data = await Category.findAll()
        
            res.status(200).json({data})
        } catch (error) {
            res.status(500).json({status: 500, message: 'Internal server error'})
        }
    },
    getCategoryById: async (req, res, next) => {
        const { id } = req.params

        try {
            const data = await Category.findByPk(id)
        
            if(data){
                res.status(200).json({data})
            } else {
                res.status(404).json({status: 404, message: `Category with ID ${id} is not found`})
            }
        } catch (error) {
            res.status(500).json({status: 500, message: 'Internal server error'})
        }
    },
    createNewCategory: async (req, res, next) => {
        const { name } = req.body

        try {
            const data = await Category.create({
                name: name
            })
        
            res.status(201).json({message: "New category successfully added", data})
        } catch (error) {
            if(error.name === 'SequelizeValidationError'){
                let valErr = error.errors.map(el => {
                    return el.message;
                });

                res.status(400).json({status: 400, message: valErr});
            } else {
                res.status(500).json({status: 500, message: 'Internal server error'})
            }
        }
    },
    editCategory: async (req, res, next) => {
        const { id } = req.params
        const { name } = req.body

        try {
            const dataExist = await Category.findByPk(id)
            
            if(dataExist){
                const data = await Category.update({
                    name: name
                }, {
                    where: {
                        id: id
                    }
                })

                res.status(201).json({message: `Category with ID ${id} has successfully been edited`})
            } else {
                res.status(404).json({status: 404, message: `Category with ID ${id} is not found`})
            }
        } catch (error) {
            if(error.name === 'SequelizeValidationError'){
                let valErr = error.errors.map(el => {
                    return el.message;
                });

                res.status(400).json({status: 400, message: valErr});
            } else {
                res.status(500).json({status: 500, message: 'Internal server error'})
            }
        }
    },
    deleteCategory: async (req, res, next) => {
        const { id } = req.params

        try {
            const dataExist = await Category.findByPk(id)

            if(dataExist){
                const data = await Category.destroy({
                    where: {
                        id: id
                    }
                })

                res.status(201).json({message: `Category with ID ${id} has successfully been deleted`})
            } else {
                res.status(404).json({status: 404, message: `Category with ID ${id} is not found`})
            }
        } catch (error) {
                res.status(500).json({status: 500, message: 'Internal server error'})
        }
    }
}