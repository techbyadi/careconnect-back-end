import { Doctor } from "../models/doctor.js"
import { Profile } from "../models/profile.js"

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

async function createReview(req, res) {
  try {
    req.body.author = req.user.profile
    const doctor = await Doctor.findById(req.params.doctorId)
    doctor.reviews.push(req.body)
    await doctor.save()
    const newReview = doctor.reviews.at(-1)
    const profile = await Profile.findById(req.user.profile)
    newReview.author = profile
    res.status(201).json(newReview)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)    
  }
}

export {
  create,
  index,
  show,
  createReview,
}