const mongoose = require("mongoose");


const connect = () => {

  return mongoose.connect("mongodb+srv://zionit:anaz123@cluster0.jxpil.mongodb.net/jwreport?retryWrites=true&w=majority")
}


module.exports = connect;