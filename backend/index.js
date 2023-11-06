require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const DB_URI = process.env.DB_URI;

const mongoose = require('mongoose');
const cors = require('cors');

const blogRoutes = require('./routes/blogRoutes')
const authorRoutes = require('./routes/authorRoutes');

app.use(express.json());
app.use(cors());
app.use(express.static('uploads'));

mongoose.connect(DB_URI)
    .then(() =>{
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
        console.log('Connected to DB');
    })
    .catch(err => console.log(err));

    app.use('/api/blogs', blogRoutes);
    app.use('/api/user', authorRoutes);
