import { Doctor } from "../models/doctor.js"

async function create(req, res) {
  try {
    console.log(req.body)
    
    const doctor = await Doctor.create(req.body)
    res.status(201).json(doctor)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

async function index(req, res) {
  try {
    const doctors = await Doctor.find()
    res.status(200).json(doctors)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const doctor = await Doctor.findById(req.params.doctorId)
    res.status(200).json(doctor)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  show,
}