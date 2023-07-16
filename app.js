const express = require('express')
const app = express()

const userRoute = require('./src/routes/user.route')

app.use("/soma", userRoute)


const port = 3000


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})