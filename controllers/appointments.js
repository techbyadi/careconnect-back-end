import { Profile } from "../models/profile.js";
import { Appointment } from "../models/appointment.js";

async function create(req, res) {
  try {
    req.body.patient = req.user.profile
    const appointment = await Appointment.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: {appointments: appointment} },
      { new: true }
    )
    appointment.patient = profile
    res.status(201).json(appointment)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

async function index(req, res) {
  try {
    const appointments = await Appointment.find().populate('patient')
    res.status(200).json(appointments)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

export {
  create,
  index
}