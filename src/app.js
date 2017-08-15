const express = require ('express');
const bodyParser = require ('body-parser');
const session = require ('express-session');
const cookieParser = require ('cookie-parser');
const path = require ('path');
const config = require('./config');
const Authorization = require('./routers/Authorization');
const exit = require ('./routers/exit');
const login = require ('./routers/login');
const history = require('connect-history-api-fallback');
const connect = require('connect');
const getItems = require ('./routers/getItems');
const getCountriesByVisaType = require('./routers/getCountriesByVisaType');
const app = express();



app.use(cookieParser());
app.use(bodyParser());
//app.use(history(middleware));
app.use(session({
    secret: ',Kvb6s<wh(yB#&m66sk4@a+SB9pSKm-', // TODO: change secret key
    resave: true,
    saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, '../view'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/Authorization', Authorization);
app.use('/login', login);
app.use('/exit', exit);

app.use('/getCountriesByVisaType', getCountriesByVisaType);
app.use('/getItems', getItems);

// Error handler
app.use((req, res, next) => {
    res.status(404)
        .send('<h1 align="center">Not Found 404</h1>')
});

app.listen(config.port, () => {
    console.log('Server start on port ' + config.port);
});