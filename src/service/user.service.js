import User from '../model/User.js';

const create = (body) => User.create(body);

const findAll = () => User.find();

const findById = (id) => User.findById(id);

const update = (id, name, body) => User.findOneAndUpdate({ _id: id }, { name, body });

export default { create, findAll, findById, update };