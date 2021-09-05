const products = require('./routes/products');
const pool = require('./db');

const cors = require("cors");
const express = require('express');
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/products', products);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});