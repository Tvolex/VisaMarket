const config = require ('../config');
const mongodb = require ('mongodb');
const express = require ('express');
const getIP = require ('ipware')().get_ip;
const DataBaseURL = config.DBurl;
const router = express.Router();
const MongoClient = mongodb.MongoClient;

async function SaveVisit(id) {
    const doc = {

    }

    try {
        const db = await MongoClient.connect(DataBaseURL);

        const collection = db.collection('visiting');

        console.log("visit.js: connection to: " + DataBaseURL);

        const visit = await collection.findOneAndUpdate({name: "visited"}, { $inc: {visited: 1}}, { upsert: true });

        db.close();

        return visit;

    } catch (e) {
        console.log(e);
        return e;
    }
}

async function getVisiting() {
    try {
        const db = await MongoClient.connect(DataBaseURL);

        const collection = db.collection('visiting');

        console.log("visit.js: connection to: " + DataBaseURL + " /visiting");

        const visit = await collection.find({name: "visited"}).limit(1).toArray();

        db.close();

        return visit;
    } catch (e) {
        return e;
    }
}

const visit = router.post('/', async (req, res) => {

    const sessionID = req.sessionID;

    try {
        const db = await MongoClient.connect(DataBaseURL);

        const collection = db.collection('admins');

        console.log("visit.js: connection to: " + DataBaseURL);

        const ip = getIP(req);

        const admin = await collection.find({ip: ip.clientIp}).limit(1).hasNext();

        const visiting = await getVisiting();

        db.close();

        res.status(200).send(visiting);
        
    } catch (e) {
        console.log(e);

        res.status(500)
            .send(e);
    }
});

module.exports = visit;
