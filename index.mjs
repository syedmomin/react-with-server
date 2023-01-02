import express from 'express';
import path from 'path';
// import { getMaxListeners } from 'process';

const app = express()
const port = process.env.PORT || 3300;

app.get('/abc', (req, res) => {
    console.log("request ip: ", req.ip);
    res.send('Hello World! ' + new Date().toString());
})

app.get('/identity', (req, res) => {
    console.log("request ip: ", req.ip);
    res.send(
        {
            email : "syedmomin168@gmail.com",
            password : "syedmominkhan",
            desgnation : "Admin"
        }
    );
})


// app.get('/weather', (req, res) => {
//     console.log("request ip: ", req.ip);
//     res.send({
//         temp: 30,
//         humidity: 72,
//         serverTime: new Date().toString()
//     });
// })
const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './web/build')))
app.use('*', express.static(path.join(__dirname, './web/build')))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})