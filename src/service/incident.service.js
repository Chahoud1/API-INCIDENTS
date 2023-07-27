import Incident from '../model/Incident.js';

const createService = (body) => Incident.create(body)

const findAllService = () => Incident.find();

const findByIdService = (id) => Incident.findById(id);

const updateService = (id, body) => Incident.findOneAndUpdate({_id:id }, body);

export default {createService, findAllService, findByIdService, updateService};