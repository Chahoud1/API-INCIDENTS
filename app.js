import express from 'express';
import connectDatabase from './src/database/db.js';
import userRoute from './src/routes/user.route.js';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
app.use(express.json());


app.use("/user", userRoute);

const port = process.env.PORT || 3000;
connectDatabase();

app.listen(port, () => console.log(`Example app listening on port ${port}`));