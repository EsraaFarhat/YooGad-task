const pool = require('./db');

const express = require('express');
const app = express();

app.use(express.json());


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});

// const { Client } = require('pg');
// const client = new Client({
//     user: "postgres",
//     password: "postgres",
//     host: "localhost",
//     port: 5432,
//     database: "YooGadTask",
// });

// client.connect()
// .then(() => console.log("Connected to database..."))
// .catch(err => console.log(err))
// .finally(() => client.end())