const express = require('express');
const dbconnect = require('./database/mongodb');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 8080;

// Routes

const dashboardRoutes = require("./routes/dashboardRoutes");

app.get("/", (req, res) => {
    res.send(`app started at ${PORT}`);
});

app.listen(PORT, (req, res) => {
    console.log(`app started at ${PORT}`)
})

app.use('/group', groupRoutes);
app.use(login);
app.use(signup);
app.use(product);
app.use(orders);
app.use(dashboardRoutes);

dbconnect();

module.exports = app; // ✅ export for server.js



