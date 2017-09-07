const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const DataBaseURL = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;


const deleteItem = router.post('/', async (req, res) => {
    const itemID = req.body.itemID;

    try {
        const db = await MongoClient.connect(DataBaseURL);

        console.log("deleteItem.js: Connect to Data Base: " + DataBaseURL);

        const collection = db.collection('items');

        const deleted = await collection.remove({_id: mongodb.ObjectId(itemID)});

        console.log('Delete item, ok: ', deleted.result.ok);

        db.close();

        deleted.result.ok ?
            res.status(200)
                .json({deleted: true}) :
            res.status(400)
                .json({deleted: false})

    } catch (e) {
        console.log(e);
        res.status(500)
            .send(e);
    }

});

module.exports = deleteItem;