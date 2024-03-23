const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: {
      type: Boolean,
      default: false
    },
    // userEmail :{ type : String , required:true},
    userEmail: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
  },
  {timestamps:true}
);

module.exports = mongoose.model("Task", taskSchema);
