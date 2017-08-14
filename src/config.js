const config = {};


if (process.env.NODE_ENV === 'development') {
    config.port = process.env.PORT || 3000;
    config.DBurl = process.env.DataBaseURL || 'mongodb://127.0.0.1:27017/Visa-Market';
}
else if(process.env.NODE_ENV === 'staging') {
    config.port = process.env.PORT || 3000;
    config.DBurl = process.env.DataBaseURL;
}
else if (process.env.NODE_ENV === 'production') {
    config.port = process.env.PORT;
    config.DBurl = process.env.DataBaseURL;
}

module.exports = config;