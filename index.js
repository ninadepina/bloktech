const lodash = require('lodash');
const express = require('express');
const app = express();
const { engine } = require('express-handlebars');

const PORT = process.env.PORT || 3000;
// process.env.PORT

app.use('/static', express.static('static'));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', 'views');



app.get('/', (req, res) => {
    res.render('home');
})

app.get('/login', (req, res) => {
    res.send('Log in');
})

app.listen(PORT, () => {
    console.log('app running on port', PORT);
})

app.use((req, res, next) => {
    res.status(404).render('not-found');
})