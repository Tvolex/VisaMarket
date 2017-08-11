const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const ObjectId = require('objectid');
const DataBaseURL = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

const login = router.post('/', async (req, res) => {
    try {
        req.session.destroy();
        res.status(200)
            .send(true);
    } catch (e) {
        console.log(e);
        res.status(500)
            .send(false);
    }


});

module.exports = login;
