const fs = require('fs');
const fs_path = require('path');
const handlebars = require("handlebars");

const config = require("./config.json");

const getChunkDetails = (range, file_size) => {
    const parts = range.replace(/bytes=/, '').split('-');

    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : file_size - 1;
    const chunk_size = (end - start) + 1;

    return {
        start,
        end,
        chunk_size
    };
}

const getFile = (file_path) => {
    const path = fs_path.join(__dirname, `${config.VIDEO_PATH}/${file_path}.mp4`);
    const exits = fs.existsSync(path);

    if (exits) {
        return {
            file_size: fs.statSync(path).size,
            path
        };
    }
    else {
        console.warn(`(!) File ${path} does not exist.`);
        return false;
    }
}

const renderPage = (path_name, context) => {
    try {
        const path = fs_path.join(__dirname, `views/${path_name}.html${context ? '.hbs' : ''}`);
        const source = fs.readFileSync(path, 'utf8');
        if (context) {
            const template = handlebars.compile(source);
            return template(context);
        }
        else {
            return source;
        }
    }
    catch (error) {
        return false;
    }
    
}

module.exports = {
    getChunkDetails,
    getFile,
    renderPage
}