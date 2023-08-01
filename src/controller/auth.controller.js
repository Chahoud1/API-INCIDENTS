import bcrypt from 'bcrypt';
import service from '../service/auth.service.js';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await service.login(email);
    if (!user) {
      return res.status(400).send({ "message": "Invalid password or user not found" });
    };

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(400).send({ "message": "Invalid password or user not found" });
    };

    const token = service.generateToken(user.id);

    res.send({ token });

  } catch (err) {
    return res.status(500).send({ "message": "Server error", "message2": `${err}` });
  };
};

export default { login };