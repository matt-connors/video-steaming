const express = require('express');
const player = require('./player');
const ui = require('./ui');

const app = express();

const PORT = 8080;

// Direct all /video requests to the player route
app.use('/video', player);

// Direct all other requests to the generic ui route
app.all('*', ui);

app.listen(PORT, error => {
    if (error) {
        console.log(error);
    }
    else {
        console.log(`Server started on port ${PORT}`);
    }
});