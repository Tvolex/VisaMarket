const config = {};


if (process.env.NODE_ENV === 'development') {
    config.port = process.env.PORT || 3000;
    config.DBurl = 'mongodb://127.0.0.1:27017/Visa-Market'; // TODO: Add URL MongoDB
}
else if(process.env.NODE_ENV === 'staging') {
    config.port = process.env.PORT || 3000;
    config.DBurl = ``;
}
else if (process.env.NODE_ENV === 'production') {
    config.port = process.env.PORT;
    config.dbName = "";
    config.dbHost = "";
    config.dbPort = "";
    config.DBurl = process.env.ENV ||`mongodb://${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

module.exports = config;