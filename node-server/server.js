const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient } = require('mongodb');
const multer = require('multer');


app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: 'GET, PUT, PATCH, DELETE, POST',
    credentials: true
}));


const PORT = 2000;

app.get('/', (req, res) => {
    console.log('send all data in get request');
});


async function addDataMongodb(userdata){
    const uri = "mongodb+srv://gy523314:%40genwarrior123%40@cluster0.3e0eraj.mongodb.net/?retryWrites=true&w=majority/Student_Database";
    const client = new MongoClient(uri);

    try{
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate changes in your code here
        const db = client.db('olx');
        const collection = db.collection('user_data');
        await collection.insertOne(userdata, { writeConcern: { w: 'majority' } });
    }
    finally{
        // Close connection to the MongoDB cluster
        await client.close();
    }
}

app.post('/', (req, res) => {
    const userData = req.body;
    userData['_id'] = generateId();
    console.log(userData);

    addDataMongodb(userData).then(data => {
        res.json({
            message: "ok"
        });
    }).catch(error => {
        console.log(error);
    });

});


async function loginDataMongodb(useremail){
    const uri = "mongodb+srv://gy523314:%40genwarrior123%40@cluster0.3e0eraj.mongodb.net/?retryWrites=true&w=majority/Student_Database";
    const client = new MongoClient(uri);

    try{
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate changes in your code here
        const db = client.db('olx');
        const collection = db.collection('user_data');
        return await collection.findOne({UserEmail: useremail});
    }
    finally{
        // Close connection to the MongoDB cluster
        await client.close();
    }
}


app.post('/login', (req, res) => {
    const postData = req.body;

    loginDataMongodb(postData['email']).then(data => {
        const mongoData = data;
        console.log(mongoData);
        if(mongoData['UserEmail'] === postData['email'] && mongoData['Password'] === postData['password']){
            res.json({
                message: "email and password is correct",
                done: true
            });
        }
        else{
            res.json({
                message: "wrong email or password",
                done: false
            });
        }
    }).catch(err => {
        console.log(err);
    });
});

app.put('/', (req, res) => {
    console.log('req for changes in current data');
});

app.delete('/', (req, res) => {
    console.log('delete data req');
});


app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});


/*---------------------------------------------------------------------------------------------*/
function generateId(){
    const character = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var result = "";
    for(let i=0; i < 12; i++){
        result += character[Math.floor(Math.random()*character.length)];
    }
    return result;
}

//post sign in
//post login
//get profile
//post update password
