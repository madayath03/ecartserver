// import express
const express = require('express')

// router()
const router = new express.Router()

// import controllers
const controllers = require('../controllers/productController')
const wishlistController = require('../controllers/wishlistController')
const cartController = require('../controllers/cartController')

// get all products api
// router.httpreg(path,call back fn to resolve api)
router.get('/products/get-all-products', controllers.getallproducts)

// router for view product
router.get('/products/:id',controllers.viewProduct)

// router for wishlist
router.post('/products/add-to-wishlist', wishlistController.addToWishlist)

//router to get all wishlist
router.get('/wishlist/get-all-items', wishlistController.getAllWishlistItems)

//router to delete wishlist
router.delete('/wishlist/remove-items/:id', wishlistController.removeWishlistItems)

// router to addto cart
router.post('/products/add-to-cart', cartController.addtoCart )

// router to gett all cart
router.get('/cart/get-all-items', cartController.getAllCartItems)

// router to delete cart
router.delete('/cart/remove-items/:id', cartController.removeCartItems)

// remove cart quantity
router.post('/cart/remove-quantity', cartController.removeCartquantity)
// export router
module.exports = router