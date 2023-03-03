const express = require('express');
const https = require('https');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))

const PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/index.html')
})

app.post('/', (req, res) => {
    const query = req.body.cityName;
    const apiKey = "1b7689d45df4afdf9c345482e797cf55";
    const URL = 'https://api.openweathermap.org/data/2.5/weather?q=' + query + '&appid=' + apiKey + '&units=metric';
    https.get(URL, (response) => {
        console.log(response.statusCode);
        response.on("data", (data) => {
            const weatherUpdates = JSON.parse(data);
            const temp = weatherUpdates.main.temp;
            const weatherDescription = weatherUpdates.weather[0].description;
            const icon = weatherUpdates.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temperature in " + query + "  is " + temp + " degree Celsius.</h1>")
            res.write("<p>The weather is currently " + weatherDescription + "</p>")
            res.write("<img src=" + imageURL + " alt=" + weatherDescription + "/>")
            res.send();
        })
    });
})


app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})