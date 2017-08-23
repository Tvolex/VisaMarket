const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const DataBaseURL = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

const login = router.post('/', async (req, res) => {

    const email = req.session.user_email;
    const sessionID = req.sessionID;

    try {
        const db = await MongoClient.connect(DataBaseURL);

        const collection = db.collection('admins');

        console.log("login.js: connection to: " + DataBaseURL);

        const admin = await collection.find({email: email, sessionID: sessionID}).limit(1).next();

        db.close();

        admin ? res.status(200)
                .json({login: true, email: admin.email}) :
            res.status(401)
                .json({login: false});

    } catch (e) {
        console.log(e);

        res.status(500)
            .send(e);
    }
});

module.exports = login;
