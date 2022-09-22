const express = require('express');
const router = express.Router();

const config = require("../config.json");

/**
 * 
 */

router.get('/:id', (req, res) => {
    res.send(req.params.id);
});

/**
 * If the url isn't /watch/:id, then send the user to the home page instead of a 404 page.
 */

router.all('*', (req, res) => {
    res.redirect('/');
});

module.exports = router;