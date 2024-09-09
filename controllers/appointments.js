import { Profile } from "../models/profile.js"
import { Appointment } from "../models/appointment.js"
import { Doctor } from "../models/doctor.js"

async function create(req, res) {
  try {
    req.body.patient = req.user.profile
    req.body.doctor = req.body.doctor
    const appointment = await Appointment.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { appointments: appointment } },
      { new: true }
    )

    const doctor = await Doctor.findById(req.body.doctor)

    doctor.availability.forEach((availability) => {
      if (
        new Date(availability.date).toISOString().split("T")[0] ===
        new Date(req.body.appointmentDate).toISOString().split("T")[0]
      ) {
        availability.slots.forEach((slot) => {
          if (slot.time === req.body.time) {
            slot.isAvailable = false
          }
        })
      }
    })

    await doctor.save()
    appointment.patient = profile
    res.status(201).json(appointment)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function index(req, res) {
  try {
    const appointments = await Appointment.find({ patient: req.user.profile })
      .populate("patient")
      .populate("doctor")
    res.status(200).json(appointments)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const appointment = await Appointment.findById(
      req.params.appointmentId
    ).populate(["patient"])
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
    ).populate("patient")
    res.status(200).json(appointment)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteAppointment(req, res) {
  try {
    const appointment = await Appointment.findByIdAndDelete(
      req.params.appointmentId
    )
    const profile = await Profile.findById(req.user.profile)
    profile.appointments.remove({ _id: req.params.appointmentId })
    await profile.save()

    const doctor = await Doctor.findById(appointment.doctor)
    doctor.availability.forEach((availability) => {
      const avlDate = new Date(availability.date).toISOString().split("T")[0]
      const aptDate = new Date(appointment.appointmentDate)
        .toISOString()
        .split("T")[0]
      if (avlDate === aptDate) {
        availability.slots.forEach((slot) => {
          if (slot.time === appointment.time) {
            slot.isAvailable = true
          }
        })
      }
    })
    await doctor.save()
    res.status(200).json(appointment)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export { create, index, show, update, deleteAppointment as delete }
