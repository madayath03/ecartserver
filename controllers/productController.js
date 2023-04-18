// logic to get all products from mongoDB
// import products collection
const products = require('../models/productSchema')

exports.getallproducts = async (req, res) => {
    // logic
    try {
        const allproducts = await products.find()
        // send that to client
        res.status(200).json(allproducts)
    }

    catch (error) {
        res.status(400).json(error)
    }
}

exports.viewProduct = async (req, res)=> {
    // logic
    try {
        // get productid from req parameters and then put here
        const id = req.params.id
        // since both var same or else mongo db var:our var
        const product = await products.findOne({ id })
        // send that to client
        if (product) {
            res.status(200).json(product)
        }
        else {
            res.status(404).json("item not available")
        }
    }
    catch (error) {
        res.status(400).json(error)
    }
}