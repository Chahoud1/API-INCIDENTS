import express from 'express';
import dotenv from 'dotenv';
import connectDatabase from './src/database/db.js';
import userRoute from './src/route/user.route.js';
import authRoute from './src/route/auth.route.js';


dotenv.config();
const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;
connectDatabase();
app.listen(port, () => console.log(`Example app listening on port ${port}`));

app.use('/user', userRoute);
app.use('/auth', authRoute);