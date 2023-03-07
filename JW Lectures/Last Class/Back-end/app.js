const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Router = require('./routes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const DBURI = 'mongodb+srv://admin:admin123@cluster0.s4xr5cb.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DBURI).then(res => console.log("Mongo-DB is connected")).catch(err => console.log('DB ERROR' + err))

const PORT = process.env.PORT || 5000;

app.use(Router)

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))