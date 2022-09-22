const express = require('express');
const router = express.Router();

const utils = require("../utils");
const metadata = require("../metadata.json");

/**
 * Send user the page UI for the player
 */

 router.get('/watch/:id', (req, res, next) => {
    const video_id = req.params.id;
    const meta = metadata[video_id];
    if (meta) {
        const context = {
            video_url: `/video/${video_id}`,
            ...meta
        };
        res.send(utils.renderPage('watch', context));
    }
    else {
        next();
    }
});

router.all('*', (req, res) => {
    const page = utils.renderPage(req.path);

    if (page) {
        res.send(page);
    }
    else {
        res.send(utils.renderPage('404'));
    }
});

module.exports = router;