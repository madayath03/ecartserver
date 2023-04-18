// define schema
const mongoose = require('mongoose')

// using mongoose define schema
const wishlistSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

// create model using above schema
const wishlists = mongoose.model("wishlists", wishlistSchema)

// export model
module.exports = wishlists