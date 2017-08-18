const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const ObjectId = require ('objectid');
const http = require('http');
const DataBaseURL = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;


const getCountriesByVisaType = router.get('/', async (req, res) => {

    const reqVisaTypeId = req.query.visaTypeId;

    console.log("visaType: " + reqVisaTypeId);

    try {
        const db = await MongoClient.connect(DataBaseURL);

        console.log("getCountriesByVisaType.js: Connect to Data Base: " + DataBaseURL);

        const collection = db.collection('items');

        let items = await collection.find({visaTypeId: reqVisaTypeId}).sort({$natural: -1}).toArray();

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

module.exports = getCountriesByVisaType;