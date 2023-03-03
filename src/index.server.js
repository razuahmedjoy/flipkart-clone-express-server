const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
// routes
const authRoutes = require('./routes/auth')
const adminRoutes = require('./routes/admin/auth')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')
const cartRoutes = require('./routes/cart')
const initialDataRoutes = require('./routes/admin/initialData')


// environment variable
env.config();



// mongodb connection
// mongodb+srv://<username>:<password>@cluster0.mwock.mongodb.net/?retryWrites=true&w=majority

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.mwock.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`).then(()=>{
    console.log("Database connected");
});



const app = express();
app.use(express.json());
app.use(cors());
// app.use(bodyParser());

app.use('/public',express.static(path.join(__dirname,'uploads/category')))

app.use("/api",authRoutes);
app.use("/api",adminRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",cartRoutes);
app.use("/api",initialDataRoutes);


app.get("/",(req,res)=>{
    res.send(`Server is running http://localhost:${process.env.PORT}`)
})


app.listen(process.env.PORT,()=>{
    console.log(`listening on port http://localhost:${process.env.PORT}`);
})