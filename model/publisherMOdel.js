const mongoose = require("mongoose");
const publisherModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true,
       
    },
    dobb: {
        type: String,
        required: true,
       
    },
    category: {
        type: String,
        required: true
    },
    category2: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model("publisher", publisherModel);