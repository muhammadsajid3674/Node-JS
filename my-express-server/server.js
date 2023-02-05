const express = require('express'); // import express

const app = express() // function that represent express

app.get('/', function(req, res){
    res.send('<h1>Hello World</h1>')
}); //Making Request

app.get('/about', function(req, res){
    res.send('<h2>Muhammad Sajid</h2>')
}); //Making Request12

app.listen(3000, () => {
    console.log('Hello World');
}); // making server