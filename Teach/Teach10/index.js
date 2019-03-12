const express = require('express');
require('dotenv').config();
const path = require('path');
const PORT = process.env.PORT || 5000;
const { Pool } = require('pg');
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});
const app = express();



app
    .use(express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    // .get('/', (req, res) => res.render('pages/index'))
    .get('/getPerson', getPerson);


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

function getPerson(id) {
    pool.query('SELECT * FROM person WHERE id = $1', [id], (err, res) => {
        if (err) {
            console.error(err);
        } else {
            console.log('person:', res.rows[0])
        }
    });
}
