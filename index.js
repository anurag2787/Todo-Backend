const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true // Note: credentials cannot be used with wildcard origin
  }));

app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) =>{
    res.send("Chill bro Server is running!");
});

const todoRoutes = require('./routes/todoroutes');
app.use('/api', todoRoutes);


mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});