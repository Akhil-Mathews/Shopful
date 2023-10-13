const express = require('express');
const {
  createItem,
  getItem,
  getItems,
  deleteItem,
  updateItem
} = require('../controllers/itemController.js');

const itemDBRoutes = express.Router()

// GET all items
itemDBRoutes.get('/', getItems)

// GET a single item
itemDBRoutes.get('/:id', getItem)

// POST a new item
itemDBRoutes.post('/', createItem)

// DELETE a item
itemDBRoutes.delete('/:id', deleteItem)

// UPDATE a item
itemDBRoutes.patch('/:id', updateItem)

module.exports = itemDBRoutes