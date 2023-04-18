// import wishlist collection
const wishlists = require('../models/wishlistSchema')

// logic to add item
exports.addToWishlist = async (req,res)=>{
    // so the product details from the req body
    // we can req.body.[key] but we can do destructe it so we dont need to do that always
    // below is how we do destructure
    // so if we need id we can just call id
    const {id,title,price,image} = req.body

    // check if product is there in wishlist
    // both mongodb key and here var name is same
    try {
        const item = await wishlists.findOne({ id })
        // check prod in wishlist there
        if(item){
            // prod already in wishlist
            res.status(401).json("It seems you have already added this to your wishlist")
        }
        else {
            // res.status(200).json("Product being added to wishlist")
            // product not there, so lets add
            const newProduct = new wishlists({
                id, title, price, image
            })
            await newProduct.save()
            res.status(200).json("Product added to wishlist")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

exports.getAllWishlistItems = async (req, res) => {

    try {
        const allItems = await wishlists.find()
        // check prod in wishlist there
        if (allItems) {
            // prod already in wishlist
            res.status(200).json(allItems)
        }
        else {
            res.status(401).json("Your wishlist is empty")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
    
}

exports.removeWishlistItems = async (req, res) => {

    // by destruct we get id
    const {id} = req.params
    try {
        const item = await wishlists.deleteOne({id})
        // check prod in wishlist there
        if (item) {
            // get remaining item in the wishlist
            const allItems = await wishlists.find()
            res.status(200).json(allItems)
        }
        else {
            res.status(401).json("Item is not in wishlist")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

