const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/', function (req, res) {
    res.send('Got a POST request')
});

app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
});

app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
});

//http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
