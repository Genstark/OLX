const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ObjectId } = require('mongodb');
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


/*-------------------------------------------------------------------------------------------------------------------------------- */

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

/*-------------------------------------------------------------------------------------------------------------------------------- */
//when user request for the product page

async function getIndividualProductData(productkey){
    const client = new MongoClient(uri);

    try{
        await client.connect();

        const db = client.db('olx');
        const collection = db.collection('Items');

        return await collection.findOne({ _id : new ObjectId(productkey) });
    }
    finally{
        await client.close();
    }
}

app.get('/items/:id', (req, res) => {
    const requestId = req.params.id;
    console.log(requestId);

    getIndividualProductData(requestId).then(data => {
        console.log(data);
        res.json({
            message: 'success',
            data: data,
        });
    }).catch(error => {
        console.log(error);
    });
});

/*-------------------------------------------------------------------------------------------------------------------------------- */

async function getUserDataWithProduct(userId){
    const client = new MongoClient(uri);

    try{
        await client.connect();

        const db = client.db('olx');
        const collection = db.collection('Items');

        const user =  await collection.findOne({ _id: new ObjectId(userId) });
        return await collection.find({user_id: user['user_id']}).toArray();
    }
    finally{
        await client.close();
    }
}

app.get('/item/profile/:itemId', (req, res) => {
    const requesId = req.params.itemId;
    console.log(requesId);
    
    getUserDataWithProduct(requesId).then(data => {
        let userOfUser = data['user_id']
        console.log(userOfUser);
        res.json({
            message: 'ok',
            data: data
        });

    }).catch(err => {
        console.log(err);
    });
});

/*-------------------------------------------------------------------------------------------------------------------------------- */

async function addDataMongodb(userdata){
    const client = new MongoClient(uri);

    try{
        await client.connect();

        const db = client.db('olx');
        const collection = db.collection('user_data');
        
        const emailfind = await collection.findOne({UserEmail: userdata['UserEmail']});
        
        if(emailfind === null){
            await collection.insertOne(userdata, { writeConcern: { w: 'majority' } });
            return 'Account is create';
        }
        else{
            return 'email is already exist please use another email';
        }
    }
    finally{
        await client.close();
    }
}

app.post('/signIn', (req, res) => {
    const userData = req.body;

    const passwordEncrypted = Encryption(userData['Password']);

    // userData['_id'] = generateId();
    userData['Password'] = passwordEncrypted;

    // console.log(userData);

    addDataMongodb(userData).then(data => {
        res.json({
            status: "ok",
            data: data
        });
    }).catch(error => {
        console.log(error);
    });

});

/*-------------------------------------------------------------------------------------------------------------------------------- */
async function loginDataMongodb(useremail){
    const client = new MongoClient(uri);

    try{
        await client.connect();

        const db = client.db('olx');
        const collection = db.collection('user_data');
        return await collection.findOne({UserEmail: useremail}, { writeConcern: { w: 'majority' } });
    }
    finally{
        await client.close();
    }
}


app.post('/login', (req, res) => {
    const postData = req.body;
    console.log(postData);

    loginDataMongodb(postData['email']).then(data => {
        const mongoData = data;
        console.log(mongoData);

        if(mongoData !== null){
            if(mongoData['UserEmail'] === postData['email'] && Decrypt(mongoData['Password']) === postData['password']){
                res.json({
                    message: "email and password is correct",
                    done: true,
                    token: mongoData['_id'],
                    data: Encryption(mongoData['UserName'])
                });
            }
            else{
                res.json({
                    message: "wrong email or password",
                    done: false
                });
            }
        }
        else{
            res.json({
                message: 'Invalid Data',
                done: null
            });
        }
    }).catch(err => {
        console.log(err);
    });
});

/*-------------------------------------------------------------------------------------------------------------------------------- */

async function userAddSellProduct(userdata, fileDocument, userId, user){
    const client = new MongoClient(uri);

    try{

        await client.connect();

        const db = client.db('olx');
        const collection = db.collection('Items');

        const data = {
            'userName' : user,
            'brandName': userdata['brandname'],
            'productType': userdata['productType'],
            'Address': userdata['address'],
            'phoneNumber': userdata['phonenumber'],
            'state': userdata['state'],
            'city': userdata['city'],
            'price': userdata['price'],
            'overview': userdata['overview'],
            'details': userdata['details'],
            'image-1': fileDocument[0],
            'image-2': fileDocument[1],
            'image-3': fileDocument[2],
            'user_id': userId
        }

        await collection.insertOne(data, {writeConcern: {w: 'majority'}});
    }
    finally{
        // Close connection to the MongoDB cluster
        await client.close();
    }
}


const storage = multer.memoryStorage();
const upload = multer({storage: storage});


app.post('/addProduct', upload.array('files', 3),(req, res) => {

    const userData = req.body;
    const userId = req.body.token;
    const user = Decrypt(req.body.data);

    let imageCollection = [];

    if(req.files.length > 0){
        for(let i=0; i < req.files.length; i++){
            const fileData = req.files[i].buffer;
            const fileDocument = {
                filename: req.files[i].originalname,
                data: fileData
            }

            imageCollection.push(fileDocument);
        }
    }
    
    userAddSellProduct(userData, imageCollection, userId, user).then(data => {
        res.json({
            message: 'success',
            data: 'product is ready to sell'
        });
    }).catch(error => {
        console.log(error);
    });
});

/*-------------------------------------------------------------------------------------------------------------------------------- */

app.delete('/', (req, res) => {
    console.log('delete data req');
});


app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});


/*---------------------------------------------------------------------------------------------*/

function Encryption(password){
    const ciphertext = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
    return ciphertext;
}


function Decrypt(passowrd){
    const bytes = CryptoJS.AES.decrypt(passowrd, 'secret key 123');
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}


/*---------------------------------------------------------------------------------------------*/
function generateId(){
    const character = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = '';
    for(let i=0; i < 15; i++){
        result += character[Math.floor(Math.random() * character.length)];
    }
    return result;
}

function genrateProductKey(){
    const character = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    let result = '';
    for(let i=0; i < 20; i++){
        result += character[Math.floor(Math.random() * character.length)];
    }
    return result;
}
/*---------------------------------------------------------------------------------------------*/



/*
/user               (get all data for landing or homepage)
/user/id            (get data of single product and single user)
/user/login         (when user login)
/user/signIn        (when user create new account)
/user/addItem       (when user logout)
/user/deleteItem    (when user delete item)
/user/deleteAccount (when user delete account)

--------------------------------------------------------------
When the user is a viewer
--------------------------------------------------------------

/item               (list of all product without login)
/item/id            (individual product page)
*/


//how to desgine sql and Nosql
//tips for creating mongodb tabel
//difference between sql and NoSql
//what is sql and mongodb

//structure query language