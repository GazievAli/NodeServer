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
            res.end();
            break;
        case "/contact":
            console.log("contact page");
            let data = fs.readFileSync("./public/contact.html", {encoding: "utf-8", flag: "r"});
            res.write(data);
            res.end();
            break;
        default:
            if (url.includes("/images")) {
                fs.readFile("./public" + url, {}, (err, data) => {
                    if (err) {
                        console.log(err);
                        res.end();
                    } else {
                        res.setHeader("Content-Type", "image/png");
                        res.write(data);
                        res.end();
                    }
                    
                });
            }
            else {
                res.write("<h1>404</h1>");
                res.end();
            }
    }
    
}).listen(PORT);