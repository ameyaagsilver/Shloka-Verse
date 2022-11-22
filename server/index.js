import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const Connection = mongoose.connection;

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "130mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "130mb", extended: true}));
app.use(cors())

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/uploads', express.static('uploads'));

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => {
        console.log("Server and MongoDB running on port: ", PORT);
    }))
    .catch((error) => console.log(error));