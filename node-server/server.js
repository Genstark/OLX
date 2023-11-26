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


//when user login and user land on home page
/*-------------------------------------------------------------------------------------------------------------------------------- */

async function getMongodbData(){
    const client = new MongoClient(uri);

    try{
        // Connect to the MongoDB cluster
        await client.connect();
        // Make the appropriate changes in your code here
        const db = client.db('olx');
        const collection = db.collection('user_data');
        return await collection.find({}, { writeConcern: { w: 'majority' } }).toArray();
    }
    finally{
        // Close connection to the MongoDB cluster
        await client.close();
    }
}

app.get('/user', (req, res) => {

    let productCollection = [];


    getMongodbData().then(data => {
        // console.log(data[0]['product'][0]);

        for(let i=0; i < data.length; i++){

            if(data[i]['product'].length !== 0){
                let singleData = {
                    'productName': data[i]['product'][i]['productType'],
                    'overview': data[i]['product'][i]['overview'],
                    'image-1': data[i]['product'][i]['image-1'],
                    'productKey': data[i]['product'][i]['productKey'],
                    'state': data[i]['product'][i]['state'],
                    'city': data[i]['product'][i]['city']
                };

                productCollection.push(singleData);
            }
        }

        res.json({
            statusCode: 200,
            data: productCollection,
            message: "success"
        });
    }).catch(error => {
        console.log(error);
    });

});


//when user reques for the individual product page or profile page
/*-------------------------------------------------------------------------------------------------------------------------------- */

async function getUserData(userId){
    const client = new MongoClient(uri);

    try{
        await client.connect();

        const db = client.db('olx');
        const collection = db.collection('user_data');

        return await collection.findOne({ _id : userId });
    }
    finally{
        await client.close();
    }
}

app.get('/:userId', (req, res) => {
    const requestId = req.params.userId;

    getUserData(requestId).then(data => {
        res.json({
            statusCode: 200,
            message: "success",
            data: data
        })
    }).catch(error => {
        console.log(error);
    });
    
});

/*-------------------------------------------------------------------------------------------------------------------------------- */

async function getItemMongodbData(){
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

app.get('/item', (req, res) => {
    console.log('this routing call all item from data base');

    getItemMongodbData().then(data => {

        if(data.length !== 0){
            res.json({
                status: 200,
                message: 'Success',
                data: data
            });
        }
        else{
            res.json({
                status: 200,
                message: 'success',
                data: 'your item data is empty'
            });
        }
    });
});

/*-------------------------------------------------------------------------------------------------------------------------------- */
//when user request for the product page
async function getIndividualProductData(productkey){
    const client = new MongoClient(uri);

    try{
        await client.connect();

        const db = client.db('olx');
        const collection = db.collection('user_data');
        const data = await collection.find({}).toArray();

        for(let i=0; i < data.length; i++){
            if(data[i]['product'][i]['productKey'] === productkey){
                return data[i]['product'][i];
            }
            else{
                console.log('not found');
            }
        }
        // return await collection.findOne({ productKey : productkey });
    }
    finally{
        await client.close();
    }
}

app.get('/item/:id', (req, res) => {
    const requestId = req.params.id;

    getIndividualProductData(requestId).then(data => {
        res.json({
            message: 'success',
            data: data
        });
    }).catch(error => {
        console.log(error);
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
    userData['product_Id'] = [];

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
                    token: mongoData._id,
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

async function userAddSellProduct(userdata, fileDocument, userId){
    const client = new MongoClient(uri);

    try{

        await client.connect();

        const db = client.db('olx');
        const collection = db.collection('Items');

        // const sellingProductData = await collection.findOne({ _id : userId });
        // console.log(sellingProductData);

        const data = {
            'brandName': userdata['brandname'],
            'productType': userdata['productType'],
            'Address': userdata['address'],
            'phoneNumber': userdata['phonenumber'],
            'state': userdata['state'],
            'city': userdata['city'],
            'price': userdata['price'],
            'overview': userdata['overview'],
            'details': userdata['details'],
            // 'productKey': genrateProductKey(),
            'image-1': fileDocument[0],
            'image-2': fileDocument[1],
            'image-3': fileDocument[2],
            'user_id': userId
        }

        // const sellProduct = {
        //     $set: {
        //         product: sellingProductData['product']
        //     }
        // }

        // sellProduct.$set.product.push(data);
        // console.log(sellProduct);
        
        // await collection.findOneAndUpdate({ _id : userId }, sellProduct, { writeConcern: { w: 'majority' } });

        await collection.insertOne(data, {writeConcern: {w: 'majority'}});
    }
    finally{
        // Close connection to the MongoDB cluster
        await client.close();
    }
}


const storage = multer.memoryStorage();
const upload = multer({storage: storage});


app.put('/addProduct', upload.array('files', 3),(req, res) => {

    // console.log(req.files);
    const userData = req.body;
    const userId = req.body.token;

    // console.log(userData);
    let imageCollection = [];

    if(req.files.length > 0){
        for(let i=0; i < req.files.length; i++){
            const fileData = req.files[i].buffer;
            const fileDocument = {
                filename: req.files[i].originalname,
                data: fileData
            }

            imageCollection.push(fileDocument);
            // console.log(imageCollection);
        }
    }
    
    userAddSellProduct(userData, imageCollection, userId).then(data => {
        res.json({
            message: 'success',
            data: 'product is ready to sell'
        });
    }).catch(error => {
        console.log(error);
    });

    // res.json({
    //     message: 'success',
    //     data: userData
    // });
});

/*-------------------------------------------------------------------------------------------------------------------------------- */

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