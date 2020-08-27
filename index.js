const express = require("express");
const app = express();
const port = 3333;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/src/pages/home.html');
})

app.listen(port, () => {
    console.log(`Server rodando em https://localhost:${port}/`)
})