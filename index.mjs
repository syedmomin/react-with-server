import express  from "express"
const app = express()
const port = 3000  

app.get('/', (req, res) => {
  console.log("request ip :",req.ip);
  let getTime = new Date();
  let nowTime = `hour  ${getTime.getHours()} minute   ${getTime.getMinutes()} second   ${getTime.getSeconds()}`;
  res.send('Hello User! Now Time is -->'+nowTime)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})