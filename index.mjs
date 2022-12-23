import express from 'express';
import path from 'path';
import cors from 'cors';

const app = express()
const port = process.env.PORT || 3300;

app.use(cors());
app.use(express.json());
// app.get('/abc', (req, res) => {
//     console.log("request ip: ", req.ip);
//     res.send('Hello World! ' + new Date().toString());
// })
// app.get('/weather', (req, res) => {
//     console.log("request ip: ", req.ip);
//     res.send({
//         temp: 30,
//         humidity: 72,
//         serverTime: new Date().toString()
//     });
// })

app.get('/login', (req, res) => {
    const body = req.body;

    console.log("body",body)
    if ( // validation
        !body.email
        || !body.password
        || !body.token
    ) {
        res.status(400).send({
            message: "required parameters missing",
        });
        return;
    }else{
        res.send({
            message: "Happy Login Successfully"
        });
    }
    
})

const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './web/build')))
app.use('*', express.static(path.join(__dirname, './web/build')))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})