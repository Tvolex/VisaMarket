const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const md5 = require ('md5');
const ObjectId = require ('objectid');
const DataBaseURL = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

const Authorization = router.post('/', async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const sessionID = req.sessionID;

    const HashedPassword = md5(password);

    try {
        const db = await MongoClient.connect(DataBaseURL);

        const collection = db.collection('admins');

        console.log("Authorization.js: connection to: " + DataBaseURL);

        const admin = await collection.findOneAndUpdate(
            {
                email: email,
                password: HashedPassword
            },
            {
                $set: {sessionID: sessionID}
            });


        db.close();

        if (admin.lastErrorObject.updatedExisting) {
            req.session.user_email = await admin.value.email;

            console.log(req.sessionID);

            res.status(200)
                .cookie('sessionID', req.sessionID , { httpOnly: true})
                .send(true)
        }
        else {
            res.status(404)
                .send(false)
        }

    } catch (e) {
        console.log(e);

        res.status(500)
            .send(e);
    }
});

module.exports = Authorization;
