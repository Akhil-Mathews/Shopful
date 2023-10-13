const Website = require('../models/websiteModel')
//for the WebsiteModel file
const mongoose = require('mongoose')

// get elements from all websites
const getAllWebsites = async (req, res) =>{
    const websites = await Website.find({}).sort({createAt: -1})

    res.status(200).json(websites)
}


// get elememts from a url
const getWebsiteElements = async (req, res) => {

    const { website } = req.params
    
    const websites = await Website.find({ name: { $regex: website, $options: "i" } }).sort({ createAt: -1 })

    if(!websites){
        return res.status(400).json({error: 'No such website in database'})
    }

    res.status(200).json(websites)

}

// create a new website need to add attributes here if you add a new element to the website model
const createWebsiteElements = async (req, res) => {
    const {websiteUrl, closeButton, searchBarElement, searchButtonElement, productNameElement, productPriceElement, productImageElement, productLinkElement, productHomeNameElement, productHomePriceElement, productHomeImageElement, productHomeLinkElement, searchPrerequisite, homePrerequisite} = req.body

  try{
    const website = await Website.create({websiteUrl, closeButton, searchBarElement, searchButtonElement, productNameElement, productPriceElement, productImageElement, productLinkElement, productHomeNameElement, productHomePriceElement, productHomeImageElement, productHomeLinkElement, searchPrerequisite, homePrerequisite})
    res.status(200).json(website)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}

// delete a website
const deleteWebsiteElements = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such website"})
    }

    const website = await Website.findByIdAndDelete({_id: id})

    if(!website){
        return res.status(400).json({error: 'No such website'})
    }

    res.status(200).json(website)
}


// update an website
const updateWebsiteElements= async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such website"})
    }

    const website = await Website.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!website){
        return res.status(400).json({error: 'No such website'})
    }

    res.status(200).json(website)
}
//exports all of these methods to websites.js
module.exports = {
    getAllWebsites,
    createWebsiteElements,
    getWebsiteElements,
    deleteWebsiteElements,
    updateWebsiteElements
}