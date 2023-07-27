// aqui fica a função de callback
import mongoose from 'mongoose';
import userService from '../service/user.service.js';

const create = async (req, res) => {

	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).send({ message: "Submit all fields!" });
		};

		const user = await userService.createService(req.body);
		if (!user) {
			return res.status(400).send({ message: "Error creating User" });
		};

		res.status(201).send({
			menssage: "user created successfully",
			user: {
				id: user._id,
				name,
				email
			}
		});

	} catch (err) {
		return res.status(500).send(console.error(err));
	}
};

const findAll = async (req, res) => {
	try {
		const users = await userService.findAllService().select({password: true, name: true});
		if (users.length === 0) {
			return res.status(400).send({ message: "There are no registered users!" })
		};
		res.send(users)
	} catch (err) {
		return res.status(500).send({ message: "Server error" });
	};
};

const findById = async (req, res) => {
	/* const id = req.id; */
	const user = req.user;
	res.send(user);
};

const update = async (req, res) => {
	try {
		const { name, email } = req.body;
		if (!name && !email) {
			return res.status(400).send({ message: "Submit at least one field!" });
		};
		const { id, user } = req;
		await userService.updateService(id, name, email);
		res.status(200).send({ message: "User sucessfully updated" });
	} catch (err) {
		return res.status(500).send({ message: "Server error" });
	};
};

export default { create, findAll, findById, update };