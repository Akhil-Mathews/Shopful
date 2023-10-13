const express = require('express')
const{
    createWebsiteElements,
    getAllWebsites,
    getWebsiteElements,
    deleteWebsiteElements,
    updateWebsiteElements
} = require('../controllers/WebsiteElementsController')

const router = express.Router()

// GET all websites
router.get('/', getAllWebsites)

// GET website by url
router.get('/:website', getWebsiteElements)

// POST a new website
router.post('/', createWebsiteElements)

// DELETE a website
router.delete('/:id', deleteWebsiteElements)

// UPDATE a website
router.patch('/:id', updateWebsiteElements)

module.exports = router