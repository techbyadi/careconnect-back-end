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
    const appointments = await Appointment.find({patient:req.user.profile}).populate('patient')
    res.status(200).json(appointments)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId)
      .populate(['patient'])
    res.status(200).json(appointment)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.appointmentId,
      req.body,
      { new: true }
    ).populate('patient')
    res.status(200).json(appointment)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteAppointment(req, res) {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.appointmentId)
    const profile = await Profile.findById(req.user.profile)
    profile.appointments.remove({ _id: req.params.appointmentId })
    await profile.save()
    res.status(200).json(appointment)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}


export {
  create,
  index,
  show,
  update,
  deleteAppointment as delete,
}