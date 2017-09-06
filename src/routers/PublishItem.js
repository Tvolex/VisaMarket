const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const DataBaseURL = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;


const publish = router.post('/', async (req, res) => {

    const item = {
        term: req.body.term,
        city : req.body.city,
        price : req.body.price,
        image : req.body.image,
        country: req.body.country,
        visaTypeId : req.body.visaTypeId,
        description : req.body.description,
    };

    try {
        const db = await MongoClient.connect(DataBaseURL);

        console.log("getCountriesByVisaType.js: Connect to Data Base: " + DataBaseURL);

        const collection = db.collection('items');

        const inserted = await collection.save(item);

        console.log(inserted.WriteResult);

        db.close();

        res.status(200)
            .send(inserted.result)

    } catch (e) {

        if (e.code === 11000) {
            res.status(400)
                .json({n: 0, ok: 0});
            return 0;
        }

        console.log(e);
        res.status(500)
            .send(e);
    }

});

module.exports = publish;