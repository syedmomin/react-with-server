
import express from 'express';
import cors from 'cors';

const app = express()
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get('/products', (req, res) => {
    res.send("dfdfdfd")
    // MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
    //   const db = client.db(dbName);
    //   const collection = db.collection('products');
    //   collection.find().toArray((err, products) => {
    //     res.send(products);
    //     client.close();
    //   });
    // });
  });