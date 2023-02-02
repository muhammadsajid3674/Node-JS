const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json()) // use middleware to get data in server (body-parser)

app.post("/user", (request, response) => {
    response.send("HELLO WORLD POST")
    console.log(request.body);
})

app.get("/user", (request, response) => {
    response.send("HELLO WORLD GET")
})

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))