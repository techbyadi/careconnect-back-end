import mongoose from 'mongoose'

const Schema = mongoose.Schema

const profileSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  photo: String, 
  age: {
    type: Number,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  appointments: [{
    type: Schema.Types.ObjectId,
    ref: 'Appointment'
}],
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
