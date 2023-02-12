const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', (req, res) => {
    console.log(req.body);
    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);
    const result = num1 + num2;
    res.send('The result is ' + result)
})

app.get('/bmiCalculator', (req, res) => {
    res.sendFile(__dirname + '/bmiCalculator.html')
})

app.post('/bmiCalculator', (req, res) => {
    console.log(req.body);
    const weight = parseFloat(req.body.weight);    
    const height = parseFloat(req.body.height);
    const result = weight / (height * height);
    res.send('Your BMI is ' + result)
})

app.listen(3000, () => {
    console.log('Server is running on 3000');
})