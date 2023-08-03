import Incident from '../model/Incident.js';

const create = (body) => Incident.create(body);

const findAll = (limit, offset) => Incident.find().sort({ _id: -1 }).limit(limit).skip(offset).populate('user');

const findById = (id) => Incident.findById(id);

const update = (id, body) => Incident.findOneAndUpdate({ _id: id }, body, { rawResult: true });

const count = () => Incident.countDocuments();

const last = () => Incident.findOne().sort({ _id: 1, status: !"InProgress" }).populate('user');

const searchByTitle = (title) => Incident.find({ title: { $regex: `${title || ""}`, $options: 'i' }, }).populate('user').sort({ _id: -1 });

const byUser = (userId) => Incident.find({ user: userId }).populate('user');

const addComment = (incidentId, comment, userId) => {
  let commentId = Math.floor(Date.now() * Math.random()).toString();
  return Incident.findOneAndUpdate
    ({ _id: incidentId }, { $push: { comments: { commentId, message: comment, userId, createAt: new Date() } } }, { rawResult: true });
};

const deleteComment = (incidentId, commentId, userId) => Incident.findOneAndUpdate({ _id: incidentId }, { $pull: { comments: { commentId, userId } } }); //, { rawResult: true }


export default { create, findAll, findById, update, count, last, searchByTitle, byUser, addComment, deleteComment };