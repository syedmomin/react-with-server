import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import './model/login/login.mjs'

const app = express()
const port = process.env.PORT || 5001;

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


// jwt token  
function createJWT(user) {
    // Set the expiration time of the JWT
    const expiresIn = '1h';

    // Set the payload of the JWT (the data that will be encoded in the token)
    const payload = {
        sub: user, // The user's ID
        iat: Date.now(), // The time the JWT was issued
    };

    // Sign the JWT and return it
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn
    });
}

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

    userModel.create({
            userName: body.userName,
            email: body.email,
            number: body.number,
            role: body.role,
            password: body.password
        },
        (err, saved) => {
            if (!err) {
                console.log(saved);

                res.send({
                    status: "success",
                    message: "User register successfully"
                });
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })

})

// login user api 
app.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body;

    // Query the database to check if the provided username and password are valid
    userModel.findOne({
        username,
        password
    }, (err, user) => {
        if (err || !user) {
            return res.status(401).send({
                error: 'Invalid credentials'
            });
        }

        // Generate a JSON Web Token and send it back to the client
        //   const token = jwt.sign({ id: user.id }, JWT_SECRET);
        //   res.json({ token });
        res.send({
            status: "success",
            message: `welcome ${username} to dashboard`
        });
    });
});



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