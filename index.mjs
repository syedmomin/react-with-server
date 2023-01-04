import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express()
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

let userDetail = []; // TODO: connect with mongodb instead


app.post('/registration', (req, res) => {

    const body = req.body;

    if ( 
        !body.userName
        || !body.email
        || !body.number
        || !body.desgnation
    ) {
        res.status(400).send({
            message: "required parameters missing",
        });
        return;
    }

    userDetail.push({
        id: `${new Date().getTime()}`,
        userName: body.userName,
        email: body.email,
        number: body.number,
        desgnation: body.desgnation
    });

    res.send({
        message: "product added successfully"
    });
})


app.get('/abc', (req, res) => {
    console.log("request ip: ", req.ip);
    res.send('Hello World! ' + new Date().toString());
})


const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './web/build')))
app.use('*', express.static(path.join(__dirname, './web/build')))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
