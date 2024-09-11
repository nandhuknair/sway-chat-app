const mongoose = require("mongoose");

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      default: "",
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);



const consversationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref:'User'
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref:'User'
      },
      messages: {
        type : mongoose.Schema.ObjectId,
        ref:'Messages'
      }

  },
  { timestamps: true }
);


const ConversationModel = mongoose.model('Conversation',consversationSchema)
const MessageModel = mongoose.model("Message", messageSchema);


module.exports = {
    ConversationModel,
    MessageModel
}
