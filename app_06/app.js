const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3500;

const mimeTypes = {
    ".html": "text/html",
    ".htm": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".svg": "image/svg+xml",
    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".oga": "audio/ogg",
    ".ogg": "audio/ogg",
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".ogv": "video/ogg",
    ".pdf": "application/pdf",
    ".zip": "application/zip",
    ".csv": "text/csv",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".xls": "application/vnd.ms-excel",
};

function staticFile (res, filePath, ext) {
    res.setHeader("Content-Type", mimeTypes[ext]);
    fs.readFile("./public"+filePath, (err, data) => {
        if (err) {
            pageNotFound(res)
        }
        res.end(data);
    })
}

http.createServer((req, res) => {
    const url = req.url;
    console.log(url);
    
    switch (url) {
        case "/":
            console.log("contact page");
            res.write("Main");
            res.end();
            break;
        case "/contact":
            console.log("contact page");
            staticFile(res, "/contact.html", ".html");
            break;
        default:
            const extName = String(path.extname(url)).toLocaleLowerCase();
            if (extName in mimeTypes) {
                staticFile(res, url, extName);
            } else {
                pageNotFound(res)
            }
    }
}).listen(PORT);

const pageNotFound = (res) => {
    res.statusCode = 404;
    res.write("404")
    res.write("Page Not Found");
    console.error("Page Not Found");
    res.end();
}