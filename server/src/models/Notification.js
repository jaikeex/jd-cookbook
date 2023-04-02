import mongoose from 'mongoose'

const NotificationSchema = new mongoose.Schema(
  {
    recipe: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    seen: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
)

const Notification = mongoose.model('Notification', NotificationSchema)

export default Notification
