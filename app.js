require('dotenv').config();
const path = require('path');
const fileUpload = require('express-fileupload');
const express = require('express');
const app = express();

const mongoose = require('mongoose');
mongoose.connect(`mongodb://127.0.0.1/${process.env.DB_NAME}`)

app.use(express.json());
app.use(fileUpload());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const catRoute = require('./routes/cat');
const userRoute = require('./routes/user');
const tagRoute = require ('./routes/tag');
const commentRoute = require ('./routes/comment');
const postRoute = require('./routes/post');


app.use("/cats", catRoute);
app.use("/users", userRoute);
app.use("/comments", commentRoute);
app.use("/tags", tagRoute);
app.use("/posts", postRoute);




app.use((err, req, res, next) => {
    err.status = err.status || 200;
    res.status(err.status).json({
        cons: false,
        msg: err.message
    })
});

app.listen(process.env.PORT, console.log(`Sever is running at port number ${process.env.PORT}`));