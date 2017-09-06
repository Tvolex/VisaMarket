const express = require ('express');
const bodyParser = require ('body-parser');
const session = require ('express-session');
const favicon = require ('serve-favicon');
const cookieParser = require ('cookie-parser');
const path = require ('path');
const config = require('./config');
const Authorization = require('./routers/Authorization');
const exit = require ('./routers/exit');
const login = require ('./routers/login');
const publish = require ('./routers/PublishItem');
const updateItem = require ('./routers/updateItem');
const history = require('connect-history-api-fallback');
const connect = require('connect');
const visit = require('./routers/visit');
const getItems = require ('./routers/getItems');
const getCountriesByVisaType = require('./routers/getCountriesByVisaType');
const getItemsByFilter = require('./routers/getItemsByFilter');
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
app.use(favicon(path.join(__dirname, '../public','imgs','favicon.ico')));

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/Authorization', Authorization);
app.use('/login', login);
app.use('/exit', exit);
app.use('/publish', publish);
app.use('/updateItem', updateItem);
app.use('/visit', visit);
app.use('/getItemsByFilter', getItemsByFilter);
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