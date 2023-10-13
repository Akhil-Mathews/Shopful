const Item = require('../models/itemModel.js');
const mongoose = require('mongoose');


// get all items
const getItems = async (req, res) =>{
    const items = await Item.find({}).sort({createAt: -1})

    res.status(200).json(items)
}

// get a single item
const getItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such item"})
    }

    const item = await Item.findById(id)

    if(!item){
        return res.status(400).json({error: 'No such item'})
    }

    res.status(200).json(item)
}

//this method creates an item when an item is passed to it and adds it into the database, gets used by updatedScraper.js
const createItem = async (itemData) => {
    try {
      const item = await Item.create(itemData);
      console.log('Created item:', item);
      return item;
    } catch (error) {
      console.error('Error creating item:', error.message);
      throw error;
    }
  }

// delete an item
const deleteItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such item"})
    }

    const item = await Item.findByIdAndDelete({_id: id})

    if(!item){
        return res.status(400).json({error: 'No such item'})
    }

    res.status(200).json(item)
}


// update an item
const updateItem = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such item"})
    }

    const item = await Item.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!item){
        return res.status(400).json({error: 'No such item'})
    }

    res.status(200).json(item)
}

module.exports = {
    createItem,
    getItem,
    getItems,
    deleteItem,
    updateItem
}