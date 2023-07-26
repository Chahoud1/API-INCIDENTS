import bcrypt from 'bcrypt';
import { loginService, generateToken } from '../service/auth.service.js';

const login = async (req, res) => {

    const { email, password } = req.body;


    try {

        const user = await loginService(email);
        if (!user) {
            return res.status(400).send({ "message": "Invalid password or user not found" });
        };

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(400).send({ "message": "Invalid password or user not found" });
        };

        const token = generateToken(user.id);

        res.send({token});

    } catch (err) {
        return res.status(500).send({ "message": "Server error", "message2": `${err}` });
    };


};

export { login };