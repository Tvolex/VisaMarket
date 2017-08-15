const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const DataBaseURL = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;


const getItems = router.get('/', async (req, res) => {

    try {
        const db = await MongoClient.connect(DataBaseURL);

        console.log("getItems.js: Connect to Data Base: " + DataBaseURL);

        const collection = db.collection('items');

        let items = await collection.find({}).sort({$natural: -1}).toArray();

        db.close();

        items.length > 0 ?
            res.status(200).send(items):
            res.status(404).send(items);


    } catch (e) {
        console.log(e);
        res.status(500)
            .send(e);
    }



});

module.exports = getItems;