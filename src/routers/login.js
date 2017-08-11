const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const md5 = require ('md5');
const ObjectId = require ('objectid');
const DataBaseURL = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

const login = router.post('/', async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
    const sessionID = req.sessionID;

    const HashedPassword = md5(password);

    try {
        const db = await MongoClient.connect(DataBaseURL);

        const collection = db.collection('admins');

        console.log("checkLogin.js: connection to: " + DataBaseURL);

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

            console.log(req.session.userID);

            res.status(200)
                .json({login: true})}
        else {
            res.status(401)
                .json({login: false})
        }

    } catch (e) {
        console.log(e);

        res.status(500)
            .send(e);
    }
});

module.exports = login;
