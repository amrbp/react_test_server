const express = require('express');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
    },
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.get('/blog', (req, res) => {
    db.select('*')
        .from('systems_contact')
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});
app.post('/add-contact', (req, res) => {
    const { name, email, discriptions } = req.body;
    db('systems_contact')
        .insert({
            name: name,
            email: email,
            discriptions: discriptions,
        })
        .then(() => {
            console.log('Contact Added');
            // return res.json({ msg: 'Movie Added' });
            return res.redirect('http://localhost:3000/blog');
        })
        .catch((err) => {
            console.log(err);
        });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));