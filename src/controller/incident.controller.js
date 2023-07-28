import incidentService from "../service/incident.service.js";

const create = async (req, res) => {
	try {
		const { number, title, description } = req.body;
		if (!number || !title || !description) return res.status(400).send({ message: "Submit all fields" });

		//req.userId vem de um middlaware, que só funcionará se o usuário tiver um token valido 
		const incident = await incidentService.createService({ number, title, description, user: req.userId }); // { _id: req.userId }
		if (!incident) return res.status(400).send({ message: "Error creating incident" });

		return res.status(201).send({ message: "Incident has been created successfully" });

	} catch (err) {
		return res.status(500).send(console.error(err));
	};
};

const findAll = async (req, res) => {
	try {
		const incidents = await incidentService.findAllService();
		if (incidents.length === 0) {
			res.status(400).send({ message: "Server error" });
		}

		res.status(200).send(incidents);

	} catch (err) {
		return res.status(500).send(console.error(err));
	};
};

const findById = async (req, res) => {
	// verificar se nesse body está contido o id e se isso vai dar erro né
	try {
		const id = req.params.id;
		if (!mongoose.isValidObjectId(id)) {
			return res.status(400).send({ message: "Invalid ID" });
		};

		const incident = await incidentService.findById(id);
		if (!incident) {
			return res.status(400).send({ message: "Incident not found" });
		}

		res.status(200).send(incident);

	} catch (err) {
		return res.status(500).send({ message: "Server error" });
	};
};

const update = async (req, res) => {
	try {
		if (!req.body.number && !req.body.title && !req.body.description && !req.body.createdAt && !req.body.status)
			return res.status(400).send({ message: "Submit at least one field" });

		const updatedIncident = await incidentService.updateService(req.params.id, req.body);
		if (!updatedIncident) return res.status(400).send({ message: "Error in update the incident" });

		return res.status(200).send({ message: "Incident updated successfully" });

	} catch (err) {
		return res.status(500).send(console.error(err));
	};
};

export default { create, findAll, findById, update };