const express = require('express');
const {
  getViews,
  createView,
  deleteView,
  updateView,
  deleteViews
} = require('../controllers/viewController.js');


const itemViewRouter = express.Router()

// GET all items around location
itemViewRouter.get('/', getViews)

// POST a new item
itemViewRouter.post('/', getViews)

// DELETE a item
itemViewRouter.delete('/:id', deleteView)

//DELETE multiple views
itemViewRouter.get('/getItemsByDate/:date', deleteViews)

// UPDATE a item
itemViewRouter.patch('/:id', updateView)

module.exports = itemViewRouter