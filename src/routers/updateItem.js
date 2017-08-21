const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const DataBaseURL = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

const updatePrice = async (item) => {
    const db = await MongoClient.connect(DataBaseURL);

    console.log("updateItem.js [update price]: Connect to Data Base: " + DataBaseURL);

    const collection = db.collection('items');

    return await collection.findOneAndUpdate(
        {
            country: item.country,
            visaTypeId: item.visaTypeId
        }, {
            $set: {
                price: item.price
            }
        });
};

const updateDescription = async (item) => {
    const db = await MongoClient.connect(DataBaseURL);

    console.log("updateItem.js [update description]: Connect to Data Base: " + DataBaseURL);

    const collection = db.collection('items');

    return await collection.findOneAndUpdate(
        {
            country: item.country,
            visaTypeId: item.visaTypeId
        }, {
            $set: {
                description: item.description
            }
        });
};


const updateItem = router.post('/', async (req, res) => {
    const updatedItem= [];

    const item = {
        _id: req.body._id,
        city : req.body.city,
        price : req.body.price,
        image : req.body.image,
        country: req.body.country,
        visaTypeId : req.body.visaTypeId,
        description : req.body.description,
    };


    try {

        if (item.price) {
            const updated = await updatePrice(item);

            updatedItem.push(updated.ok);

        }

        if (item.description) {
            const updated = await updateDescription(item);

            updatedItem.push(updated.ok);
        }


        const updateOk = (el, i, arr) => {
            return el === 1
        };

        if (updatedItem.every(updateOk)) {
            res.status(200)
                .json({n: 1, ok: 1});
            return 0;
        }

        throw new Error("Custom Error");

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

module.exports = updateItem;