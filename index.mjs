import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import './model/login/login.mjs'
import cookieParser from 'cookie-parser';
import { stringToHash, varifyHash } from "bcrypt-inzi"
import userRoute from './routes/login.mjs';

const app = express()
const port = process.env.PORT || 5001;
const SECRET = process.env.SECRET || "topsecret";

app.use(cors());
app.use(express.json());

// database connection in mangodb                 
const mongodbURI = process.env.mongodbURI || "mongodb+srv://syedMominTesting:mominmomin@cluster0.e7i5deq.mongodb.net/testing?retryWrites=true&w=majority";
mongoose.connect(mongodbURI);

let userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: Number,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "customer"
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});
const userModel = mongoose.model('userDetail', userSchema);


// user registration  
app.post('/registration', (req, res) => {

    const body = req.body;
    if (
        !body.userName ||
        !body.email ||
        !body.number ||
        !body.password
    ) {
        res.status(400).send({
            message: "required parameters missing",
        });
        return;
    }
    stringToHash(body.password).then(hashString => {

        userModel.create({
            userName: body.userName,
            email: body.email.toLowerCase(),
            number: body.number,
            role: body.role,
            password: hashString
        },
            (err, result) => {
                if (!err) {
                    console.log(result);

                    res.status(201).send({
                        status: "success",
                        message: "User is created successfully"
                    });
                } else {
                    res.status(500).send({
                        message: "server error"
                    })
                }
            })
    });
})

// login user api 
app.post("/login", (req, res) => {

    let body = req.body;
    body.email = body.email.toLowerCase();

    if (!body.email || !body.password) { // null check - undefined, "", 0 , false, null , NaN
        res.status(400).send(
            `required fields missing, request example: 
                {
                    "email": "abc@abc.com",
                    "password": "12345"
                }`
        );
        return;
    }

    // check if user exist
    userModel.findOne(
        { email: body.email },
        "userName number email password",
        (err, data) => {
            if (!err) {
                console.log("data: ", data);

                if (data) { // user found
                    varifyHash(body.password, data.password).then(isMatched => {

                        console.log("isMatched: ", isMatched);

                        if (isMatched) {

                            const token = jwt.sign({
                                _id: data._id,
                                email: data.email,
                                iat: Math.floor(Date.now() / 1000) - 30,
                                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
                            }, SECRET);

                            console.log("token: ", token);

                            res.cookie('Token', token, {
                                maxAge: 86_400_000,
                                httpOnly: true,
                                // sameSite: true,
                                // secure: true
                            });

                            res.send({
                                message: "login successful",
                                profile: {
                                    email: data.email,
                                    userName: data.userName,
                                    token: token,
                                    number: data.number,
                                    _id: data._id
                                }
                            });
                            return;
                        } else {
                            console.log("password did not match");
                            res.status(401).send({ message: "Password did not match" });
                            return;
                        }
                    })

                } else { // user not already exist
                    console.log("user not found");
                    res.status(401).send({ message: "This email not exist" });
                    return;
                }
            } else {
                console.log("db error: ", err);
                res.status(500).send({ message: "login failed, please try later" });
                return;
            }
        })
})


// get all user data in mangodb 
app.get('/getAllUser', (req, res) => {
    userModel.find({}, (err, data) => {
        if (!err) {
            res.send({
                message: "get all user successfully",
                data: data
            })
        } else {
            res.status(500).send({
                message: "server error"
            })
        }
    });

});


// app.get('/abc', (req, res) => {
//     console.log("request ip: ", req.ip);
//     res.send('Hello World! ' + new Date().toString());
// })



app.get('/user/:email', (req, res) => {
    const email = req.params.email;
    userModel.findOne({
        email: email
    }, (err, user) => {
        if (user) {
            res.send({
                exists: true
            });
        } else {
            res.send({
                exists: false
            });
        }
    });
});



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