import { Doctor } from "../models/doctor.js"
import { Profile } from "../models/profile.js"

async function create(req, res) {
  try {
    console.log(req.body)
    const doctor = await Doctor.create(req.body)
    res.status(201).json(doctor)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function index(req, res) {
  try {
    const doctors = await Doctor.find()
    res.status(200).json(doctors)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const doctor = await Doctor.findById(req.params.doctorId).populate('reviews.author')
    doctor.reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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

async function updateReview(req, res) {
  try {
    const doctor = await Doctor.findById(req.params.doctorId)
    const review = doctor.reviews.id(req.body._id)
    review.content = req.body.content
    review.rating = req.body.rating
    await doctor.save()
    res.status(200).json(doctor)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)    
  }
}

async function deleteReview(req, res) {
  try {
    const doctor = await Doctor.findById(req.params.doctorId)
    doctor.reviews.remove({ _id: req.params.reviewId })
    await doctor.save()
    res.status(200).json(doctor)
  } catch (error) {
    console.log(error)
    res.status(500).json(500)
  }
}

export {
  create,
  index,
  show,
  createReview,
  updateReview,
  deleteReview
}