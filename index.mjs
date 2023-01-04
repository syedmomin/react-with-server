import express from 'express';
import path from 'path';
// import { getMaxListeners } from 'process';

const app = express()
const port = process.env.PORT || 3300;

app.get('/abc', (req, res) => {
    console.log("request ip: ", req.ip);
    res.send('Hello World! ' + new Date().toString());
})


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

    // products.push({
    //     id: `${new Date().getTime()}`,
    //     name: body.name,
    //     price: body.price,
    //     description: body.description
    // });

})


const __dirname = path.resolve();
app.use('/', express.static(path.join(__dirname, './web/build')))
app.use('*', express.static(path.join(__dirname, './web/build')))


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})