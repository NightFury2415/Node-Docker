const express = require('express');
const mongoose = require('mongoose');

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

console.log("Attempting to connect to MongoDB...");
mongoose.connect("mongodb://root:example@172.18.0.3:27017/?authSource=admin", {
    serverSelectionTimeoutMS: 5000 // 5 seconds timeout
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});