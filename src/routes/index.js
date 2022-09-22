const express = require('express');
const player = require('./player');

const app = express();

const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/watch', player);

app.listen(PORT, error => {
    if (error) {
        console.log(error);
    }
    else {
        console.log(`Server started on port ${PORT}`);
    }
});