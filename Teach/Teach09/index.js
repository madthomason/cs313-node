const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get("/math", handleMath)
    .get("/math-service", function (request, response) {
        var op = req.query.op;
        var o1 = req.query.o1;
        var o2 = req.query.o2;

        var result;
        switch (op) {
            case '+':
                result = o1 + o2;
                break;
            case '-':
                result = o1 - o2;
                break;
            case '*':
                result = o1 * o2;
                break;
            case '/':
                result = o1 / o2;
                break;
        }
        const params = {result: result};
        response.json(params);
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))




function handleMath(req, res){
    var op = req.query.op;
    var o1 = req.query.o1;
    var o2 = req.query.o2;

    var result;
    switch(op){
        case '+':
            result = o1 + o2;
            break;
        case '-':
            result = o1 - o2;
            break;
        case '*':
            result = o1 * o2;
            break;
        case '/':
            result = o1 / o2;
            break;
    }

    const params = {result: result};

    res.render("pages/math", params);
}
