const mongoose = require("mongoose");
const reportModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    hours: {
        type: String,
        required: true
    },
    publication: {
        type: String,
        required: true
    },
    rv: {
        type: String,
        required: true
    },
    study:{
       type: String,
        required:true
    },
    vedio:{
        type: String,
        required:true
    },
    category:{
        type: String,
        required:true
    },
    reportID:{
        type: String,
        required:true
    }
})

module.exports = mongoose.model("Report", reportModel);