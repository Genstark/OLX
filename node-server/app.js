const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');
const multer = require('multer');
const CryptoJS = require("crypto-js");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: 'GET, PUT, PATCH, DELETE, POST',
    credentials: true
}));


const uri = "mongodb+srv://gy523314:%40genwarrior123%40@cluster0.3e0eraj.mongodb.net/?retryWrites=true&w=majority/Student_Database";

const PORT = 2000;


/*------------------------------------------------------------------------------------------------------------------ */

async function getAllItemsMongoDB(){
    const client = new MongoClient(uri);

    try{
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate changes in your code here
        const db = client.db('olx');
        const collection = db.collection('Items');
        return await collection.find({}, { writeConcern: { w: 'majority' } }).toArray();
    }
    finally{
        // Close connection to the MongoDB cluster
        await client.close();
    }
}

app.get('/items', (req, res) => {
    
    getAllItemsMongoDB().then(data => {
        console.log(data);

        res.json({
            message: 'Success',
            data: data
        });
    }).catch(error => {
        console.log(error);
    });
});

/*------------------------------------------------------------------------------------------------------------------ */

async function getSingleMongoDB(productId){

    const client = new MongoClient(uri);

    try{
        await client.connect();
        
        const db = client.db('olx');
        const collection = db.collection('Items');

        return await collection.findOne({ _id: productId }, {writeConcern: {w: 'majority'}});
    }
    finally{
        await client.close();
    }
}

app.get('/items/:productId', (req, res) => {
    const key = req.params.productId;

    getSingleMongoDB(key).then(data => {
        res.json({
            message: 'Success',
            data: data
        })
    });
});

/*------------------------------------------------------------------------------------------------------------------ */

async function login(){
    const client = new MongoClient(uri);

    try{
        await client.connect();

        const db = client.db('olx');
        const collection = db.collection('user_data');

        return await collection.findOne({});
    }
    finally{
        await client.close();
    }
}


app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`)
});