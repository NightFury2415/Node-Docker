const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);

let redisClient = redis.createClient({
    socket: {
        host: 'redis',
        port: 6379,
    }
});
redisClient.connect().catch(console.error);

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

console.log("Attempting to connect to MongoDB...");
mongoose.connect("mongodb://root:example@mongo:27017/?authSource=admin", {
    serverSelectionTimeoutMS: 5000
})
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => {
        console.error("Error connecting to MongoDB:", err);
    });

app.use(express.json());
app.enable('trust proxy'); 
app.use(cors({}));
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 60000
    }
}));

app.get('/api/v1', (req, res) => {
    res.send("<h2> Hi There!</h2>")
})

app.use('/api/v1posts', postRouter);
app.use('/api/v1users', userRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});