const http = require("http");
const fs = require("fs");
const PORT = 3500;

http.createServer((req, res) => {
    const url = req.url;
    console.log(url);
    res.setHeader("Content-Type", "text/html; charset=utf-8;");

    switch (url) {
        case "/":
            console.log("main page");
            res.write("<h1>Main</h1>");
            break;
        case "/contact":
            console.log("contact page");
            let data = fs.readFileSync("./contact.html", {encoding: "utf-8", flag: "r"});
            res.write(data);
            break;
        default:
            console.log("404");
            res.write("<h1>404</h1>");
    }
    res.end();
}).listen(PORT);