const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const newsApi = require('./services/newsService');
const dbMongoose = require('./mongoose');
const auth = require('./routes/auth');
//const errorHandler = require('errorhandler');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.set('views', './views')
app.set('view engine', 'pug');
dbMongoose.setMongooseConnection();
require('./models/user');
require('./passport');
app.use(require('./routes'));


app.get('/news', function (req, res) {
    newsApi.mongooseNewsModel.getAllNews().then(x=> console.log(x));
    res.send("Get all news");
});

app.get('/news/:id', function (req, res) {
    newsApi.mongooseNewsModel.getNewsById(req.params.id).then(x=> console.log(x));
    res.send(`get by id - newsId:${req.params.id}`);
});

app.post('/news', function (req, res) {
    newsApi.mongooseNewsModel.createNews(req.body);
});

app.put('/news/:id', auth.required, function (req, res) {
    newsApi.mongooseNewsModel.updateNews(req.params.id,req.body);
    res.send('PUT Request');
});

app.delete('/news/:id', auth.required, function (req, res) {
    newsApi.mongooseNewsModel.deleteNews(req.params.id);
    res.send('DELETE Request');
});


app.use(errorHandler);
function errorHandler(err, req, res, next) {
    res.status(500);

    res.render('error', { title: 'You have got a error', message: err});
}

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});


