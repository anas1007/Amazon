var express = require('express');
var cors = require('cors');
var data = require('./data');
var dotenv = require('dotenv');
var config = require('./config');
var mongoose = require('mongoose');
var userRoute = require('./routes/userRoute');
var productRoute = require('./routes/productRoute');
var bodyParser = require('body-parser');
// import dotenv from 'dotenv';
// import config from './config';
// import mongoose from 'mongoose';
// import userRoute from './routes/userRoute'

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopolgy: true,
    useCreateIndex: true
}).catch(error => console.log(error.reason));

const app = express();
app.use(bodyParser.json());
app.use(cors())

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
// app.get("/api/products/:id", (req, res) => {
//     const productId = req.params.id;
//     console.log('request from client')
//     res.setHeader('Content-Type', 'application/json');
//     const product = data.products.find(x => x._id === productId);
//     if (product)
//         res.send(product);
//     else
//         res.status(404).send({
//             msg: "Product Not Found."
//         })
// });

app.get("/api/products", (req, res) => {
    console.log('request from client')
    res.setHeader('Content-Type', 'application/json');
    res.send(data.products);
});

app.listen(5000, () => {
    console.log("Server started at http://localhost:5000")
});