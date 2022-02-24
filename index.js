const express = require('express');
const exphbs = require('express-handlebars');

const conn = require('./db/conn');

const funcionarioRoutes = require('./routes/funcionarioRoutes');

const app = express();

app.use(express.json());

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

//read body
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.static('public'));

app.use('/', funcionarioRoutes);

app.listen(3000);