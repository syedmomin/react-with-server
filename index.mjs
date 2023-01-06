import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'

const app = express()
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// database connection in mangodb                 
const mongodbURI = process.env.mongodbURI || "mongodb+srv://syedMominTesting:mominmomin@cluster0.e7i5deq.mongodb.net/testing?retryWrites=true&w=majority";
mongoose.connect(mongodbURI);

let userSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    number: Number,
    password:{ type: String, required: true },
    createdOn: { type: Date, default: Date.now }
});
const userModel = mongoose.model('userDetail', userSchema);


// jwt token  
function createJWT(user) {
    // Set the expiration time of the JWT
    const expiresIn = '1h';
  
    // Set the payload of the JWT (the data that will be encoded in the token)
    const payload = {
      sub: user._id, // The user's ID
      iat: Date.now(), // The time the JWT was issued
    };
  
    // Sign the JWT and return it
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  }
  

app.post('/registration', (req, res) => {

    const body = req.body;

    if (
        !body.userName
        || !body.email
        || !body.number
        || !body.password
    ) {
        res.status(400).send({
            message: "required parameters missing",
        });
        return;
    }

    // userDetail.push({
    //     id: `${new Date().getTime()}`,
    //     userName: body.userName,
    //     email: body.email,
    //     number: body.number,
    //     password: body.password
    // });
    userModel.create({
        id: `${new Date().getTime()}`,
        userName: body.userName,
        email: body.email,
        number: body.number,
        password: body.password
    },
        (err, saved) => {
            if (!err) {
                console.log(saved);

                res.send({
                    status:"success",
                    message: "User added successfully"
                });
            } else {
                res.status(500).send({
                    message: "server error"
                })
            }
        })

})

app.get('/login', (req, res) => {
    const { username, password } = req.body;

    if (users[username] && users[username] === password) {
        const token = createJWT(user);
      res.send({
        barerToken:token,
        message: 'Successfully logged in',
        user: username
      });
    } else {
      res.status(401).send({
        message: 'Invalid login credentials'
      });
    }
});

// app.get('/abc', (req, res) => {
//     console.log("request ip: ", req.ip);
//     res.send('Hello World! ' + new Date().toString());
// })


const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './web/build')))
app.use('*', express.static(path.join(__dirname, './web/build')))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


////////////////mongodb connected disconnected events///////////////////////////////////////////////
mongoose.connection.on('connected', function () {//connected
    console.log("Mongoose is connected");
});

mongoose.connection.on('disconnected', function () {//disconnected
    console.log("Mongoose is disconnected");
    process.exit(1);
});

mongoose.connection.on('error', function (err) {//any error
    console.log('Mongoose connection error: ', err);
    process.exit(1);
});

process.on('SIGINT', function () {/////this function will run jst before app is closing
    console.log("app is terminating");
    mongoose.connection.close(function () {
        console.log('Mongoose default connection closed');
        process.exit(0);
    });
});
////////////////mongodb connected disconnected events///////////////////////////////////////////////