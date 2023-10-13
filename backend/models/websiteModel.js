const mongoose = require('mongoose')

const Schema = mongoose.Schema
//the model for any website including all the relevant data for a website
const elementsSchema = new Schema({
    websiteUrl:{
        type: String,
        required: true,
        unique: true
    },
    closeButton:{
        type: String,
        required: false
    },
    searchBarElement:{
        type: String,
        required: true
    },
    searchButtonElement:{
        type: String,
        required: true
    },
    productNameElement:{
        type: String,
        required: true
    },
    productPriceElement:{
        type: String,
        required: true
    },
    productImageElement:{
        type: String,
        required: true
    },
    productLinkElement:{
        type: String,
        required: true
    },
    productHomeNameElement:{
        type: String,
        required: true
    },
    productHomePriceElement:{
        type: String,
        required: true
    },
    productHomeImageElement:{
        type: String,
        required: true
    },
    productHomeLinkElement:{
        type: String,
        required: true
    },
    searchPrerequisite: {
        type: [String],
        required: false
    },
    postSearchPrerequisite: {
        type: [String],
        required: false
    },
    homePrerequisite: {
        type: [String],
        required: false
    }
}, { timestamps: true})

website = mongoose.model('Element', elementsSchema)

module.exports = website

