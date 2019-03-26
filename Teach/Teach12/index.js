const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
var session = require('express-session');
const bcrypt = require('bcrypt');
require('dotenv').config();
const {Pool} = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

express()
    .use(express.static(path.join(__dirname, 'public')))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({
        extended: true
    }))
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true
    }))
    .use(logRequest)
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/test.html')))
    .get('/getServerTime', verifyLogin, getServerTime)
    .post('/login', loginUser)
    .post('/logout', logoutUser)
    .listen(PORT, () => console.log(`Listening on ${ PORT }`));


function loginUser(req, response) {
    const username = req.body.username;
   const password = req.body.password;

//
//     bcrypt.hash(req.body.password, 10, (err, password) => {
// //     // Store hash in database
//         console.log(password);
//     });

    console.log(username);
    console.log(password);

    const query = 'SELECT id, username, password FROM person WHERE username = $1';

    pool.query(query, [username], (error, result) => {
        if (error || result === null || result.rows.length !== 1) {
            response.status(500).json({success: false, data: error, result: result});
        } else {
            const person = result.rows[0];
            // if (person.password === password) {
            //     req.session.username = username;
            //     response.json({success: true});
            // } else {
            //     response.json({success: false});
            // }
            bcrypt.compare(password, person.password, function (err, res) {
                if (res) {
                    // Passwords match
                    req.session.username = username;
                    response.status(200).json({success: true}); //ok
                } else {
                    // Passwords don't match
                    response.status(400).json({success: false, data: "Wrong Username or password"});
                }
            });
        }
    });


}

function logoutUser(req, res) {
    if (req.session.username) {
        req.session.destroy(); //from Br. Burton's solution
        // req.session.username = null;
        res.json({success: true});
    } else {
        res.json({success: false});
    }

}

function getServerTime(req, res) {

    res.json({success: true, time: new Date()});
}

function verifyLogin(req, res, next) {

    if (req.session.username) {
        next();
    } else {
        res.status(401).json({success: false, error: "user not on session"});
    }

}

function logRequest(req, res, next) {
    console.log("Recieved a request for: " +  req.url);

    //pass it on
    next();
}

//bcrypt
// bcrypt.compare(password, mother.password, function (err, res) {
//     if (res) {
//         // Passwords match
//         response.status(200).json(mother); //ok
//     } else {
//         // Passwords don't match
//         response.status(400).json({success: false, data: "Wrong Username or password"});
//     }
// });
// bcrypt.hash(request.body.password, 10, (err, password) => {
//     // Store hash in database
//     db.createMother(username, password, function (error, result) {
//
//         // Make sure we got a row with the person, then prepare JSON to send back
//         if (error || result == null) {
//             response.status(500).json({success: false, data: error});
//         } else {
//             const mother = result.rows[0];
//             response.status(200).json(mother);
//         }
//     });
// });
