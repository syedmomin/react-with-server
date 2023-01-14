import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import authApis from './routes/auth.mjs';

const app = express()
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());


// database connection in mangodb                 
const mongodbURI = process.env.mongodbURI || "mongodb+srv://syedMominTesting:mominmomin@cluster0.e7i5deq.mongodb.net/testing?retryWrites=true&w=majority";
mongoose.connect(mongodbURI);

// route apis 
app.use('/api', authApis)


const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './web/build')))
app.use('*', express.static(path.join(__dirname, './web/build')))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () { //connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () { //disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) { //any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () { /////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////