const express = require('express');
const fs = require('fs');
const router = express.Router();

const utils = require("../utils");

/**
 * Access video file and stream it to user
 */

router.get('/:id', (req, res) => {

    const range = req.headers.range;
    const { file_size, path } = utils.getFile(req.params.id);

    if (range) {
        const { start, end, chunk_size } = utils.getChunkDetails(range, file_size);
        const stream = fs.createReadStream(path, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${file_size}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunk_size,
            'Content-Type': 'video/mp4',
        }
        res.writeHead(206, head);
        stream.pipe(res);
    }
    else {
        const head = {
            'Content-Length': file_size,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
});

/**
 * If the url isn't /watch/:id, then send the user to the home page instead of a 404 page.
 */

// router.all('*', (req, res) => {
//     res.redirect('/');
// });

module.exports = router;