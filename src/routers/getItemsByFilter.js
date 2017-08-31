const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const ObjectId = require ('objectid');
const http = require('http');
const DataBaseURL = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;


const getItemsByFilter = router.get('/', async (req, res) => {

    const reqVisaTypeId = parseInt(req.query.visaTypeId);
    const reqVisaCountry = req.query.visaCountry.toString();

    try {
        const db = await MongoClient.connect(DataBaseURL);

        console.log("getItemsByFilter.js: Connect to Data Base: " + DataBaseURL);

        const collection = db.collection('items');

        let items = await collection.find(
            {
                visaTypeId: reqVisaTypeId,
                country: reqVisaCountry,
            })
            .sort({$natural: -1}).toArray();

        console.log(items);

        db.close();

        res.status(200)
            .send(items);

    } catch (e) {
        console.log(e);
        res.status(500)
            .send(e);
    }

});

module.exports = getItemsByFilter;