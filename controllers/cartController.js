// logic to get cart items
const cartitems = require('../models/cartSchema')

// to add item to cart
exports.addtoCart = async (req, res) => {
    // so the product details from the req body
    // we can req.body.[key] but we can do destructe it so we dont need to do that always
    // below is how we do destructure
    // so if we need id we can just call id
    const { id, title, price, image, quantity } = req.body

    // check if product is there in cart then increase the quanitty
    // both mongodb key and here var name is same
    try {
        const item = await cartitems.findOne({ id })
        // check prod in cart there
        if (item) {
            // prod already in cart
            // res.status(401).json("It seems you have already added this to your cart")
            item.quantity += 1
            // update total price for item
            item.grandTotal = item.price * item.quantity
            // save the chnages
            await item.save()
            res.status(200).json("It seems you have already added this item to your cart. So, the quantity has been increased.")
        }
        else {
            // res.status(200).json("Product being added to cart")
            // product not there, so lets add
            const newItem = new cartitems({
                id, title, price, image, quantity, grandTotal:price
            })
            await newItem.save()
            res.status(200).json("This item is added to your cart")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

exports.removeCartquantity = async (req, res) => {
    // so the product details from the req body
    // we can req.body.[key] but we can do destructe it so we dont need to do that always
    // below is how we do destructure
    // so if we need id we can just call id
    const { id, title, price, image, quantity } = req.body

    // check if product is there in cart then increase the quanitty
    // both mongodb key and here var name is same
    try {
        const item = await cartitems.findOne({ id })
        // check prod in cart there
        if (item) {
            if (item.quantity > 1){
                // prod there and quantity is > 1
                item.quantity -= 1
                // update total price for item
                item.grandTotal = item.price * item.quantity
                // save the chnages
                await item.save()
                let disabled = false
                res.status(200).json({
                    disabled,
                    message: "Item quantity has been reduced."
                })
            }
            else {
                let disabled = true
                res.status(200).json({
                    disabled,
                    message: "Further reduction is not possible."
                })
            }
        }
        else {
            // product not there, which is not possible
            res.status(401).json(item)
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

exports.getAllCartItems = async (req, res) => {

    try {
        const allItems = await cartitems.find()
        // check prod in cart there
        if (allItems) {
            // prod already in cart
            res.status(200).json(allItems)
        }
        else {
            res.status(401).json("Your cart is empty")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }

}

exports.removeCartItems = async (req, res) => {

    // by destruct we get id
    const { id } = req.params
    try {
        const item = await cartitems.deleteOne({ id })
        // check prod in wishlist there
        if (item) {
            // prod deleted from wishlist
            const allItems = await cartitems.find()
            res.status(200).json({
                allItems,
                message:"Item removed successfully"
            })
        }
        else {
            res.status(401).json("Item is not in cart")
        }
    }
    catch (error) {
        res.status(401).json(error)
    }
}

