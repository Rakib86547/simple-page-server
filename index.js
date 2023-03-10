const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tiiizrg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const sectorsCollection = client.db('simplePage').collection('sectors');
        const usersCollection = client.db('simplePage').collection('users');

        app.get('/district', async (req, res) => {            
            const query = {  };
            const result = await sectorsCollection.find(query).toArray();
            res.send(result);
        });
        
        app.put('/users/:email', async (req, res) => {
            const email = req.params.email;
            const user = req.body;
            const filter = {email: email};
            const options = {upsert: true};
            const updateDoc = {
                $set: user
            };
            const result = await usersCollection.updateOne(filter, updateDoc, options);
            res.send(result)
        })
    }

    finally {

    }
};
run().catch(error => console.log(error))

app.get('/', (req, res) => {
    res.send('api is running')
});

app.listen(port, (req, res) => {
    console.log(`server is running on port ${port}`)
});