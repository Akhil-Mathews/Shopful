const mongoose = require('mongoose');


const Schema = mongoose.Schema
// Model for any item that will be shown when a user wants to see a list of items 
const itemSchema = new Schema({
    name:
    {
        type: String,
        required: true
    },
    price:
    {
        type: String,
        required: true
    },
    image:
    {
        type: String,
        required: false
    },
    link:
    {
        type: String,
        required: true
    },
    path: {
            location:
            {
                lon:{
                    type: Number,
                    required: false
                },
                lat:{
                    type: Number,
                    required: false
                }
            },
            radius:
            {
                type: Number,
                required: false
            },
            store:
            {
                type: String,
                required: false
            },
            search:
            {
                type: String,
                required: false
            }
    },
    method:
    {
        type: String,
        required: false
    }
}, { timestamps: true})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item