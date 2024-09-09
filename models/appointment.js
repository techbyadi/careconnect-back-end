import mongoose from 'mongoose'

const Schema = mongoose.Schema

const appointmentSchema = new Schema({
  patient : {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }, 
  doctor : {
    type: Schema.Types.ObjectId,
    ref: 'Doctor'
  },
  appointmentDate: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  mode: {
    type : String,
    required : true,
    enum: ['In Person', 'Phone Call'] 
  }
},{
  timestamps: true,
})

const Appointment = mongoose.model('Appointment', appointmentSchema)

export {Appointment}