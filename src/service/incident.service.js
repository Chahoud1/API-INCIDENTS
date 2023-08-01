import Incident from '../model/Incident.js';

const createService = (body) => Incident.create(body);

const findAllService = (limit, offset) => Incident.find().sort({ _id: -1 }).limit(limit).skip(offset).populate('user');

const findByIdService = (id) => Incident.findById(id);

const updateService = (id, body) => Incident.findOneAndUpdate({ _id: id }, body);

const countService = () => Incident.countDocuments();

const lastService = () => Incident.findOne().sort({ _id: 1, status: !"InProgress" }).populate('user');

const searchByTitle = (title) => Incident.find({ title: { $regex: `${title || ""}`, $options: 'i' }, }).populate('user').sort({_id: -1});

const byUser = (userId) => Incident.find({user: userId}).populate('user');

export default { createService, findAllService, findByIdService, updateService, countService, lastService, searchByTitle, byUser };