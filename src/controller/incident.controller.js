import Incident from "../model/Incident.js";
import service from "../service/incident.service.js";
import mongoose from "mongoose";

const create = async (req, res) => {
	try {
		const { number, title, description } = req.body;
		if (!number || !title || !description) return res.status(400).send({ message: "Submit all fields" });

		//req.userId vem de um middlaware, que só funcionará se o usuário tiver um token valido 
		const incident = await service.create({ number, title, description, user: req.userId }); // { _id: req.userId }
		if (!incident) return res.status(400).send({ message: "Error creating incident" });

		return res.status(201).send({ message: "Incident has been created successfully" });

	} catch (err) {
		return res.status(500).send({ message: err.message });
	};
};

const findAll = async (req, res) => {
	try {
		let { limit, offset } = req.query;
		!limit ? limit = 5 : Number(limit);
		!offset ? offset = 0 : Number(offset);

		const incidents = await service.findAll(limit, offset);
		const countIncidents = await service.count();

		const nextOffset = offset + limit;
		const nextUrl = nextOffset < countIncidents ? `${req.baseUrl}/limit=${limit}&offset=${nextOffset}` : null;

		const previousOffset = offset - limit;
		const previousUrl = previousOffset > 0 ? `${req.baseUrl}/limit${limit}&offset=${previousOffset}` : null;

		if (incidents.length === 0) {
			res.status(400).send({ message: "There is no registered incidents" });
		};

		res.status(200).send({
			/* limit, offset, nextUrl, previousUrl, countIncidents, incidents */
			incidents: incidents.map(item => ({ id: item._id, number: item.number, title: item.title, description: item.description, createdAt: item.createdAt, status: item.status, user: item.user, comments: item.comments }))
		});

	} catch (err) {
		return res.status(500).send({ message: err.message });
	};
};

const findById = async (req, res) => {
	// verificar se nesse body está contido o id e se isso vai dar erro né
	try {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) {
			return res.status(400).send({ message: "Invalid ID" });
		};

		const incident = await service.findById(id);
		if (!incident) {
			return res.status(400).send({ message: "Incident not found" });
		}

		res.status(200).send(incident);

	} catch (err) {
		return res.status(500).send({ message: err.message });
	};
};

const update = async (req, res) => {
	try {
		if (!req.body.number && !req.body.title && !req.body.description && !req.body.createdAt && !req.body.status)
			return res.status(400).send({ message: "Submit at least one field" });

		const incident = await service.findById(req.params.id);
		if (!incident)
			return res.status(400).send({ message: "Incident not found" });

		if (String(incident.user._id) !== req.userId)
			return res.status(400).send({ message: "You cannot update this incident" });

		const updatedIncident = await service.update(req.params.id, req.body);
		if (!updatedIncident)
			return res.status(400).send({ message: "Error in update the incident" });

		return res.status(200).send({ message: "Incident successfully updated!" });

	} catch (err) {
		return res.status(500).send({ message: err.message });
	};
};

const last = async (req, res) => {
	try {
		const lastIncident = await service.last();
		if (!lastIncident) return res.status(400).send({ message: "There is no registered incidents" });

		res.json(lastIncident);

	} catch (err) {
		return res.status(500).send({ message: err.message });
	};
};

const searchByTitle = async (req, res) => {
	try {
		const title = req.query.title;
		if (!title) return res.status(400).send({ message: "You need to enter some title" });

		const incidents = await service.searchByTitle(title);
		if (incidents.length === 0) return res.status(400).send({ message: "There are no incidents with this title" });

		res.status(200).send(incidents);

	} catch (err) {
		return res.status(500).send({ message: err.message });
	};
};

const byUser = async (req, res) => {
	try {
		const userIncidents = await service.byUser(req.userId);
		if (userIncidents.length === 0) return res.status(400).send({ message: "No incidents found" });

		return res.status(500).send(userIncidents);

	} catch (err) {
		return res.status(500).send({ message: err.message });
	};
};

const addComment = async (req, res) => {

	const id = req.params.id;
	const { comment } = req.body;
	const userId = req.userId

	try {

		if (!comment)
			return res.status(400).send({ message: "You need to send the comment" });

		if (!mongoose.isValidObjectId(id))
			return res.status(400).send({ message: "Invalid ID" });

		await service.addComment(id, comment, userId);

		res.status(200).send({ message: "Comment has been successfully added" });

	} catch (err) {
		return res.status(500).send({ message: err.message });
	};
};

const deleteComment = async (req, res) => {

	const { incidentId, commentId } = req.params;
	const userId = req.userId

	try {

		const deletedComment = await service.deleteComment(incidentId, commentId, userId);
		console.log(deletedComment)

		res.status(200).send({ message: "Incident has been successfully deleted" });

	} catch (err) {
		return res.status(500).send({ message: err.message });
	};
};

export default { create, findAll, findById, update, last, searchByTitle, byUser, addComment, deleteComment };