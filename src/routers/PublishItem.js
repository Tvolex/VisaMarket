const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const DataBaseURL = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;


const publish = router.post('/', async (req, res) => {

    const item = {
        country: req.body.country,
        city : req.body.city,
        visaTypeId : req.body.visaTypeId,
        price : req.body.price,
        description : req.body.description,
        image : req.body.image,
    };

    try {
        const db = await MongoClient.connect(DataBaseURL);

        console.log("getCountriesByVisaType.js: Connect to Data Base: " + DataBaseURL);

        const collection = db.collection('items');

        let res = await collection.insertOne(item);

        console.log(res.toString());

        db.close();

        res.status(200)
            .send(res);

    } catch (e) {
        console.log(e);
        res.status(500)
            .send(e);
    }

});

module.exports = publish;