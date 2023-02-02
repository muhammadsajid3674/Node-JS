// // hello world with < node 'filename' > in terminal
// console.log('hello world'); 

// // importing folder 
// const fs = require('fs');

// // reading folder file system
// fs.readdir('./', ((err, file) => {err ? console.log(err) : console.log(file)}))

// // to make read and write able
// fs.readFile('./abc.txt', 'utf8', ((err, file) => {err ? console.log(err) : console.log(file)}))

// to make updates in file

// // over write value
// fs.writeFile('./abc.txt', 'Callback 1', (err) => console.log(err))
// fs.writeFile('./hello.js', hello = 'sajid', (err) => console.log(err))

// // not over write the value
// fs.appendFile('./abc.txt', ' Callback 2', (err) => console.log(err))

// http
const http = require('http')
// let server = http.createServer((request, response) => {
//     console.log('hello sajid');
// });
// let server = http.createServer((request, response) => {
//     response.write('Hello World from server');
//     response.end();
// });

let post = [
    {
        id: 1,
        name: 'sajid'
    },
    {
        id: 2,
        name: 'usman'
    },
    {
        id: 3,
        name: 'ukasha'
    },
];
let update = [
    {
        id: 1,
        name: 'saad'
    },
    {
        id: 2,
        name: 'ali'
    },
    {
        id: 3,
        name: 'ukasha'
    },
];

let server = http.createServer((request, response) => {
    if (request.url == '/post') {
        response.write(JSON.stringify(post));
        response.end();
    }
    if (request.url == '/update') {
        response.write(JSON.stringify(update));
        response.end();
    }
    // if (request.url == '/full') {
    //     response.write(JSON.stringify(update));
    //     response.end();
    // }
    response.end();
});
server.listen(5000);