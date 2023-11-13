const express = require('express');
const app = express();
const mongodb = require('mongodb');

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

app.post('/', (req, res) => {
    console.log('accept data in post request')
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