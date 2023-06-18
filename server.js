const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text-html");
  // res.write('<h1>Hello World</h1>');
  // res.write('<h1>nkjnjka</h1>');
  // res.end();
let num=_.random(0,20);
console.log(num);

const greet=_.once(()=>{
  console.log('Hrllo Darshit');
})
greet();
greet();
  let path = "./views";
  switch (req.url) {  
    case "/":
      path += "/home.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "/About.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "/error.html";
      res.statusCode = 404;
      break;
  }
  fs.readFile(path, (err, filedata) => {
    if (err) {
      console.log(err);
    } else {
      res.end(filedata);
    }
  });
});

server.listen("3000", (req, res) => {
  console.log("Server is live on port 3000");
});
