import User from '../model/User.js';
import jwt from 'jsonwebtoken';

const login = (email) => User.findOne({ email: email }).select("+password");

const generateToken = (id) => jwt.sign({ id: id }, process.env.SECRET_JWT, { expiresIn: 86400 });

export default { login, generateToken };